import { Review } from "../../review/model/Review";
import { Card } from "../model/Card";

export interface ICardRepository {
    getCardList(userID:string, groupID: string): Promise<Card[]>
    registerReview(userID:string, cards: Review[]): Promise<void>
}