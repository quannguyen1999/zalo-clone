import ContactDetail from "@/components/contact/contact-detail";
import ContactHeader from "@/components/contact/contact-header";
import { SmileIcon, SmilePlus } from "lucide-react";
const contactInfo = {
    icon: <SmilePlus className="text-gray-600"/>,
    label: "Lời mời kết bạn",
}
export const ListRequest = () => {
    return <div className="h-full">
    <div className="flex flex-col h-full relative">
        <ContactHeader label={contactInfo.label}
            icon={contactInfo.icon}
        />
        <ContactDetail />
    </div>
  </div>
}

export default ListRequest;