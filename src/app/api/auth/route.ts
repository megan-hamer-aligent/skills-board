import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { password } = await request.json()
  if (!process.env.EDIT_PASSWORD) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  if (password === process.env.EDIT_PASSWORD) {
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
}
