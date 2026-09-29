export interface IAuthRepository{
    getUser(email:string,password:string):Promise<{userID:string}|null>
    registerAutorizationCode(code:string):Promise<void>
    getAutorizationCode():Promise<string>
}