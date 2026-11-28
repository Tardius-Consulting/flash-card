import { CardDTO } from "../../../types/card.dto";
import { Card } from "../model/Card";
import { ICardRepository } from "../repository/ICardRepository";

export class UpdateCard {

    constructor(
        private _repository:ICardRepository
    ){}

    execute (userID: string, data: CardDTO) {
        const card = Card.hydrate({
            ask:data.ask, 
            answer:data.answer,
            groupID:data.groupID,
            id:data.id,
            box:data.box
        })

        this._repository.registerCard(userID, card)
    }
}