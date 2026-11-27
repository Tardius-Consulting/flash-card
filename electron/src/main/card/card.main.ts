import { ipcMain } from "electron";
import { MockCardRepository } from "./repository/MockCardRepository";
import { GetReviewListUseCase } from "./useCases/GetReviewListUseCase";
import { RegisterReviewUseCase } from "./useCases/RegisterReviewUseCase";
import { validateSession } from "../shared/ValidateSession";
import { CriarCard } from "./useCases/CriarCard";
import { CreateCardData } from "./repository/CreateCardData";
import { UpdateCard } from "./useCases/UpdateCard";
import { CardDTO } from "../../types/card.dto";
import { DeleteCard } from "./useCases/DeleteCard";
import { SQLiteCardRepository } from "./repository/SQLiteCardRepository";
import db from "../db.js"

const cardRepository = new SQLiteCardRepository(db);
 
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

ipcMain.handle('card:edit', async (event, data: CardDTO) => {
    try {
    const updateCard = new UpdateCard(cardRepository);
    await validateSession(async (userID) => {
        await updateCard.execute(userID, data);
    });
    } catch (error) {
        return { ok: false, message: 'Failed to update card, '+ error.message };
    }
});

ipcMain.handle('card:delete', async (event, data: string) => {
    try {
    const deleteCard = new DeleteCard(cardRepository);
    await validateSession(async (userID) => {
        await deleteCard.execute(userID, data);
    });
    } catch (error) {
        return { ok: false, message: 'Failed to delete card, '+ error.message };
    }
});