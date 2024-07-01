'use client'
import { useModal } from "@/hook/user-modal-store";
import { Input } from "../ui/input"
import { UserPlus } from 'lucide-react';

export const ChatHeader = () => {
    const {onOpen} = useModal();
    return (
        <div className="flex flex-row bg-white dark:bg-gray-500 w-full p-2 gap-1">
            <div className="bg-white hover:bg-blue-500 
                 text-gray-700 hover:text-white transition-all
                 dark:text-black p-2 w-[30px] h-[30px] 
                 dark:hover:bg-gray-700 dark:hover:text-white
                 cursor-pointer rounded-[40px] justify-center" onClick={() => onOpen("addFriend")}>
                <UserPlus size={17}/>
            </div>
            <Input type="search" placeholder="Search contact..." 
                className="focus-visible:ring-0 h-[35px] focus-visible:ring-offset-0"/>
           
        </div>
    )
}