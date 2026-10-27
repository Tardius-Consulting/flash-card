import { Card } from "../model/Card";
import { CreateCardData } from "../repository/CreateCardData";
import { ICardRepository } from "../repository/ICardRepository";

class CriarCard {

    constructor(
        private _repository:ICardRepository
    ){}

    execute (userID: string, data: CreateCardData) {
        const card = Card.create({
            pergunta:data.pergunta, 
            resposta:data.resposta,
            groupId:data.groupid,
        })

        this._repository.registerCard(userID, card)
    }
}