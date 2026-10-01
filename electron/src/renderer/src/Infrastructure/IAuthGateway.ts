export interface IAuthGateway{
    login(email:string,password:string):Promise<void>
    me():Promise<unknown>
    register(email:string,password:string):Promise<void>
}