import { EditGroupDTO } from "../repository/GroupData";
import { IGroupRepository } from "../repository/IGroupRepository";

export class EditGroup{
    constructor(private repository:IGroupRepository){}

    public async editGroup(userid:string, group:EditGroupDTO): Promise<void>{

        const retrievedGroup = await this.repository.getByID(userid, group.id);

        if(!retrievedGroup){
            throw new Error(`Grupo com ID ${group.id} não encontrado.`);
        }

        retrievedGroup.update(group.color, group.name);

        await this.repository.edit(userid, retrievedGroup);
    }
} 