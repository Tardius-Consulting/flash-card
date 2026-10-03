import { ipcRenderer } from 'electron'
import type { ICardAPI } from "../types/electron.d.ts";
import { ConcludeReviewDTO } from '../types/card.dto.js';

const api:ICardAPI = {
    registerReview:async(groupID:string,cards:ConcludeReviewDTO[])=>ipcRenderer.invoke('review:register', { groupID, cards }),
    getReviewList:async(groupID:string)=>ipcRenderer.invoke('review:getList',groupID)
}

export default api