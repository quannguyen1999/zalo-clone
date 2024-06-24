import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { Main } from "next/document";

export const ChatLayout = ({
    childrens
}: {
    childrens: React.ReactNode
}) => {
    return (
        <>
            <div className="">
                <ChatSidebar/>
                {childrens}
            </div>
        </>
    )
}

export default ChatLayout;