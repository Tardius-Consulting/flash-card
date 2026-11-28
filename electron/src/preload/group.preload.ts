import { ipcRenderer } from 'electron'
import type { IGroupAPI } from "../types/electron.js";
import { CreateGroupDTO, EditGroupDTO } from '../main/group/repository/GroupData.js';

const api:IGroupAPI = {
  create:async(data:CreateGroupDTO)=>ipcRenderer.invoke('group:create',data),
  edit:async(data:EditGroupDTO)=>ipcRenderer.invoke('group:edit',data),
  delete:async(id:string)=>ipcRenderer.invoke('group:delete',id),
  getList:async()=>ipcRenderer.invoke('group:getList'),
  getData:async(id:string)=>ipcRenderer.invoke('group:getData',id)
}

export default api