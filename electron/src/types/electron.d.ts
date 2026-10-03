export interface IAuthAPI{
    login(email:string,password:string):Promise<{ok:boolean,message:string}>
    me():Promise<{ok:boolean,message:string}>
    register(data:{email:string,password:string,ask:string,answer:string}):Promise<{ok:boolean,message:string}>
    openLogin():Promise<void>
    getAsk(email:string):Promise<string>
    validateAnswer(answer:string):Promise<boolean>
    submitPasswordChange(password:string):Promise<{ok:boolean,message:string}>
}

export interface IReviewAPI{
    registerReview(groupID:string,correct:number,total:number):Promise<void>
    getReviewList(groupID:string):Promise<ReviewState[]>
}

export interface IRendererAPI{
    onLogin(callback:(data)=>void):void
}

export type IElectronAPI = IAuthAPI

declare global{
    interface Window{
        electronAPI:IElectronAPI,
        rendererAPI:IRendererAPI,
        reviewAPI:IReviewAPI
    }
}