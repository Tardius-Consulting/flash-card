import { ipcMain } from "electron";
import { MockCardRepository } from "./repository/MockCardRepository";
import { GetReviewListUseCase } from "./useCases/GetReviewListUseCase";
import { RegisterReviewUseCase } from "./useCases/RegisterReviewUseCase";
import { validateSession } from "../shared/ValidateSession";
import { CriarCard } from "./useCases/CriarCard";
import { CreateCardData } from "./repository/CreateCardData";

const cardRepository = new MockCardRepository();
 
ipcMain.handle('review:register', async (event, groupID, cards) => {
    try {
    const registerReviewUseCase = new RegisterReviewUseCase(cardRepository);
    await validateSession(async (userID) => {
        await registerReviewUseCase.execute(userID, cards);
    });
    return { ok: true, message: 'Review registered successfully' };
    } catch (error) {
        return { ok: false, message: 'Failed to register review, '+ error.message };
    }
});

ipcMain.handle('review:getList', async (event, groupID: string) => {
    try {
    const getReviewListUseCase = new GetReviewListUseCase(cardRepository);
    let reviewList;
    await validateSession(async (userID) => {
        reviewList = await getReviewListUseCase.execute(userID, groupID);
    });
    return reviewList;
    } catch (error) {
        return { ok: false, message: 'Failed to get review list, '+ error.message };
    }
});

ipcMain.handle('card:create', async (event, data: CreateCardData) => {
    try {
    const createCard = new CriarCard(cardRepository);
    await validateSession(async (userID) => {
        await createCard.execute(userID, data);
    });
    } catch (error) {
        return { ok: false, message: 'Failed to create card, '+ error.message };
    }
});