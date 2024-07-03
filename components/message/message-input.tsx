"use client";
import { Heart, Video } from "lucide-react";
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
      const data = {
        roomId: conversationId,
        content: message,
      };
      await axios.post("/api/socket/direct-messages", data);
      setMessage("");
    }
  };

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
        relative
        dark:bg-gray-900
        "
    >
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
                "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="w-[70px] ">
        <div
          className="absolute 
                    text-center justify-center
                    top-4 right-12 cursor-pointer text-gray-600"
        >
          <EmojiPicker
            onChange={(emoji: string) => {
              setMessage(message + " " + emoji);
            }}
          />
        </div>
        <div
          className="absolute text-center justify-center top-3 right-4 cursor-pointer  text-gray-600"
          onClick={() => sendLike()}
        >
          <div className="inline-block rounded-full overflow-hidden text-lg ">
            👍
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
