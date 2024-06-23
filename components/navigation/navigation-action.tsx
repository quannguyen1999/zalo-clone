
import { Plus } from "lucide-react"
export const NagigationAction = () => {
    return (
        <div className="">
            <button className="flex">
                <div className="h-[48px] w-[48px] 
                overflow-hidden 
                justify-center 
                items-center 
                flex 
                bg-white 
                rounderd-full  
                rounded-[24px] 
                hover:rounded-[16px]
                transition-all
                dark:text-black
                ">
                    <Plus />
                </div>
                
            </button>
        </div>
    )
}