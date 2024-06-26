import { ChatBody } from "./chat-body"
import { ChatHeader } from "./chat-header"

export  const ChatSidebar = () => {
    return (
   
            <div className="hidden md:flex flex-col h-full fixed bg-white
             dark:bg-gray-700 w-[300px] border-r border-gray-300 dark:border-gray-700">
                <ChatHeader />
                <ChatBody />
            </div>
 
    )
}