import { createClient } from '@libsql/client'

let client: ReturnType<typeof createClient> | null = null

export function getClient() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    })
  }
  return client
}

export async function initDb() {
  const db = getClient()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS board_state (
      id   INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT    NOT NULL DEFAULT '{}',
      updated_at TEXT NOT NULL
    )
  `)
}
