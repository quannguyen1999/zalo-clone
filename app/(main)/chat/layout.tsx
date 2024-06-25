import { ChatSidebar } from "@/components/chat/chat-sidebar"
import MessageBody from "@/components/message/message-body";
import { Main } from "next/document";

export const ChatLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
                <div className="hidden fixed md:flex w-60">
                    <ChatSidebar/>
                </div>
                <main className="h-full md:pl-[300px] w-full">
                    {children}
                </main>
        </div> 
    )
}

export default ChatLayout;