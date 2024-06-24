import { Input } from "../ui/input"
import { UserPlus } from 'lucide-react';

export const ChatHeader = () => {
    return (
        <div className="flex flex-row bg-white dark:bg-gray-500 w-full p-2 gap-1">
            <Input type="search" placeholder="Search contact..." 
                className="focus-visible:ring-0 h-[35px]"/>
            <div className="bg-white hover:bg-blue-500 hover:text-white transition-all
                 dark:text-black p-2 w-[30px] h-[30px] 
                 dark:hover:bg-gray-700 dark:hover:text-white
                 cursor-pointer rounded-[40px] justify-center">
                <UserPlus size={17} className="text-gray-700"/>
            </div>
            <div className="bg-white hover:bg-blue-500 hover:text-white transition-all 
                dark:text-black p-2 w-[30px] h-[30px] 
                dark:hover:bg-gray-700 dark:hover:text-white
                cursor-pointer rounded-[40px] focus-visible:ring-0">
                <UserPlus size={17} className="text-gray-700"/>
            </div>
        </div>
    )
}