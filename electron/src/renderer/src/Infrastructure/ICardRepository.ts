import { CreateCardData } from "../../../main/card/repository/CreateCardData";
import { CardDTO } from "../../../types/card.dto";

export interface ICardRepository{
  create:(data:CreateCardData)=>Promise<void>;
  edit:(data:CardDTO)=>Promise<void>;
  delete:(id:string)=>Promise<void>;
  getList:()=>Promise<CardDTO[]>;
  getData:(id:string)=>Promise<CardDTO>;
}