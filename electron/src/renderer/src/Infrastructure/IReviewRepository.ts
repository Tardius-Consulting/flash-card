export interface ReviewState{}

export interface IReviewRepository{
    saveState(value:ReviewState):Promise<void>
    loadState():Promise<ReviewState|null>
    removeState():Promise<void>
}