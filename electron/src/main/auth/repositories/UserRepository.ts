import { User } from "../model/User"
import Database from "better-sqlite3"
import { IUserRepository } from "./IUserRepository"

export class UserRepository implements IUserRepository {
    constructor(private _db: Database){}
    async registerUser(_user: User): Promise<void> {
        const user = _user.toState()
        const query = `INSERT INTO users (id, name, email, password, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?)`
        const name = user.email.substring(0, user.email.indexOf('@'))
        await this._db.run(query, [
            user.id, 
            name, 
            user.email, 
            user.password,
            user.ask,
            user.answer
        ])
    }
    getUser(email: string): Promise<unknown | null> {
        const query = `SELECT * FROM users WHERE email = ?`
        const user = this._db.prepare(query).get(email)
        if(!user) return Promise.resolve(null)
        return Promise.resolve(user)
    }
    changePassword(userID: string, password: string): Promise<void> {
        const query = `UPDATE users SET password = ? WHERE id = ?`
        this._db.prepare(query).run(password, userID)
        return Promise.resolve()
    }
}