import { ipcRenderer } from "electron";
import { CreateGroupDTO, EditGroupDTO } from "../main/group/repository/GroupData"

const groupAPI = {
    createGroup: (data: CreateGroupDTO) => ipcRenderer.invoke("group:create", data),
    editGroup: (data: EditGroupDTO) => ipcRenderer.invoke("group:edit", data),
    deleteGroup: (groupId: string) => ipcRenderer.invoke("group:delete", groupId),
};

export default groupAPI;