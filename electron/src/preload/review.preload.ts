import { ipcRenderer } from 'electron'
import type { IReviewAPI } from "../types/electron.d.ts";

const api:IReviewAPI = {
    registerReview:async(groupID:string,correct:number,total:number)=>ipcRenderer.invoke('review:register', { groupID, correct, total }),
    getReviewList:async(groupID:string)=>ipcRenderer.invoke('review:getList',groupID)
}

export default api