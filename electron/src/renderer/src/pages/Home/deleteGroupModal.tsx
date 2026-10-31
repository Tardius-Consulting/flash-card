import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"

export default function Index({onCancel}:{onCancel:()=>void}){
    const onAction = ()=>{}

    return(
        <Modal onExit={onCancel}>
            <div>
                <p>Deseja excluir o grupo?</p>
                <div>
                    <FallBackButton text="Voltar" onClick={onCancel}/>
                    <ActionButton text="Excluir" onClick={onAction}/>
                </div>
            </div>
        </Modal>
    )
}