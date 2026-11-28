import { ICardRepository } from "../repository/ICardRepository";

export class GetCardListUseCase{
  constructor(private _repository:ICardRepository){}
  async execute(userID:string,groupID:string){
    const list = await this._repository.getCardList(userID,groupID)
    return list?list:[]
  }
}