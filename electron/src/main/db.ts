import Database from "better-sqlite3"
import { initAuthDB } from "./auth/db.auth"
import { initCardDB } from "./card/db.card"
import { initGroupDB } from "./group/db.group"

const db = new Database("auth.sqlite")
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
initAuthDB(db)
initGroupDB(db)
initCardDB(db)
export default db