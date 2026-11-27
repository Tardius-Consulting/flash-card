import Database from "better-sqlite3"
export function initCardDB(db:Database){
    db.prepare(`CREATE TABLE IF NOT EXISTS Cards (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        group_id TEXT NOT NULL,
        front TEXT NOT NULL,
        back TEXT NOT NULL,
        box INTEGER NOT NULL DEFAULT 1
    )`).run()

    db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_cards_user_group
    ON Cards (user_id, group_id)
  `).run();
}