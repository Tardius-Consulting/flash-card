import { createContext, useContext } from "react";
import { IReviewRepository } from "../Infrastructure/IReviewRepository";
import { ElectronReviewGateway } from "../Infrastructure/ElectronReviewGateway";

interface ReviewInterface{
    saveProcess:(value:ReviewInterface)=>Promise<void>
    finishProcess:()=>Promise<void>
}

const ReviewContext = createContext<ReviewInterface|null>(null)

export function ReviewProvider({children,repository}:{children:React.ReactNode,repository:IReviewRepository}){

    const gateway = new ElectronReviewGateway()

    const saveProcess = async (value:ReviewInterface)=>{
        await repository.saveState(value)
    }

    const finishProcess = async ()=>{
        const state = await repository.loadState()
        await repository.removeState();

    }
    const value:ReviewInterface = {
        saveProcess,
        finishProcess
    }
    return<ReviewContext.Provider value={value}>
        {children}
    </ReviewContext.Provider>
}

export function useReviewContext(){
    const context = useContext(ReviewContext)
    if(!context) throw new Error("Review Context must be used inside a Review Provider!")
    return context
}