import { ConcludeReviewDTO } from "../../../types/review.dto";
import { ICardRepository } from "../../card/repository/ICardRepository";
import { Review } from "../model/Review";

export class RegisterReviewUseCase {
    constructor(private repository: ICardRepository){}
    public async execute(userID: string, cards:ConcludeReviewDTO[]): Promise<void> {
        const reviewList = cards.map(card => Review.hydrate(card.id, card.box, card.status));
        await this.repository.registerReview(userID, reviewList)
    }
}