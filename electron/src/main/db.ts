import Database from "better-sqlite3"
import { initAuthDB } from "./auth/db.auth"
import { initGroupsDB } from "./group/repository/db.group"

const db = new Database("auth.sqlite")
initAuthDB(db)
initGroupsDB(db)
export default db