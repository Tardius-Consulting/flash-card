import { ISOString } from "../../shared/ISOString"

export class Group{
    private constructor(
        private id:string, 
        private color:string,
        private name:string,
        private lastReviewed:ISOString, 
        private nextReview:ISOString
    ){}
    public static create(color:string, name:string):Group{
        const id = Math.random().toString(36);
        const lastReviewed = new ISOString(new Date());
        const nextReview = new ISOString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        return new Group(id, color, name, lastReviewed, nextReview);
    }
    public static hidrate(id:string, color:string, name:string, lastReviewed:ISOString, nextReview:ISOString):Group{
        return new Group(id, color, name,lastReviewed,nextReview);
    }
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
