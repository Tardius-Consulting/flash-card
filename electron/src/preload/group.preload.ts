import { ipcRenderer } from 'electron'
import type { IGroupAPI } from "../types/electron.js";
import { CreateGroupDTO, EditGroupDTO } from '../main/group/repository/GroupData.js';

const api:IGroupAPI = {
  create:async(data:CreateGroupDTO)=>ipcRenderer.invoke('card:create',data),
  edit:async(data:EditGroupDTO)=>ipcRenderer.invoke('card:edit',data),
  delete:async(id:string)=>ipcRenderer.invoke('card:delete',id),
  getList:async()=>ipcRenderer.invoke('card:getList'),
  getData:async(id:string)=>ipcRenderer.invoke('card:getData',id)
}

export default api