import { ipcRenderer } from 'electron'
import type { IAuthAPI } from "../types/electron.d.ts";

const api:IAuthAPI = {
    login:async (email, password)=>ipcRenderer.invoke('auth:Login',{email,password}),
    me:async()=>ipcRenderer.invoke('auth:me'),
    register:async(data:{email:string,password:string,ask:string,answer:string})=> ipcRenderer.invoke('auth:register',data),
    openLogin:async()=>ipcRenderer.send('auth:initLogin'),
    getAsk:async(email:string)=>ipcRenderer.invoke('auth:getSecurityAsk',email),
    validateAnswer:async(answer:string)=> ipcRenderer.invoke('auth:validateAnswer',answer),
    submitPasswordChange:async(password:string)=>ipcRenderer.invoke('auth:changePassword',password)
}

export default api