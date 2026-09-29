export interface IAuthRepository{
    getUser(email:string,password:string):Promise<{userID:string}|null>
    registerAutorizationCode(code:string):Promise<void>
    validateCode(code:string):Promise<boolean>
    registerRefreshCode(code:string):Promise<void>
}