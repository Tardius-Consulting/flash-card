import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"

export default function Index({onCancel}:{onCancel:()=>void}){
    const onAction = ()=>{}

    return(
        <Modal onExit={onCancel}>
            <div style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignContent: "center", width: "95%", margin: "auto", padding: "10px 25px 15px 25px", border: "2px solid #8b8b8b", borderRadius: "15px", backgroundColor: "#d7d7d7"}}>
                <p style={{padding: "10px 0px", fontWeight: "700", fontSize: "20px", color: "#444444", textAlign: "center"}}>Deseja excluir o grupo?</p>
                <div style={{display: "flex", flexFlow: "row nowrap", justifyContent: "center" , gap: "5px"}}>
                    <FallBackButton text="Voltar" onClick={onCancel}/>
                    <ActionButton text="Excluir" onClick={onAction}/>
                </div>
            </div>
        </Modal>
    )
}