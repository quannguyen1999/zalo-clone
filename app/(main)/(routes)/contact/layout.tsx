import { ChatSidebar } from "@/components/chat/chat-sidebar"
import ContactSidebar from "@/components/contact/contact-sidebar";
import { MobileToggle } from "@/components/mobile-toggle";
import { Main } from "next/document";

export const ContactLayout = ({
    childrens
}: {
    childrens: React.ReactNode
}) => {
    return (
        <>
            <div className="">
                <ContactSidebar />
                <MobileToggle />
            </div>
        </>
    )
}

export default ContactLayout;