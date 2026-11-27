import Database from "better-sqlite3"
import { IGroupRepository } from "./IGroupRepository";
import { Group } from "../model/Group";
import { GroupDB } from "./GroupDB";
import { ISOString } from "../../shared/ISOString";

export class SQLiteGroupRepository implements IGroupRepository{

  constructor(private _db:Database){}

  async create(userid: string, group: Group): Promise<void> {
    const data = group.toState()
    const stmt = this._db.prepare(
      "INSERT INTO Group (id, user_id, color, name, lastReviewed, nextReview) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    stmt.run(
      data.id,
      userid,
      data.color,
      data.name,
      data.lastReviewed,
      data.nextReview,
    );
  }

  async edit(userid: string, group: Group): Promise<void> {
    const data = group.toState()
    const stmt = this._db.prepare(
      "UPDATE Group SET color = ?, name = ?, lastReviewed = ?, nextReview = ? WHERE id = ? AND user_id = ?"
    );

    const result = stmt.run(data.color, data.name, data.lastReviewed, data.nextReview, data.id, userid);
    if(result.changes ==0)
      throw new Error("Nenhum item modificado!");
  }

  async delete(userid: string, groupid: string): Promise<void> {
    const stmt = this._db.prepare(
      "DELETE FROM Group WHERE id = ? AND user_id = ?"
    );

    const result = stmt.run(groupid, userid);
    if(result.changes ==0)
      throw new Error("Nenhum item deletado!");
  }

  async getByID(userid: string, groupid: string): Promise<Group | null> {
    const stmt = this._db.prepare(`
      SELECT id, color, name, lastReviewed, nextReview
      FROM Group
      WHERE id = ? AND user_id = ?
    `);

    const row = stmt.get(groupid, userid) as GroupDB | undefined;

    if (!row) {
      return null;
    }

    // Adapte os campos conforme o construtor ou método estático do seu model Group
    return Group.hidrate({
      id:row.id,
      name:row.name,
      lastReviewed:new ISOString(new Date(row.lastReviewed)),
      color:row.color,
      nextReview:new ISOString(new Date(row.nextReview)),
    });
  }

  async getList(userid: string): Promise<GroupDB[]> {
    const stmt = this._db.prepare(`
      SELECT id, color, name, lastReviewed, nextReview
      FROM Group
      WHERE user_id = ?
      ORDER BY name DESC
    `);

    const rows = stmt.all(userid) as GroupDB[];
    return rows;
  }
}