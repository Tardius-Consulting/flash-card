import { IGroupRepository } from "../repository/IGroupRepository";

export class DeleteGroup{
    constructor(private repository:IGroupRepository){}

    public async deleteGroup(userid:string, groupid:string): Promise<void>{
        return this.repository.delete(userid, groupid);
    }
} 