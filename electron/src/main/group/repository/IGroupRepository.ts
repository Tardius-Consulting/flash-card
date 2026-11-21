import { Group } from "../model/Group";

export interface IGroupRepository{
    create(userid:string, group:Group): Promise<void>;
    edit(userid:string, group:Group): Promise<void>;
    delete(userid:string, groupid:string): Promise<void>;
    getByID(userid:string, groupid:string): Promise<Group | null>;
}
