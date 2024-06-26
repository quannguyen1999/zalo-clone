"use client";
import axios from "axios";
import { ChatItem } from "./chat-item";
import { useEffect, useState } from "react";
interface ProfileProps {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  status: string;
  friendRequestId: string;
  conversationId: string;
}
export const ChatBody = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("/api/conversation");

        setFriends(response.data.items);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="h-full overflow-auto">
      {friends.map((value: ProfileProps) => (
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
        />
      ))}
    </div>
  );
};
