import { BookUser, Plus, SmileIcon, Users } from "lucide-react";
import ContactItem from "./contact-item";

export const ContactBody = () => {
    const data = [
        {
            id: 1,
            icon: <BookUser className="text-gray-600"/>,
            value: "Danh sách bạn bè"
        },
        {
            id: 2,
            icon: <SmileIcon className="text-gray-600"/>,
            value: "Lời mời kết bạn"
        },
        
        
    ];
    return (
        <div className="h-full overflow-auto">
           {
            data.map((value)=> (
                <ContactItem key={value.id}
                    icon={value.icon}
                    value={value.value}
                />
            ))
           }
        </div>
    )
}

export default ContactBody;