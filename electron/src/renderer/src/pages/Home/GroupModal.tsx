import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"
import { useNavigate } from "react-router"

export default function Index(){
    const navigate = useNavigate()
    return<Modal onExit={() => console.log("teste3")}>
        <div className="group">
                <h2>Python</h2>
            </div>
            <div className="subgroup">
                <h3>Seus cards</h3>
                <button type="submit" id="Study" className="Button">Estudar</button>
                <ActionButton text="Estudar" onClick={() => console.log('Estudando...')}/>
            </div>
            <div className="Buttons">
                <FallBackButton text="Voltar" onClick={() => navigate('/GroupModal')}/>
                <ActionButton text="Criar card" onClick={() => navigate('/createGroupModal')}/>
        </div>
    </Modal>
}