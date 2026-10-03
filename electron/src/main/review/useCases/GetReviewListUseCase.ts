import { ICardRepository } from "../../card/repository/ICardRepository";
import { Review } from "../../card/model/Review";
import { ReviewList } from "../model/ReviewList";

export class GetReviewListUseCase {
  constructor(private repository: ICardRepository) {}

  async execute(userID: string, groupID: string): Promise<Review[]> {
    const promiseCards = this.repository.getCardList(userID, groupID);
    const reviewList = await ReviewList.create(promiseCards);
    return reviewList.cards;
  }
}