import { ipcMain } from "electron";
import { MockCardRepository } from "./repository/MockCardRepository";
import { GetReviewListUseCase } from "./useCases/GetReviewListUseCase";
import { RegisterReviewUseCase } from "./useCases/RegisterReviewUseCase";
import { validateSession } from "../shared/ValidateSession";

const cardRepository = new MockCardRepository();
const getReviewListUseCase = new GetReviewListUseCase(cardRepository);
const registerReviewUseCase = new RegisterReviewUseCase(cardRepository);
 
ipcMain.handle('review:register', async (event, groupID, cards) => {
    try {
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
    let reviewList;
    await validateSession(async (userID) => {
        reviewList = await getReviewListUseCase.execute(userID, groupID);
    });
    return reviewList;
    } catch (error) {
        return { ok: false, message: 'Failed to get review list, '+ error.message };
    }
});