export interface ReviewState{
    id:string
    status:boolean
    box:1|2|3|4
    ask:string
    answer:string
}

export interface IReviewRepository{
    saveState(value:ReviewState[]):Promise<void>
    loadState():Promise<ReviewState[]|null>
    removeState():Promise<void>
    validateState():Promise<boolean>
}