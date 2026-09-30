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

export class InvalidGrantException extends BaseException{
    constructor(message:string = 'Authorization code is invalid or expired'){
        super(message)
    }
}