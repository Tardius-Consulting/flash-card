import { ipcMain } from "electron";
import { CreateGroupDTO, EditGroupDTO } from "./repository/GroupData";
import { CreateGroup } from "./useCases/CreateGroup";
import { IGroupRepository } from "./repository/IGroupRepository";
import { Group } from "./model/Group";
import { validateSession } from "../shared/ValidateSession";
import { EditGroup } from "./useCases/EditGroup";
import { DeleteGroup } from "./useCases/DeleteGroup";
import { GroupDB } from "./repository/GroupDB";

const repository:IGroupRepository={
  create: function (userid: string, group: Group): Promise<void> {
    throw new Error("Function not implemented.");
  },
  edit: function (userid: string, group: Group): Promise<void> {
    throw new Error("Function not implemented.");
  },
  delete: function (userid: string, groupid: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  getByID: function (userid: string, groupid: string): Promise<Group | null> {
    throw new Error("Function not implemented.");
  },
  getList: function (userid: string): Promise<GroupDB[]> {
    throw new Error("Function not implemented.");
  }
}

ipcMain.handle('group:create', async (event, data: CreateGroupDTO) => {
    try {
    const createGroup = new CreateGroup(repository);
    await validateSession(async (userID) => {
        await createGroup.createGroup(userID, data);
    });
    } catch (error) {
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