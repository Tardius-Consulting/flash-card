import { Card } from "../model/Card";

export interface ICardRepository {
    getCardList(userID:string, groupID: string): Promise<Card[]>
}