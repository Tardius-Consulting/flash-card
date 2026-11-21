import React from "react"
import { GroupColor } from "./Shared/Select"
import { Group } from "./Shared/Group"

export default function Index({onCancel}:{onCancel:()=>void}){
    const [nomeGrupo, setNomeGrupo] = React.useState<string>("")
    const [color, setColor] = React.useState<GroupColor>("branco")

    const handleNomeGrupoChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNomeGrupo(e.target.value);
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setColor(e.target.value as GroupColor);
    }

    const onAction = ()=>{}

    return(
        <Group onCancel={onCancel} onAction={onAction} nomeGrupo={nomeGrupo} handleNomeGrupoChange={handleNomeGrupoChange} color={color} handleColorChange={handleColorChange} actionButtonText="Criar grupo"/>
    )
}