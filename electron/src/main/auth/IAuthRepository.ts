export interface IAuthRepository{
    isValid(email:string,password:string):Promise<{isValid:boolean,data:{userID:string}|undefined}>
}