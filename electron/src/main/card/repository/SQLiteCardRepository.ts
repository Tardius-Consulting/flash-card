import Database from "better-sqlite3"
import { ICardRepository } from "./ICardRepository";
import { Card } from "../model/Card";
import { Review } from "../model/Review";
export class SQLiteCardRepository implements ICardRepository{

    constructor(private _db:Database){}

    async registerReview(userID: string, cards: Review[]): Promise<void> {
        const stmt = this._db.prepare("UPDATE Cards SET box = ? due_date = ? WHERE id = ? user_id = ?")
        cards.forEach((card)=>{
            stmt.run(card.box,card.due_date,card.id,userID)
        })
    }

  async registerCard(userID: string, card: Card) {
    const data = card.toState()
    const stmt = this._db.prepare(
      "INSERT INTO Cards (id, user_id, group_id, front, back, box, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    stmt.run(
      data.id,
      userID,
      data.groupID,
      data.ask,
      data.answer,
      data.box,
    );
  }

  async update(userID: string, card:Card) {
    const {ask,answer, id} = card.toState()
    const stmt = this._db.prepare(
      "UPDATE Cards SET front = ?, back = ? WHERE id = ? AND user_id = ?"
    );

    const result = stmt.run(ask, answer, id, userID);
    if(result.changes ==0)
      throw new Error("Nenhum item modificado!");
  }

  async delete(userID: string, cardID: string) {
    const stmt = this._db.prepare(
      "DELETE FROM Cards WHERE id = ? AND user_id = ?"
    );

    const result = stmt.run(cardID, userID);
    if(result.changes ==0)
      throw new Error("Nenhum item deletado!");
  }

  async getCardList(userID: string, groupID: string): Promise<Card[]> {
    throw new Error("Method not implemented.");
  }
}