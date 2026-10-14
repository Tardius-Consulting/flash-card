import React from "react"
import Modal from "./Shared/Modal"
import { ActionButton, FallBackButton } from "./Shared/Button"

export default function Index() {
    return<Modal onExit={() => console.log("teste1")}>
        <div className="group">
            <h2>Python</h2>
        </div>
        <div className="subgroup">
            <h3>Seus cards</h3>
            <button type="submit" id="Study" className="Button">Estudar</button>
        </div>
        <div className="Buttons">
            <button type="submit" id="Goback" className="Button">Voltar</button>
            <button type="submit" id="Creategroup" className="Button">Criar card</button>
        </div>
    </Modal>
}