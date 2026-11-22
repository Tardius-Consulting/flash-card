import Database from "better-sqlite3"

export function initGroupsDB(db: Database) {
    db.prepare(`CREATE TABLE IF NOT EXISTS Groups (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        color TEXT NOT NULL,
        name TEXT NOT NULL,
        last_reviewed TEXT NOT NULL,
        next_review TEXT NOT NULL
    )`).run()
}