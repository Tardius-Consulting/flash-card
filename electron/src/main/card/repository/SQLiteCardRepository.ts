import Database from "better-sqlite3"
import { ICardRepository } from "./ICardRepository";
import { Card } from "../model/Card";
import { Review } from "../model/Review";
export class SQLiteCardRepository implements ICardRepository{
    constructor(private _db:Database){}
    getCardList(userID: string, groupID: string): Promise<Card[]> {
        throw new Error("Method not implemented.");
    }
    async registerReview(userID: string, cards: Review[]): Promise<void> {
        const stmt = this._db.prepare("UPDATE Cards SET box = ? due_date = ? WHERE id = ? user_id = ?")
        cards.forEach((card)=>{
            stmt.run(card.box,card.due_date,card.id,userID)
        })
    }

}