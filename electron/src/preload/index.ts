// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron"
import auth from "./auth.preload.js"
import review from "./review.preload.js"
import type { IElectronAPI, IRendererAPI, ICardAPI } from "../types/electron.js"
const api:IElectronAPI = {
    ...auth
}

const reviewAPI:ICardAPI = {
    ...review
}

const renderer:IRendererAPI = {
    onLogin:(callback:(data)=>void)=>{
        ipcRenderer.on("render:authResult",(event,...args)=>callback(args))
    }
}
contextBridge.exposeInMainWorld('electronAPI',api)
contextBridge.exposeInMainWorld('rendererAPI',renderer)
contextBridge.exposeInMainWorld('reviewAPI',reviewAPI)