'use client'
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import MessageBody from "@/components/message/message-body";
import { useEffect } from "react";

import { currentProfile } from "@/lib/current-profile";
import axios from "axios";
import queryString from "query-string";
const ChatLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    useEffect(()=>{
        const excuteTriggerOnline = async () => {
            const url = queryString.stringifyUrl({
                url: `/api/socket/profile`,
              });
            await axios.get(url);
        }

        excuteTriggerOnline();
    }, []);
   
    return (
        <div className="h-full">
                <div className="hidden fixed md:flex h-full w-60 z-20 flex-col inset-y-0">
                    <ChatSidebar/>
                </div>
                <main className="h-full md:pl-60">
                    {children}
                </main>
        </div> 
    )
}

export default ChatLayout;