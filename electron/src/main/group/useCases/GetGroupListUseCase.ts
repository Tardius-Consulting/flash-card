import { IGroupRepository } from "../repository/IGroupRepository";

export class GetGroupListUseCase{
  constructor(private _repository:IGroupRepository){}
  async execute(userid:string){
      const list = await this._repository.getList(userid)
      return list?list:[]
  }
}