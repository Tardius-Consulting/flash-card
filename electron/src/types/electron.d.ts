export interface IAuthAPI{
    login(email:string,password:string):Promise<{ok:boolean,message:string}>
    me():Promise<{ok:boolean,message:string}>
    register(data:{email:string,password:string,ask:string,answer:string}):Promise<{ok:boolean,message:string}>
    openLogin():Promise<void>
}

export interface IRendererAPI{
    onLogin(callback:(data)=>void):void
}

export type IElectronAPI = IAuthAPI

declare global{
    interface Window{
        electronAPI:IElectronAPI,
        rendererAPI:IRendererAPI
    }
}