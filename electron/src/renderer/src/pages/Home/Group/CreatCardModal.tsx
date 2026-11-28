import React from "react"
import {ActionButton,FallBackButton} from "../Shared/Button" 
import Modal from "../Shared/Modal"
import { CardGateway } from "../../../Infrastructure/ElectronCardGateway"

export default function Index({onCancel,groupId="default"}:{groupId:string,onCancel:()=>void}){
    const [pergunta, setPergunta] = React.useState<string>("")
    const [resposta, setResposta] = React.useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPergunta(e.target.value);
    }

    const handleRespostaChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setResposta(e.target.value)
    }

    const onAction = async()=>{
      try{
        const gateway = new CardGateway()
        const ask = pergunta.trim()
        const answer =resposta.trim()
        const gId =groupId.trim()
        if(ask == ""||answer==""||gId=="")
          throw new Error("Pergunta, resposta ou grupo não podem ficar vazios")
        await gateway.create({pergunta:ask,resposta:answer,groupid:gId})
        onCancel()
      }catch(err){
        alert(err.message)
        onCancel()
      }
    }

    return(
        <Modal onExit={onCancel}>
            <div>
                <label>Escreva sua pergunta:</label>
                <input 
                    type="text"
                    value={pergunta}
                    onChange={handleChange}
                />
                
                <label>Digite sua resposta:</label>
                <input
                    type="text"
                    value={resposta}
                    onChange={handleRespostaChange}
                />
                
                <div style={{display:"flex",flexDirection:"row"}}>
                    <ActionButton onClick={onAction} text="Criar"/>
                    <FallBackButton onClick={onCancel} text="Cancelar"/>
                </div>
            </div>
        </Modal>
    );
}