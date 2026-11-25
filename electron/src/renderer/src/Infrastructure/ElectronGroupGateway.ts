import { CreateGroupDTO, EditGroupDTO } from "../../../main/group/repository/GroupData";
import { IGroupRepository } from "./IGroupRepository";

export class GroupGateway implements IGroupRepository{
  public async create(data:CreateGroupDTO){
    await window.groupAPI.create(data)
  }
  public async edit(data:EditGroupDTO){
    await window.groupAPI.edit(data)
  }
  public async delete(id:string){
    await window.groupAPI.delete(id)
  }
  public async getList(){
    return await window.groupAPI.getList()
  }
  public async getData(id:string){
    return await window.groupAPI.getData(id)
  }
}