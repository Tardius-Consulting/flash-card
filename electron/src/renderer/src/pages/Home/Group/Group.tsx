import { Link, NavigateFunction, useNavigate, useParams } from "react-router"
import React, { useEffect, useRef, useState } from "react"
import { CardGateway } from "../../../Infrastructure/ElectronCardGateway"
import { CardDTO } from "../../../../../types/card.dto"
import EditCardModal from "./EditCardModal"
import DeleteCardModal from "./DeletCard"
import CreateCardModal from "./CreatCardModal"
import { ActionButton } from "../Shared/Button"

const groupStyle:React.CSSProperties = {
  width:"100%",
  height:"70px",
  border:"1px solid #0004",
  borderRadius:"8px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}

const Cards = ({card,setEdit,navigate}:{navigate: NavigateFunction,card:CardDTO,setEdit:(g:CardDTO)=>void})=>{
  const timerRef = useRef<number | null>(null);
  const isLongPressRef = useRef(false);

  const LONG_PRESS_MS = 500;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePointerDown = () => {
    isLongPressRef.current = false;
    clearTimer();

    timerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true;
      setEdit(card);
    }, LONG_PRESS_MS);
  };

  const handlePointerUp = () => {
    const wasLongPress = isLongPressRef.current;
    clearTimer();

    if (!wasLongPress) {
      navigate(card.id);
    }
  };

  const handlePointerCancelOrLeave = () => {
    clearTimer();
  };

  return<button 
    key={card.id}
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancelOrLeave}
      onPointerCancel={handlePointerCancelOrLeave}
      onContextMenu={(e) => {
        // Opcional: evita menu de contexto padrão ao segurar no desktop
        e.preventDefault();
      }}
    style={{...groupStyle,backgroundColor:"#FFF",color:"#333"}}
  >
    <span>{card.ask}</span>
  </button>
}

function CardList({createCard,setEdit,groupID}:{groupID:string,setEdit:(g:CardDTO)=>void,createCard:()=>void}){

  const [cards,setCards] = useState<CardDTO[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    const repository = new CardGateway()
    const f = async ()=>{
      const data = await repository.getList(groupID)
      setCards(data)
    }
    f()
  },[])
  return<div 
    style={{
      display:"grid",
      width:"100%",
      gridTemplateColumns:"repeat(auto-fit,minmax(110px,110px))",
      gap:"20px"
    }}
  >
    <div key={0} onClick={createCard} style={{...groupStyle,backgroundColor:"#007",color:"#ddd"}}>
      <span style={{fontSize:"25px"}}>+</span>
    </div>
    {
      cards.map(c=><Cards card={c} setEdit={setEdit} navigate={navigate}/>)
    }
  </div>
}

export default function Index(){
  
    const {groupId} = useParams()
    const [createGroup,setCreateGroup] = useState(false)
    const [editGroup,setEditGroup] = useState(false)
    const [deleteGroup,setDeleteGroup] = useState(false)
    const [card,setCard] = useState<CardDTO>()
    const [longPress,setLongPress] = useState(false)
    return<div
      style={{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column"
      }}
    >
      {editGroup && <EditCardModal card={card} onCancel={()=>setEditGroup(false)}/>}
      {deleteGroup && <DeleteCardModal id={card.id} onCancel={()=>setDeleteGroup(false)}/>}
      {createGroup && <CreateCardModal groupId={groupId} onCancel={()=>setCreateGroup(false)}/>}
      <div style={{width:"100%",border:"0px solid #0006",borderBottom:"1px",paddingBottom:"5px"}}>
        <h2>Cards</h2>
      </div>
      <CardList groupID={groupId} setEdit={(g:CardDTO)=>{setCard(g);setLongPress(true)}} createCard={()=>setCreateGroup(true)}/>
      <div style={{
        display:longPress?"flex":"none",
        flexGrow:"1",
        justifyContent:"end",
        alignItems:"end",
  
      }}>
        <ActionButton onClick={()=>setEditGroup(true)} text="Editar Card"/>
        <ActionButton onClick={()=>setDeleteGroup(true)} text="Excluir Card"/>
      </div>
      </div>
}