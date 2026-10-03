import { createContext, useContext, useState } from "react";
import { IReviewRepository, ReviewState } from "../Infrastructure/IReviewRepository";
import { ElectronReviewGateway } from "../Infrastructure/ElectronReviewGateway";

interface ReviewInterface{
    saveProcess:(index:number, status:boolean)=>Promise<void>
    finishProcess:()=>Promise<void>
    list:ReviewState[]
}

const ReviewContext = createContext<ReviewInterface|null>(null)

export function ReviewProvider({children,repository}:{children:React.ReactNode,repository:IReviewRepository}){

    const gateway = new ElectronReviewGateway()
    const [list,setList] = useState<ReviewState[]>([])

    const saveProcess = async (index:number, status:boolean)=>{
        const card = list[index]
        const updatedList = [...list]
        updatedList[index] = {...card, status}
        setList(updatedList)
        await repository.saveState(updatedList)
    }

    const finishProcess = async ()=>{
        const state = await repository.loadState()
        await gateway.registerReview(state)
        await repository.removeState();
    }
    const value:ReviewInterface = {
        saveProcess,
        finishProcess,
        list
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