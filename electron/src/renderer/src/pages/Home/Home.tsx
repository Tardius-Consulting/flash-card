import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { IReviewRepository } from "../../Infrastructure/IReviewRepository"
import { ActionButton } from "./Shared/Button"
import ReviewModal from "./Shared/Modal"
import { ReviewScreem } from "./Group/Review"
import CreateGroupModal  from "./createGroupModal"
import EditGroupModal from "./editGroupModal"
import DeleteGroupModal from "./deleteGroupModal"

export default function HomeScreem({reviewRepository}:{reviewRepository:IReviewRepository}){
    const [pendingReview,setPendingReview] = React.useState(false)
    const [deleteGroup,setDeleteGroup] = React.useState(false)
    const [editGroup,setEditGroup] = React.useState(false)
    const [createGroup,setCreateGroup] = React.useState(false)
    const [ review, setReview ] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        const loadState = async()=>{
            const state = await reviewRepository.validateState()
            setPendingReview(state)
        }
        loadState()
    },[])
    return<>
    {
      review 
      && 
      <ReviewModal onExit={()=>setReview(false)}>
        <ReviewScreem reviewRepository={reviewRepository}/>
      </ReviewModal>
    }
    {deleteGroup && <DeleteGroupModal onCancel={()=>setDeleteGroup(false)}/>}
    {editGroup && <EditGroupModal onCancel={()=>setEditGroup(false)}/>}
    {createGroup && <CreateGroupModal onCancel={()=>setCreateGroup(false)}/>}
    <ActionButton onClick={()=>setCreateGroup(true)} text="Criar grupo"/>
    <ActionButton onClick={()=>setEditGroup(true)} text="Editar grupo"/>
    <ActionButton onClick={()=>setDeleteGroup(true)} text="Excluir grupo"/>
    {pendingReview &&
        <button onClick={()=>navigate('/Review/')}>Continuar revisão</button>
    }
    <ActionButton onClick={()=>setReview(true)} text="testar revisão"/>
    </>
}