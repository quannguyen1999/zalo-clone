'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ContactItemProps {
    icon: any;
    value: string;
    url: string;
}
export const ContactItem = ({
    icon,
    value,
    url
}: ContactItemProps) => {
    const router = useRouter();
    const redirectToChat = async () => {
        router.push(url);
    }
    return (
        <div className="flex flex-row p-4 gap-4 cursor-pointer hover:bg-gray-100" 
        onClick={() => redirectToChat()}>
            <div>
                {icon}
            </div>
            <div>
                <p className="text-base">{value}</p>
            </div> 
        </div>
    )
}

export default ContactItem;