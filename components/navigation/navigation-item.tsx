import { MessageCircle } from "lucide-react"
import { Contact } from 'lucide-react';
import { Check } from 'lucide-react';
interface NavigationItemProps {
    id: number;
    icon: React.ReactNode
}
export const NavigationItem = ({
    id,
    icon
}: NavigationItemProps) => {
    return (
        <div>
            <button className="flex">
                <div className="
                justify-center 
                items-center 
                flex
                rounded-[24px]
                h-[48px] w-[48px] bg-white hover:rounded-[16px] transition-all">
                    {icon}
                </div>
            </button>
        </div>
    )
}