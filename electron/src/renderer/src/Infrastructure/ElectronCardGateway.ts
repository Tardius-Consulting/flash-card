import { CreateCardData } from "../../../main/card/repository/CreateCardData";
import { CardDTO } from "../../../types/card.dto";
import { ICardRepository } from "./ICardRepository";

export class CardGateway implements ICardRepository{
  public async create(data:CreateCardData){
    await window.cardAPI.create(data)
  }
  public async edit(data:CardDTO){
    await window.cardAPI.edit(data)
  }
  public async delete(id:string){
    await window.cardAPI.delete(id)
  }
  public async getList(){
    return await window.cardAPI.getList()
  }
  public async getData(id:string){
    return await window.cardAPI.getData(id)
  }
}