import { IReviewRepository } from "../../../renderer/src/Infrastructure/IReviewRepository";
import { ICardRepository } from "../../card/repository/ICardRepository";
import { Review } from "../model/Review";
import { shuffleCards } from "../model/ShuffleCards";

export class GetReviewListUseCase {
  constructor(private repository: ICardRepository) {}

  async execute(userID: string, groupID: string): Promise<Review[]> {
    let cards = await this.repository.getCardList(userID, groupID);
    cards = shuffleCards(cards);
    return cards.map((card) => ({
      id: card.id,
      status: null,
      ask: card.ask,
      answer: card.answer
    }));
  }
}