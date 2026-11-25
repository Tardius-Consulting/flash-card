import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"
import { GroupGateway } from "../../Infrastructure/ElectronGroupGateway"

export default function Index({onCancel,id}:{onCancel:()=>void,id:string}){
    const onAction = async()=>{
      try{
        const groupId = id.trim()
        if(groupId == "")
          throw new Error("Nenhum id informado")
        let gateway = new GroupGateway()
        await gateway.delete(groupId)
        onCancel()
      }catch(err){
        alert(err.message)
        onCancel()
      }
    }

    return(
        <Modal onExit={onCancel}>
            <div style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", width: "100%", height: "100%"}}>
                <p style={{padding: "10px 0px", textAlign: "center"}}>Deseja excluir o grupo?</p>
                <div style={{display: "flex", flexFlow: "row nowrap", justifyContent: "center" , gap: "5px"}}>
                    <FallBackButton text="Voltar" onClick={onCancel}/>
                    <ActionButton text="Excluir" onClick={onAction}/>
                </div>
            </div>
        </Modal>
    )
}