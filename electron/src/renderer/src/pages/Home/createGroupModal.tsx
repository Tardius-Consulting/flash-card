import React, {Modal} from "react"

export default function Index(){
    return<Modal>
        <div class="container">
                <form>
                    <div class="Field">
                        <label for="GroupName">Nome do grupo:</label>
                        <input type="text" name="groupname" id="GroupName" minlength="1" maxlength="50" placeholder="Nome do grupo.." required>
                    </div>
                    <div class="Field">
                        <label for="GroupColor">Cor do grupo:</label>
                        <select name="groupcolor" id="GroupColor" required>
                            <option value="laranja">Laranja</option>
                            <option value="azul">Azul</option>
                            <option value="roxo">Roxo</option>
                        </select>
                    </div>
                    <div class="Buttons">
                        <button type="submit" id="Goback" class="Button">Voltar</button>
                        <button type="submit" id="Creategroup" class="Button">Criar grupo</button>
                    </div>
                </form>
        </div>
    </Modal>
}