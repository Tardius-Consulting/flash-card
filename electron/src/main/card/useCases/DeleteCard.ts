import { ICardRepository } from "../repository/ICardRepository";

export class DeleteCard {

    constructor(
        private _repository:ICardRepository
    ){}

    execute (userID: string, id:string) {
        this._repository.delete(userID,id)
    }
}