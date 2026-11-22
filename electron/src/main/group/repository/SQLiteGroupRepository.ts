import Database from "better-sqlite3"
import { IGroupRepository } from "./IGroupRepository"
import { Group } from "../model/Group"
import { GroupDB } from "./GroupDB"
import { ISOString } from "../../shared/ISOString"

export class SQLiteGroupRepository implements IGroupRepository {
    constructor(private _db: Database) {}

    public async create(userid: string, group: Group): Promise<void> {
        const state = group.toState()
        const stmt = this._db.prepare(`
            INSERT INTO Groups (id, user_id, color, name, last_reviewed, next_review)
            VALUES (?, ?, ?, ?, ?, ?)
        `)
        stmt.run(
            state.id,
            userid,
            state.color,
            state.name,
            state.lastReviewed,
            state.nextReview
        )
    }

    public async edit(userid: string, group: Group): Promise<void> {
        const state = group.toState()
        const stmt = this._db.prepare(`
            UPDATE Groups
            SET color = ?, name = ?, last_reviewed = ?, next_review = ?
            WHERE id = ? AND user_id = ?
        `)
        stmt.run(
            state.color,
            state.name,
            state.lastReviewed,
            state.nextReview,
            state.id,
            userid
        )
    }

    public async delete(userid: string, groupid: string): Promise<void> {
        const stmt = this._db.prepare(`
            DELETE FROM Groups
            WHERE id = ? AND user_id = ?
        `)
        stmt.run(groupid, userid)
    }

    public async getByID(userid: string, groupid: string): Promise<Group | null> {
        const stmt = this._db.prepare(`
            SELECT id, user_id, color, name, last_reviewed, next_review
            FROM Groups
            WHERE id = ? AND user_id = ?
        `)
        const row = stmt.get(groupid, userid) as {
            id: string
            user_id: string
            color: string
            name: string
            last_reviewed: string
            next_review: string
        } | undefined

        if (!row) return null

        return Group.hidrate(
            row.id,
            row.color,
            row.name,
            new ISOString(new Date(row.last_reviewed)),
            new ISOString(new Date(row.next_review))
        )
    }
}