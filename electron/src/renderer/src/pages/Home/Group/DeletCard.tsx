import {ActionButton,FallBackButton} from "../Shared/Button" 
import Modal from "../Shared/Modal"
import { CardGateway } from "../../../Infrastructure/ElectronCardGateway"

export default function Index ({onCancel,id}:{id:string,onCancel:()=>void}) {
    const onAction = async()=>{
      try{
        const gateway=new CardGateway()
        await gateway.delete(id)
      }catch(err){}
    }

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
