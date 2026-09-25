// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron"
import auth from "./auth.preload.js"
import type { IElectronAPI } from "../types/electron.js"
const api:IElectronAPI = {
    ...auth
}
contextBridge.exposeInMainWorld('electronAPI',api)