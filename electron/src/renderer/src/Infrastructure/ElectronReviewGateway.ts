import { ReviewState } from "./IReviewRepository";

export class ElectronReviewGateway{
    constructor(){}
    public async registerReview(groupID:string,value:ReviewState[]){
        await window.reviewAPI.registerReview(groupID, value.filter(v=>v.status).length, value.length)
    }
    public async loadReview(groupID:string):Promise<ReviewState[]>{
        return await window.reviewAPI.getReviewList(groupID)
    }
}