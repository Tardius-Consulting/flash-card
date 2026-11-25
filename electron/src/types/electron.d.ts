import { CreateCardData } from "../main/card/repository/CreateCardData"
import { CreateGroupDTO, EditGroupDTO } from "../main/group/repository/GroupData"
import { GroupDB } from "../main/group/repository/GroupDB"
import { CardDTO } from "./card.dto"

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
    registerReview(groupID:string,cards:ConcludeReviewDTO[]):Promise<void>
    getReviewList(groupID:string):Promise<ReviewState[]>
}

export interface ICardAPI{
    create(data:CreateCardData):Promise<void>
    edit(data:CardDTO):Promise<void>
    delete(id:string):Promise<void>
    getList():Promise<CardDTO[]>
    getData(id:string):Promise<CardDTO>
}

export interface IGroupAPI{
    create(data:CreateGroupDTO):Promise<void>
    edit(data:EditGroupDTO):Promise<void>
    delete(id:string):Promise<void>
    getList():Promise<GroupDB[]>
    getData(id:string):Promise<GroupDB>
}

export interface IRendererAPI{
    onLogin(callback:(data)=>void):void
}

export type IElectronAPI = IAuthAPI

declare global{
    interface Window{
        electronAPI:IElectronAPI,
        rendererAPI:IRendererAPI,
        reviewAPI:IReviewAPI,
        cardAPI:ICardAPI,
        groupAPI:IGroupAPI
    }
}