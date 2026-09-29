class BaseException extends Error{
    constructor(message:string){
        super(message)
        this.name = this.constructor.name
    }
}
export class UserNotFoundException extends BaseException{
    constructor(message:string = 'Usuário não encontrado.'){
        super(message)
    }
}