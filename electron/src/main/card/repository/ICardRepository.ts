import { Review } from "../model/Review";
import { Card } from "../model/Card";
import { CardDTO } from "../../../types/card.dto";

export interface ICardRepository {
    getCardList(userID:string, groupID: string): Promise<CardDTO[]>
    registerReview(userID:string, cards: Review[]): Promise<void>
    registerCard(userid: string, card: Card): Promise<void>
    update(userID:string,card:Card):Promise<void>
    delete(userID:string,cardID:string)
}