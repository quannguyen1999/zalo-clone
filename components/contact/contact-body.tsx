import { BookUser, Plus, SmileIcon, Users } from "lucide-react";
import ContactItem from "./contact-item";

export const ContactBody = () => {
    const data = [
        // {
        //     id: 1,
        //     icon: <BookUser className="text-gray-600"/>,
        //     value: "Danh sách bạn bè",
        //     url: '/contact'
        // },
        {
            id: 2,
            icon: <SmileIcon className="text-gray-600 dark:text-white"/>,
            value: "Lời mời kết bạn",
            url: '/contact/list-request'
        },
        
        
    ];
    return (
        <div className="h-full overflow-auto dark:bg-gray-700">
           {
            data.map((value)=> (
                <ContactItem key={value.id}
                    icon={value.icon}
                    value={value.value}
                    url={value.url}
                />
            ))
           }
        </div>
    )
}

export default ContactBody;