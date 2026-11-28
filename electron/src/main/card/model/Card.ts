import { boxType, CardDTO } from "../../../types/card.dto";
import { CardInfo } from "./CardInfo";

export class Card{
    private constructor(
        private _id: string, 
        private _ask: string, 
        private _answer: string,
        private _groupID: string,
        private _box: boxType
    ){}
    public static hydrate({id, ask, answer, groupID, box}:CardDTO): Card{
        return new Card(id, ask, answer, groupID, box);
    }
    public static create(data: CardInfo){
        const id = new Date().getTime().toString()
        return new Card (id,data.pergunta, data.resposta, data.groupId, 1) 
    }
    public toState():CardDTO{
      return{
        ask:this._ask,
        answer:this._answer,
        id:this._id,
        box:this._box,
        groupID:this._groupID
      }
    }
}