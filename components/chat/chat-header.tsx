'use client'
import { useModal } from "@/hook/user-modal-store";
import { Input } from "../ui/input"
import { UserPlus } from 'lucide-react';
import { useContactModal } from "@/hook/user-contact-store";
import { useEffect, useState } from "react";

interface ChatHeaderProps {
    onValueChange: (query: string) => void;
}

export const ChatHeader = ({

    onValueChange
}: ChatHeaderProps) => {
    const {onOpen} = useModal();

    const handleChange = (e: any) => {
        onValueChange(e.target.value);
    }

    return (
        <div className="flex flex-row bg-white dark:bg-gray-700 w-full p-2 gap-1">
            <div className="bg-white hover:bg-blue-500 
                 text-gray-700 hover:text-white transition-all
                 dark:bg-gray-600 dark:border-gray-800
                 dark:hover:bg-gray-900
                 dark:text-white
                 dark:text-black p-2 w-[30px] h-[30px] 
                 dark:hover:bg-gray-700 dark:hover:text-white
                 cursor-pointer rounded-[40px] justify-center" onClick={() => onOpen("addFriend")}>
                <UserPlus size={17}/>
            </div>
            <Input onChange={(e) => handleChange(e)} type="search" placeholder="Search contact..." 
                className="focus-visible:ring-0 h-[35px] focus-visible:ring-offset-0 dark:bg-gray-600 dark:border-gray-600"/>
           
        </div>
    )
}