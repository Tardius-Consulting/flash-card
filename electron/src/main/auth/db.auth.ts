import Database from "better-sqlite3"
export function initAuthDB(db:Database){
    db.prepare(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        security_question TEXT,
        security_answer TEXT
    )`).run()
}