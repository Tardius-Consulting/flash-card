export interface IAuthRepository{
    getUser(email:string,password:string):Promise<{userID:string}|null>
    registerAutorizationCode(code:string,data:unknown):Promise<void>
    validateAutorizationCode(code:string):Promise<unknown>
    registerRefreshCode(code:string,data:unknown):Promise<void>
    validateRefreshCode(code:string):Promise<unknown>
}