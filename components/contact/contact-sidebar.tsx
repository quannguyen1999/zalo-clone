import { Plus } from "lucide-react";
import { ChatHeader } from "../chat/chat-header"
import ContactBody from "./contact-body";

export  const ContactSidebar = () => {
    return (
        <>
            <div className="hidden   md:flex flex-col h-full fixed bg-white
             dark:bg-gray-700 w-[300px] border-r-2 border-gray-300 dark:border-gray-700">
                <ChatHeader />
                <ContactBody />
            </div>
        </>
    )
}

export default ContactSidebar;