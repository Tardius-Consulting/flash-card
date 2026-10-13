
import { GroupData } from "./GroupData";
import { GroupRepository } from "./GroupRepository";
import { Group } from "./Groups";
import { ISOData } from "./ISOData";

export class GroupUseCases{
    constructor(private groupRepository:GroupRepository){}

    public createGroup(userid:string, data:GroupData): Group{ 
        const group = new Group(
            "",
            data.color,
            data.name,
            ISOData.currentDate(),
            ISOData.nextDate(7)
        );       
        return this.groupRepository.createGroup(userid, group);
    }
    public editGroup(userid:string, groupid:string, group:GroupData): Group | null{
        return this.groupRepository.editGroup(userid, groupid, group);
    }
    public deleteGroup(userid:string, groupid:string): boolean{
        return this.groupRepository.deleteGroup(userid, groupid);
    }
} 