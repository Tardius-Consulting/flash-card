import { ipcRenderer } from 'electron'
import type { IAuthAPI } from "../types/electron.d.ts";

const api:IAuthAPI = {
    login:async (email, password)=>ipcRenderer.invoke('auth:Login',{email,password})
}

export default api