import { ConcludeReviewDTO } from "../../../types/review.dto";
import { ReviewState } from "./IReviewRepository";

export class ElectronReviewGateway{
    constructor(){}
    public async registerReview(groupID:string,value:ConcludeReviewDTO[]){
        await window.reviewAPI.registerReview(groupID, value)
    }
    public async loadReview(groupID:string):Promise<ReviewState[]>{
        return await window.reviewAPI.getReviewList(groupID)
    }
}