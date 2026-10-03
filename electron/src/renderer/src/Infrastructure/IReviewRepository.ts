export interface ReviewState{
    id:string
    status:boolean
    ask:string
    answer:string
}

export interface IReviewRepository{
    saveState(value:ReviewState[]):Promise<void>
    loadState():Promise<ReviewState[]|null>
    removeState():Promise<void>
}