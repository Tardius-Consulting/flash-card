import { ipcMain } from "electron";
import { MockCardRepository } from "../card/repository/MockCardRepository";
import { GetReviewListUseCase } from "./useCases/GetReviewListUseCase";

const cardRepository = new MockCardRepository();
const getReviewListUseCase = new GetReviewListUseCase(cardRepository);
 
ipcMain.handle('review:register', async (event, { groupID, correct, total }) => {
    console.log(`Registering review for groupID: ${groupID}, correct: ${correct}, total: ${total}`);
    return { ok: true, message: 'Review registered successfully' };
});

ipcMain.handle('review:getList', async (event, groupID: string) => {
    console.log('Fetching review list for groupID:', groupID);
    return await getReviewListUseCase.execute('teste_id', groupID);
})