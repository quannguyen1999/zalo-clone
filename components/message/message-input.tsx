"use client";
import { Heart, SendHorizontal, Video } from "lucide-react";
import { Input } from "../ui/input";
import { EmojiPicker } from "../emoji-picker";
import { useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { currentProfile } from "@/lib/current-profile";
interface ConversationProps {
  conversationId: string;
}
export const MessageInput = ({ conversationId }: ConversationProps) => {
  const [message, setMessage] = useState("");
  const handleKeyDown = async (e: any) => {
    if (e.code === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if(message.trim().length <= 0){
      return;
    }
    const data = {
      roomId: conversationId,
      content: message,
    };
    await axios.post("/api/socket/direct-messages", data);
    setMessage("");
  }

  const sendLike = async () => {
    const data = {
      roomId: conversationId,
      content: "👍",
    };
    await axios.post("/api/socket/direct-messages", data);
  };

  return (
    <div
      className="w-full border 
        border-t
        border-l-0
        border-gray-300
        h-14
        flex flex-row
        
        dark:bg-gray-900
        "
    >
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Nhập @, tin nhắn"
          className=" 
                    h-full focus-visible:ring-0
                    border-0
                    rounded-none
                    focus-visible:ring-offset-0
                    pl-5
                    dark:bg-gray-900
                    flex-1
                "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="items-center justify-center flex flex-col p-1 ">
        <EmojiPicker
          onChange={(emoji: string) => {
            setMessage(message + " " + emoji);
          }}
        />
      </div>
      <div className="items-center justify-center flex flex-col p-1 cursor-pointer" onClick={() => sendLike()}>
        👍
      </div>
      <div className="sm:hidden flex items-center justify-center flex-col p-1 cursor-pointer">
        <SendHorizontal  onClick={() => sendMessage()}/>
      </div>
    </div>
  );
};

export default MessageInput;
