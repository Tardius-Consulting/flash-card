export interface IAuthRepository{
    getUser(email:string,password:string):Promise<{isValid:boolean,data:{userID:string}|undefined}>
}