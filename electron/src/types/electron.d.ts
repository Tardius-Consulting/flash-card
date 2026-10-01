export interface IAuthAPI{
    login(email:string,password:string):Promise<void>
    me():Promise<unknown>
    register(email:string,password:string):Promise<void>
}

export type IElectronAPI = IAuthAPI

declare global{
    interface Window{
        electronAPI:IElectronAPI
    }
}