import React from "react"
import { GroupColor, selectColors } from "./Shared/Select"
import { Group } from "./Shared/Group"
import { GroupGateway } from "../../Infrastructure/ElectronGroupGateway"

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

    const onAction = async()=>{
      try{
        const cor = selectColors[color].id.trim()
        const name = nomeGrupo.trim()
        if(cor as string == ""||name=="")
          throw new Error("nome e cor não podem ficar vazios")
        let gateway = new GroupGateway();
        await gateway.create({color:cor,name})
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
        actionButtonText="Criar grupo"
      />
    )
}