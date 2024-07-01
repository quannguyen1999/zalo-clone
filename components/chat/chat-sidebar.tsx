import { ChatBody } from "./chat-body"
import { ChatHeader } from "./chat-header"

export  const ChatSidebar = () => {
    return (
   
        <div className="flex flex-col h-full text-primary w-[250px]
        dark:bg-[#282D31] bg-white
        border-r border-gray-300 dark:border-gray-700
        ">
            <ChatHeader />
            <ChatBody />
        </div> 
    )
}