import { ipcMain } from "electron";
import { MockCardRepository } from "../card/repository/MockCardRepository";
import { GetReviewListUseCase } from "./useCases/GetReviewListUseCase";
import { RegisterReviewUseCase } from "./useCases/RegisterReviewUseCase";

const cardRepository = new MockCardRepository();
const getReviewListUseCase = new GetReviewListUseCase(cardRepository);
const registerReviewUseCase = new RegisterReviewUseCase(cardRepository);
 
ipcMain.handle('review:register', async (event, groupID, cards) => {
    await registerReviewUseCase.execute('teste_id', cards);
    return { ok: true, message: 'Review registered successfully' };
});

ipcMain.handle('review:getList', async (event, groupID: string) => {
    console.log('Fetching review list for groupID:', groupID);
    return await getReviewListUseCase.execute('teste_id', groupID);
})