import { ChatSidebar } from "@/components/chat/chat-sidebar"
import ContactSidebar from "@/components/contact/contact-sidebar";
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
                {childrens}
            </div>
        </>
    )
}

export default ContactLayout;