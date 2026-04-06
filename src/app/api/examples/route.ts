import { NextResponse } from 'next/server'
import { getClient, initDb } from '../../../lib/db'

export const dynamic = 'force-dynamic'

// GET — load all examples
export async function GET() {
  try {
    await initDb()
    const db = getClient()
    const result = await db.execute('SELECT data FROM board_state WHERE id = 1')
    if (result.rows.length === 0) {
      return NextResponse.json({})
    }
    const data = JSON.parse(result.rows[0].data as string)
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/examples', err)
    return NextResponse.json({}, { status: 500 })
  }
}

// PUT — save all examples
export async function PUT(request: Request) {
  try {
    await initDb()
    const db = getClient()
    const data = await request.json()
    const now = new Date().toISOString()
    await db.execute({
      sql: `INSERT INTO board_state (id, data, updated_at) VALUES (1, ?, ?)
            ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
      args: [JSON.stringify(data), now],
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/examples', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
