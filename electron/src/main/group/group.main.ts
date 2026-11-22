import { ipcMain } from "electron";
import db from "../db.js";
import { validateSession } from "../shared/ValidateSession.js";
import { SQLiteGroupRepository } from "./repository/SQLiteGroupRepository.js";
import { CreateGroup } from "./useCases/CreateGroup.js";
import { EditGroup } from "./useCases/EditGroup.js";
import { DeleteGroup } from "./useCases/DeleteGroup.js";
import { CreateGroupDTO, EditGroupDTO } from "./repository/GroupData.js";

const groupRepository = new SQLiteGroupRepository(db);
const createGroupUseCase = new CreateGroup(groupRepository);
const editGroupUseCase = new EditGroup(groupRepository);
const deleteGroupUseCase = new DeleteGroup(groupRepository);

ipcMain.handle("group:create", async (_event, data: CreateGroupDTO) => {
    try {
        await validateSession(async (userID) => {
            await createGroupUseCase.createGroup(userID, data);
        });
        return { ok: true };
    } catch (err: any) {
        return { ok: false, message: err?.message ?? "Erro ao criar grupo." };
    }
});

ipcMain.handle("group:edit", async (_event, data: EditGroupDTO) => {
    try {
        await validateSession(async (userID) => {
            await editGroupUseCase.editGroup(userID, data);
        });
        return { ok: true };
    } catch (err: any) {
        return { ok: false, message: err?.message ?? "Erro ao editar grupo." };
    }
});

ipcMain.handle("group:delete", async (_event, groupId: string) => {
    try {
        await validateSession(async (userID) => {
            await deleteGroupUseCase.deleteGroup(userID, groupId);
        });
        return { ok: true };
    } catch (err: any) {
        return { ok: false, message: err?.message ?? "Erro ao excluir grupo." };
    }
});