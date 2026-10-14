import { ISOString } from "../../../../main/shared/ISOString";
import { CreateGroupDTO, EditGroupDTO } from "./GroupData";
import { GroupRepository } from "./GroupRepository";
import { Group } from "./Group";

export class CreateGroupUseCases{
    constructor(private repository:GroupRepository){}

    public async createGroup(userid:string, data:CreateGroupDTO): Promise<Group>{ 
        const group = Group.create(
            data.color,
            data.name
        );
        return this.repository.create(userid, group);
    }
    public async editGroup(userid:string, group:EditGroupDTO): Promise<Group | null>{

        const retrievedGroup = await this.repository.getByID(userid, group.id);
        if(!retrievedGroup){
            return null;
        }

        const groupData = retrievedGroup.toState();

        const editedGroup = Group.hidrate(
            group.id,
            group.color,
            group.name,
            new ISOString(new Date(groupData.lastReviewed)),
            new ISOString(new Date(groupData.nextReview))
        );

        return this.repository.edit(userid, editedGroup);
    }
    public async deleteGroup(userid:string, groupid:string): Promise<void>{
        return this.repository.delete(userid, groupid);
    }
} 