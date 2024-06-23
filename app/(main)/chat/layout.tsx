import { ChatSidebar } from "@/components/chat/chat-sidebar"

export const Chat = ({
    childrens
}: {
    childrens: React.ReactNode
}) => {
    return (
        <>
            <div className="">
                <ChatSidebar/>
                
                xx
                {childrens}
            </div>
        </>
    )
}

export default Chat;