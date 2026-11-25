import React from "react"
import { selectColors } from "./Shared/Select"
import { Group } from "./Shared/Group"
import { GroupGateway } from "../../Infrastructure/ElectronGroupGateway"
import { GroupDB } from "../../../../main/group/repository/GroupDB"

export default function Index({onCancel,group}:{onCancel:()=>void,group:GroupDB}){
    const [nomeGrupo, setNomeGrupo] = React.useState<string>(group.name)
    const [color, setColor] = React.useState(selectColors[group.color])

    const handleNomeGrupoChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNomeGrupo(e.target.value);
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
      let index = Number(e.target.value)
      setColor(index);
    }
    
  const onAction = async()=>{
    try{
      const cor = selectColors[color].id.trim()
      const name = nomeGrupo.trim()
      if(cor as string == ""||name=="")
        throw new Error("nome e cor não podem ficar vazios")
      let gateway = new GroupGateway();
      await gateway.edit({...group,color:cor,name})
      onCancel()
    }catch(err){
        alert(err.message)
        onCancel()
      }
  }

  return(
    <Group 
    onCancel={onCancel} 
    onAction={onAction} 
    colorIndex={color}
    nomeGrupo={nomeGrupo} 
    handleNomeGrupoChange={handleNomeGrupoChange} 
    handleColorChange={handleColorChange} 
    actionButtonText="Salvar"/>   
  )
}