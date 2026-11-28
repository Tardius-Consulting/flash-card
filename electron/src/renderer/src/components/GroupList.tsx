import { Link, NavigateFunction, useNavigate } from "react-router"
import { GroupGateway } from "../Infrastructure/ElectronGroupGateway"
import React, { useEffect, useRef, useState } from "react"
import { GroupDB } from "../../../main/group/repository/GroupDB"

function getContrastTextColor(hex: string): "#000000" | "#FFFFFF" {
  // Remove o '#' e expande formato curto (#72D -> 7722DD)
  const cleanHex = hex.replace("#", "");
  const fullHex = cleanHex.length === 3
    ? cleanHex.split("").map((c) => c + c).join("")
    : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Cálculo de brilho percebido (escala de 0 a 255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
}

const groupStyle:React.CSSProperties = {
  width:"100%",
  height:"70px",
  border:"1px solid #0004",
  borderRadius:"8px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}

const GroupCard = ({group,setEdit,navigate}:{navigate: NavigateFunction,group:GroupDB,setEdit:(g:GroupDB)=>void})=>{
  const color = getContrastTextColor(group.color)
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
      setEdit(group);
    }, LONG_PRESS_MS);
  };

  const handlePointerUp = () => {
    const wasLongPress = isLongPressRef.current;
    clearTimer();

    if (!wasLongPress) {
      navigate(group.id);
    }
  };

  const handlePointerCancelOrLeave = () => {
    clearTimer();
  };

  return<button 
      key={group.id}
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancelOrLeave}
      onPointerCancel={handlePointerCancelOrLeave}
      onContextMenu={(e) => {
        // Opcional: evita menu de contexto padrão ao segurar no desktop
        e.preventDefault();
      }}
    style={{...groupStyle,backgroundColor:group.color,color}}
  >
    <span>{group.name}</span>
  </button>
}

export default function Index({createGroup,setEdit}:{setEdit:(g:GroupDB)=>void,createGroup:React.Dispatch<React.SetStateAction<boolean>>}){

  const [groups,setGroups] = useState<GroupDB[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    const repository = new GroupGateway()
    const f = async ()=>{
      const data = await repository.getList()
      setGroups(data)
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
    <div key={0} onClick={()=>createGroup(true)} style={{...groupStyle,backgroundColor:"#007",color:"#ddd"}}>
      <span style={{fontSize:"25px"}}>+</span>
    </div>
    {
      groups.map(g=><GroupCard group={g} setEdit={setEdit} navigate={navigate}/>)
    }
  </div>
}