import { GroupData } from "./GroupData";
import { Group } from "./Groups";

export interface GroupRepository{
    createGroup(userid:string, group:Group): Group;

    editGroup(userid:string, groupid:string, group:GroupData): Group | null;

    deleteGroup(userid:string, groupid:string): boolean;
}