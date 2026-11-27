import { ipcMain } from "electron";
import { CreateGroupDTO, EditGroupDTO } from "./repository/GroupData";
import { CreateGroup } from "./useCases/CreateGroup";
import { IGroupRepository } from "./repository/IGroupRepository";
import { Group } from "./model/Group";
import { validateSession } from "../shared/ValidateSession";
import { EditGroup } from "./useCases/EditGroup";
import { DeleteGroup } from "./useCases/DeleteGroup";
import { GroupDB } from "./repository/GroupDB";
import { SQLiteGroupRepository } from "./repository/SQLiteGroupRepository";
import db from "../db.js"
import { GetGroupListUseCase } from "./useCases/GetGroupListUseCase";

const repository:IGroupRepository= new SQLiteGroupRepository(db)

ipcMain.handle('group:create', async (event, data: CreateGroupDTO) => {
    try {
    const createGroup = new CreateGroup(repository);
    await validateSession(async (userID) => {
        await createGroup.createGroup(userID, data);
    });
    } catch (error) {
      console.log(error)
        return { ok: false, message: 'Failed to create group, '+ error.message };
    }
});

ipcMain.handle('group:edit', async (event, data: EditGroupDTO) => {
    try {
    const editGroup = new EditGroup(repository);
    await validateSession(async (userID) => {
        await editGroup.editGroup(userID, data);
    });
    } catch (error) {
        return { ok: false, message: 'Failed to edit group, '+ error.message };
    }
});

ipcMain.handle('group:delete', async (event, id: string) => {
    try {
    const deleteGroup = new DeleteGroup(repository);
    await validateSession(async (userID) => {
        await deleteGroup.deleteGroup(userID, id);
    });
    } catch (error) {
        return { ok: false, message: 'Failed to delete group, '+ error.message };
    }
});

ipcMain.handle('group:getList', async (event, id: string) => {
    try {
      let list = []
    await validateSession(async (userID) => {
      const getList = new GetGroupListUseCase(repository);
      list = await getList.execute(userID);
    });
    return list
    } catch (error) {
      console.log(error)
        return { ok: false, message: 'Failed to get group list, '+ error.message };
    }
});