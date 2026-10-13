import React, {Modal} from "react"

export default function Index(){
    return<Modal>
        <div class="group">
                <h2>Python</h2>
            </div>
            <div class="subgroup">
                <h3>Seus cards</h3>
                <button type="submit" id="Study" class="Button">Estudar</button>
            </div>
            <div class="Buttons">
                <button type="submit" id="Goback" class="Button">Voltar</button>
                <button type="submit" id="Creategroup" class="Button">Criar card</button>
        </div>
    </Modal>
}