import { ISOData } from "./ISOData";


export class Group{
    constructor(
        private id:string, 
        private color:string,
        private name:string,
        private lastReviewed:ISOData, 
        private nextReview:ISOData){}
    public toState(){
        return {
            id:this.id,
            color:this.color,
            name:this.name,
            lastReviewed:this.lastReviewed.toString(),
            nextReview:this.nextReview.toString()
        }
    }
}