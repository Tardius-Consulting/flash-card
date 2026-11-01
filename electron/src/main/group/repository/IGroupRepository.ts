import { Group } from "../model/Group";

export interface IGroupRepository{
    create(userid:string, group:Group): Promise<Group>;
    edit(userid:string, group:Group): Promise<Group | null>;
    delete(userid:string, groupid:string): Promise<void>;
    getByID(userid:string, groupid:string): Promise<Group | null>;
}
