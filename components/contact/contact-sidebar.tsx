import { Plus } from "lucide-react";
import { ChatHeader } from "../chat/chat-header";
import ContactBody from "./contact-body";

export const ContactSidebar = () => {
  return (
    <div className="flex flex-col h-full text-primary w-[250px]
        dark:bg-[#282D31] bg-white
        border-r border-gray-300 dark:border-gray-700
        ">
      <ContactBody />
    </div>
  );
};

export default ContactSidebar;
