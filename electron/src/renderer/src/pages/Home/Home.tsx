import { useState } from "react"
import { IReviewRepository } from "../../Infrastructure/IReviewRepository"
import GroupList from "../../components/GroupList"
import ReviewComponent from "../../components/ReviewArea"
import CreateGroupModal from "./createGroupModal"
import EditGroupModal from "./editGroupModal"
import { GroupDB } from "../../../../main/group/repository/GroupDB"
import DeleteGroupModal from "./deleteGroupModal"
import { ActionButton } from "./Shared/Button"

export default function HomeScreem({reviewRepository}:{reviewRepository:IReviewRepository}){
  const [createGroup,setCreateGroup] = useState(false)
  const [editGroup,setEditGroup] = useState(false)
  const [deleteGroup,setDeleteGroup] = useState(false)
  const [group,setGroup] = useState<GroupDB>()
  const [longPress,setLongPress] = useState(false)
    return<div
      style={{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column"
      }}
    >
    {editGroup && <EditGroupModal group={group} onCancel={()=>setEditGroup(false)}/>}
    {deleteGroup && <DeleteGroupModal id={group.id} onCancel={()=>setDeleteGroup(false)}/>}
    {createGroup && <CreateGroupModal onCancel={()=>setCreateGroup(false)}/>}
    <ReviewComponent reviewRepository={reviewRepository}/>
    <GroupList setEdit={(g:GroupDB)=>{setGroup(g);setLongPress(true)}} createGroup={setCreateGroup}/>
    <div style={{
      display:longPress?"flex":"none",
      flexGrow:1,
      justifyContent:"end",
      alignItems:"end",

    }}>
      <ActionButton onClick={()=>setEditGroup(true)} text="Editar grupo"/>
      <ActionButton onClick={()=>setDeleteGroup(true)} text="Excluir grupo"/>
    </div>
    </div>
}