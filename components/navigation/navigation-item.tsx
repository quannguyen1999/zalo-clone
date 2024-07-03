'use client'
import { MessageCircle } from "lucide-react"
import { Contact } from 'lucide-react';
import { Check } from 'lucide-react';
import { useRouter } from "next/navigation";
import {useEffect} from 'react';
interface NavigationItemProps {
    id: number;
    icon: React.ReactNode;
    url: string;
}
export const NavigationItem = ({
    id,
    icon,
    url
}: NavigationItemProps) => {
    const router = useRouter();
    
    const navigatePage = () => {
        router.push(url);
    }
 
    return (
        <div>
            <button className="flex" onClick={navigatePage}>
                <div className="
                dark:text-black
                justify-center 
                items-center 
                flex
                rounded-[24px]
                h-[38px] w-[38px] 
                bg-blue-500 
                hover:rounded-[16px] transition-all
                border border-white
                dark:bg-gray-700 dark:hover:bg-gray-900
                dark:border-none
                ">
                    {icon}
                </div>
            </button>
        </div>
    )
}