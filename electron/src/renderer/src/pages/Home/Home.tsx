import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { IReviewRepository } from "../../Infrastructure/IReviewRepository"
import { ActionButton } from "./Shared/Button"
import ReviewModal from "./Shared/Modal"
import { ReviewScreem } from "./Group/Review"
import CreateGroupModal  from "./createGroupModal"
import EditGroupModal from "./editGroupModal"
import DeleteGroupModal from "./deleteGroupModal"
import { GroupColor } from "./Shared/Select"

type SelectedGroup = {
    id: string
    name: string
    color: GroupColor
}

export default function HomeScreem({reviewRepository}:{reviewRepository:IReviewRepository}){
    const [pendingReview,setPendingReview] = React.useState(false)
    const [deleteGroup,setDeleteGroup] = React.useState(false)
    const [editGroup,setEditGroup] = React.useState(false)
    const [createGroup,setCreateGroup] = React.useState(false)
    const [selectedGroup,setSelectedGroup] = useState<SelectedGroup | null>(null)
    const [review, setReview] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const loadState = async()=>{
            const state = await reviewRepository.validateState()
            setPendingReview(state)
        }
        loadState()
    },[])

    const handleCreateGroup = async (name: string, color: GroupColor) => {
        const result = await window.groupAPI.createGroup({ name, color })
        if (result?.ok) {
            setCreateGroup(false)
        }
    }

    const handleEditGroup = async (name: string, color: GroupColor) => {
        if (!selectedGroup) return
        const result = await window.groupAPI.editGroup({
            id: selectedGroup.id,
            name,
            color,
        })
        if (result?.ok) {
            setEditGroup(false)
            setSelectedGroup(null)
        }
    }

    const handleDeleteGroup = async () => {
        if (!selectedGroup) return
        const result = await window.groupAPI.deleteGroup(selectedGroup.id)
        if (result?.ok) {
            setDeleteGroup(false)
            setSelectedGroup(null)
        }
    }

    return<>
    {
      review 
      && 
      <ReviewModal onExit={()=>setReview(false)}>
        <ReviewScreem reviewRepository={reviewRepository}/>
      </ReviewModal>
    }
    {deleteGroup && (<DeleteGroupModal onCancel={()=>setDeleteGroup(false)} onConfirm={handleDeleteGroup}/>)}
    {editGroup && selectedGroup && (<EditGroupModal initialName={selectedGroup.name} initialColor={selectedGroup.color} onCancel={()=>setEditGroup(false)} onSubmit={handleEditGroup}/>)}
    {createGroup && (<CreateGroupModal onCancel={()=>setCreateGroup(false)} onSubmit={handleCreateGroup}/>)}
    <ActionButton onClick={()=>setCreateGroup(true)} text="Criar grupo"/>
    <ActionButton onClick={()=>{setSelectedGroup({id: "1", name: "Exemplo", color: "branco"}); setEditGroup(true)}} text="Editar grupo"/>
    <ActionButton onClick={()=>{setSelectedGroup({ id: "1", name: "Exemplo", color: "branco" });setDeleteGroup(true)}} text="Excluir grupo"/>
    {pendingReview &&
        <button onClick={()=>navigate('/Review/')}>Continuar revisão</button>
    }
    <ActionButton onClick={()=>setReview(true)} text="testar revisão"/>
    </>
}