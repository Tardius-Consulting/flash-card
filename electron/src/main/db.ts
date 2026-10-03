import Database from "better-sqlite3"
import { initAuthDB } from "./auth/db.auth"

const db = new Database("auth.sqlite")
initAuthDB(db)