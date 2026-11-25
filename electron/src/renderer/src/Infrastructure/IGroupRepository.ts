import { CreateGroupDTO, EditGroupDTO } from "../../../main/group/repository/GroupData";
import { GroupDB } from "../../../main/group/repository/GroupDB";

export interface IGroupRepository{
  create:(data:CreateGroupDTO)=>Promise<void>;
  edit:(data:EditGroupDTO)=>Promise<void>;
  delete:(id:string)=>Promise<void>;
  getList:()=>Promise<GroupDB[]>;
  getData:(id:string)=>Promise<GroupDB>;
}