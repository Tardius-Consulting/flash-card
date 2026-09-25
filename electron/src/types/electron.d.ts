export interface IAuthAPI{
    login(email:string,password:string):Promise<void>
}

export interface IElectronAPI extends IAuthAPI{
}

declare global{
    interface Window{
        electronAPI:IElectronAPI
    }
}