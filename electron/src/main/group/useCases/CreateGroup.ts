import { CreateGroupDTO } from "../repository/GroupData";
import { IGroupRepository } from "../repository/IGroupRepository";
import { Group } from "../model/Group";

export class CreateGroup{
    constructor(private repository:IGroupRepository){}

    public async createGroup(userid:string, data:CreateGroupDTO): Promise<Group>{ 
        const group = Group.create(
            data.color,
            data.name
        );
        return this.repository.create(userid, group);
    }
} 