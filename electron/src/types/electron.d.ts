export interface IAuthAPI{
    login(email:string,password:string):Promise<void>
    me():Promise<unknown>
}

export type IElectronAPI = IAuthAPI

declare global{
    interface Window{
        electronAPI:IElectronAPI
    }
}