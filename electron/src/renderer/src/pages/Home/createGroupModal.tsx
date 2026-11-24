import React from "react"
import { GroupColor, selectColors } from "./Shared/Select"
import { Group } from "./Shared/Group"

export default function Index({onCancel}:{onCancel:()=>void}){
    const [nomeGrupo, setNomeGrupo] = React.useState<string>("")
    const [color, setColor] = React.useState(0)

    const handleNomeGrupoChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNomeGrupo(e.target.value);
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
      let index = Number(e.target.value)
      setColor(index);
    }

    const onAction = ()=>{
      const cor = selectColors[color]
      const name = nomeGrupo
    }

    return(
      <Group 
        onCancel={onCancel} 
        onAction={onAction} 
        colorIndex={color}
        nomeGrupo={nomeGrupo} 
        handleNomeGrupoChange={handleNomeGrupoChange}
        handleColorChange={handleColorChange} 
        actionButtonText="Criar grupo"
      />
    )
}