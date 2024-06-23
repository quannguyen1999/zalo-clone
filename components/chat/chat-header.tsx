import { Input } from "../ui/input"
import { UserPlus } from 'lucide-react';

export const ChatHeader = () => {
    return (
        <div className="flex flex-row bg-blue-300 dark:bg-gray-500 w-full p-2 gap-1">
            <Input type="search" placeholder="Search contact..." 
                className="ring-0"/>
            <div className="bg-white hover:bg-blue-500 hover:text-white transition-all
                 dark:text-black p-2 w-[40px] h-[40px] 
                 dark:hover:bg-gray-700 dark:hover:text-white
                 cursor-pointer rounded-[40px]">
                <UserPlus />
            </div>
            <div className="bg-white hover:bg-blue-500 hover:text-white transition-all 
                dark:text-black p-2 w-[40px] h-[40px] 
                dark:hover:bg-gray-700 dark:hover:text-white
                cursor-pointer rounded-[40px]">
                <UserPlus />
            </div>
        </div>
    )
}