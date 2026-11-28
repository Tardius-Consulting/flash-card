import React from "react"
import { ActionButton, FallBackButton } from "../Shared/Button" 
import Modal from "../Shared/Modal"
import { CardDTO } from "../../../../../types/card.dto"

export default function Index ({onCancel,card}: {card:CardDTO,onCancel:()=>void}){
    const [EditPergunta, setEditPergunta] = React.useState<string>(card.ask)
    const [EditResposta, setEditResposta] = React.useState<string>(card.answer)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEditPergunta (e.target.value);
    }
    const handleChangeResposta = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEditResposta (e.target.value);
    }    
    const onAction = ()=>{}

return(
    <Modal onExit={onCancel}>
    <div>
        <label>Editar sua pergunta</label>
        <input 
            type="text"
            value={EditPergunta}
            onChange={handleChange}
        />
            
        <label>Edite sua resposta</label>
        <input
            type="text"
            value={EditResposta}
            onChange={handleChangeResposta}
        />
        <div style={{display:"flex", flexDirection:"row"}}>
            <ActionButton onClick={onAction} text="Editar"/>
            <FallBackButton onClick={onCancel} text="Cancel"/>
        </div>

         
        </div>
    </Modal>
)

}