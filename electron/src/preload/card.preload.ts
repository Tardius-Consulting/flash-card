import { ipcRenderer } from 'electron'
import type { ICardAPI } from "../types/electron.js";
import { CreateCardData } from '../main/card/repository/CreateCardData.js';
import { CardDTO } from '../types/card.dto.js';

const api:ICardAPI = {
  create:async(data:CreateCardData)=>ipcRenderer.invoke('card:create',data),
  edit:async(data:CardDTO)=>ipcRenderer.invoke('card:edit',data),
  delete:async(id:string)=>ipcRenderer.invoke('card:delete',id),
  getList:async()=>ipcRenderer.invoke('card:getList'),
  getData:async(id:string)=>ipcRenderer.invoke('card:getData',id)
}

export default api