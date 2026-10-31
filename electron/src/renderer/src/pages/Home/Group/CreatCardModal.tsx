import React from "react"
import {ActionButton,FallBackButton} from "../Shared/Button" 
import Modal from "../Shared/Modal"

function index({onCancel}:{onCancel:()=>void}){
    const [pergunta, setPergunta] = React.useState<string>("")
    const [resposta, setResposta] = React.useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPergunta(e.target.value);
    }

    const handleRespostaChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setResposta(e.target.value)
    }

    const onAction = ()=>{}

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