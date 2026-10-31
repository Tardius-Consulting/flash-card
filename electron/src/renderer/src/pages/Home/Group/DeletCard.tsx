import React, { useState } from "react"
import {ActionButton,FallBackButton} from "../Shared/Button" 
import Modal from "../Shared/Modal"

function index ({onCancel}:{onCancel:()=>void}) {
    const onAction = ()=>{}

    return(

        <Modal onExit={onCancel}>
            <div>
                <p>Deseja excluir o card?</p>

                <div style={{display:"flex", flexDirection:"row"}}>
                    <ActionButton onClick={onAction} text="Sim"/>
                    <FallBackButton onClick={onCancel} text="Não"/> 
                </div>
            </div>
        </Modal>
    )
}
