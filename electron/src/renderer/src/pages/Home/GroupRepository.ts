import { Group } from "./Group";


export interface GroupRepository{
    create(userid:string, group:Group): Promise<Group>;

    edit(userid:string, group:Group): Promise<Group | null>;

    delete(userid:string, groupid:string): Promise<void>;

    getByID(userid:string, groupid:string): Promise<Group | null>;
}
