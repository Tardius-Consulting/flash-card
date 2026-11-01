import { ISOString } from "../../shared/ISOString";
import { EditGroupDTO } from "../repository/GroupData";
import { IGroupRepository } from "../repository/IGroupRepository";
import { Group } from "../model/Group";

export class EditGroup{
    constructor(private repository:IGroupRepository){}

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
} 