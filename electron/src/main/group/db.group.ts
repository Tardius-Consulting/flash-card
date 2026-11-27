import Database from "better-sqlite3"
export function initGroupDB(db:Database){
    db.prepare(`CREATE TABLE IF NOT EXISTS Groups (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        lastReviewed TEXT NOT NULL,
        nextReview TEXT NOT NULL
    )`).run()
    
    db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_groups_user_id
    ON Groups (user_id)
  `).run();
}