export interface IAuthGateway{
    login(email:string,password:string):Promise<{ok:boolean,message:string}>
    me():Promise<{ok:boolean,message:string}>
    register(data:{email:string,password:string,ask:string,answer:string}):Promise<{ok:boolean,message:string}>
    getAsk(email:string):Promise<string>
    validateAnswer(answer:string):Promise<boolean>
    submitPasswordChange(password:string):Promise<{ok:boolean,message}>
}