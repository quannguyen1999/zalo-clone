import { ChatBody } from "./chat-body"
import { ChatHeader } from "./chat-header"

export  const ChatSidebar = () => {
    return (
   
        <div className="flex flex-col h-full text-primary 
        dark:bg-gray-700 bg-white
        border-r border-gray-300 dark:border-gray-900
        ">
            <ChatHeader />
            <ChatBody />
        </div> 
    )
}