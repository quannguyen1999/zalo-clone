"use client";
import axios from "axios";
import { ChatItem } from "./chat-item";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useContactModal } from "@/hook/user-contact-store";
interface ProfileProps {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  status: string;
  friendRequestId: string;
  conversationId: string;
  latestMessage: string;
}
export const ChatBody = () => {
  const {data, isRefresh, setData, setRefresh} = useContactModal();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("/api/conversation");
        setData(response.data.items);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
      setRefresh(false);
    };

    if(isRefresh){
      fetchFriends();
    }
   
  }, []);

  return (
    <div className="h-full overflow-auto">
      {isRefresh &&
  <div className="flex flex-col flex-1 justify-center items-center">
  <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
  <p className="text-xs text-zinc-500 dark:text-zinc-400">
    Loading Contact...
  </p>
</div>
      }
      {data.map((value: ProfileProps) => (
        <ChatItem
          key={value.id}
          type="listFriend"
          nameProfile={value.name}
          imageUrl={value.imageUrl}
          email={value.email}
          id={value.id}
          status={value.status}
          friendRequestId=""
          conversationId={value.conversationId}
          latestMessage={value.latestMessage}

        />
      ))}
    </div>
  );
};
