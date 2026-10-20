import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"
import { useNavigate } from "react-router"

export default function Index(){
    const navigate = useNavigate()
    return<Modal onExit={() => console.log("teste2")}>
        <div className="container">
                <form>
                    <div className="Field">
                        <label htmlFor="GroupName">Nome do grupo:</label>
                        <input type="text" name="groupname" id="GroupName" minLength={1} maxLength={50} placeholder="Nome do grupo.." required/>
                    </div>
                    
                    <div className="Field">
                        <label htmlFor="GroupColor">Cor do grupo:</label>
                        <select name="groupcolor" id="GroupColor" required>
                            <option value="laranja">Laranja</option>
                            <option value="azul">Azul</option>
                            <option value="roxo">Roxo</option>
                        </select>
                    </div>
                    <div className="Buttons">
                        <FallBackButton text="Voltar" onClick={() => navigate('/GroupModal')}/>
                        <ActionButton text="Criar grupo" onClick={() => navigate('/GroupModal')}/>
                    </div>
                </form>
        </div>
    </Modal>
}