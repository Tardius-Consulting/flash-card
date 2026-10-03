import { CardDTO } from "../../../types/card.dto";
import { ICardRepository } from "../repository/ICardRepository";
import { ReviewList } from "../model/ReviewList";

export class GetReviewListUseCase {
  constructor(private repository: ICardRepository) {}

  async execute(userID: string, groupID: string): Promise<CardDTO[]> {
    const promiseCards = this.repository.getCardList(userID, groupID);
    const reviewList = await ReviewList.create(promiseCards);
    return reviewList.cards;
  }
}