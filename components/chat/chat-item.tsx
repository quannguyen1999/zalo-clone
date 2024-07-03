"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import axios from "axios";
import qs from "query-string";
import { db } from "@/lib/db";

import { cn } from "@/lib/utils"
import { currentProfile } from "@/lib/current-profile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { useSocket } from "../provider/socket-provider";
import { DirectMessage } from "@prisma/client";
interface ChatItemProps {
  id: string;
  type: "addFriend" | "listFriend";
  nameProfile: string | "none";
  email: string | "none";
  imageUrl:
    | string
    | "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg";
  status?: string;
  friendRequestId?: string;
  conversationId?: string;
  latestMessage?: string;
}
export const ChatItem = ({
  id,
  type,
  nameProfile,
  email,
  imageUrl,
  status,
  friendRequestId,
  conversationId,
  latestMessage
}: ChatItemProps) => {
  const [nameProfileCut, setNameProfileCut] = useState(nameProfile);
  const {socket} = useSocket();
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);

  const [latestMessageContent, setLatestMessageContent] = useState(latestMessage);

  useEffect(()=>{
  
    if(type == 'listFriend'){
    
      if (nameProfile.length > 10) {
        setNameProfileCut(nameProfile.slice(0, 10) + '...');
      } 

      socket.on('profileId:' + id, (status: any ) => {
        setIsOnline(true);
      });

      socket.on(`conversation:${conversationId}:messages`,  (message: any)  => {
        console.log("Call")
        setLatestMessageContent(message.content);
      });
    }
    
  }, [])


  const [currentStatus, setCurrentStatus] = useState(status);

  const addFriend = async () => {
    const url = qs.stringifyUrl({
      url: "/api/conversation/add",
      query: {
        profileIdRequest: id,
      },
    });

    await axios.get(url);
    setCurrentStatus("pending");
  };

  const cancelFriend = async () => {
    const url = qs.stringifyUrl({
      url: "/api/conversation/delete",
      query: {
        friendRequestId: friendRequestId,
      },
    });

    await axios.get(url);
    setCurrentStatus("");
  };

  const acceptFriend = async () => {
    const url = qs.stringifyUrl({
      url: "/api/conversation/accept",
      query: {
        friendRequestId: friendRequestId,
      },
    });

    await axios.get(url);
    setCurrentStatus("accepted");
  };

  const redirectToChat = async () => {
    if(type != 'listFriend'){
      return;
    }
    router.push(`/chat/conversation/${conversationId}/profile/${id}`);
  }

  return (
    <div
      className="flex flex-row w-full 
        h-[70px] cursor-pointer
        hover:bg-gray-100
        bg-white
        dark:hover:bg-gray-600
        dark:bg-gray-700
        dark:hover:text-white
        transition-all
        group
    "
    onClick={redirectToChat}
    >
      <div className="p-2 ">
      <div
      className="relative"
    >
      <div   className="relative 
        rounded-full 
        overflow-hidden
        border 
        bg-secondary
        h-12 w-12">
        <Image src={imageUrl} alt="User Avatar" fill className="object-cover" />
    
      </div>
        <div
        
        className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white", isOnline ? 'bg-green-500' : 'bg-red-500',)}></div>
    
    </div>
      </div>
      <div className="flex-1 flex flex-col mt-2">
        <div>
          <p
            className="text-sm text-gray-600
            dark:text-white 
            dark:group-hover:text-white 
          "
          >
            {nameProfileCut}
          </p>
        </div>
        <div>
          {type === "addFriend" ? (
            <p className="text-[10px] text-gray-400">{email}</p>
          ) : (
            <p className="text-sm text-gray-400">{latestMessageContent || 'Start chat...'}</p>
          )}
        </div>
      </div>
      <div className="p-2 text-xs dark:group-hover:text-black">
        {type == "addFriend" ? (
          <>
            {currentStatus === "pending" && (
              <div className="flex flex-row gap-1">
                <Button
                  className=" text-gray-500
          border 
            text-[10px]
          bg-gray-200
          h-8 w-12 border-1 border-black
          hover:bg-blue-200
            "
                  disabled
                >
                  Chờ
                </Button>
                <Button
                  className=" text-gray-500
                border 
                  text-[10px]
                bg-red-200
                h-8 w-12 border-1 border-black
                hover:bg-red-300
          "
                  onClick={cancelFriend}
                >
                  Bỏ cuộc
                </Button>
              </div>
            )}

            {currentStatus === "accepted" && (
              <Button
                className=" text-white 
            border 
            bg-green-400
            text-[10px]
            h-8 w-14 border-1 border-black
            hover:bg-green-600
              "
                disabled
              >
                Bạn bè
              </Button>
            )}

            {currentStatus === "" && (
              <Button
                className=" text-blue-500 
            border 
            bg-gray-200
            h-22 w-22 border-1 border-black
            hover:bg-blue-200
              "
                onClick={addFriend}
              >
                Kết bạn
              </Button>
            )}

            {currentStatus === "receivedRequest" && (
              <div className="flex flex-row gap-1">
                <Button
                  className=" text-gray-500
            border 
              text-[10px]
            bg-gray-200
            h-8 w-16 border-1 border-black
            hover:bg-blue-200
              "
                  onClick={acceptFriend}
                >
                  Chấp Nhận
                </Button>
                <Button
                  className=" text-gray-500
                  border 
                    text-[10px]
                  bg-red-200
                  h-8 w-10 border-1 border-black
                  hover:bg-red-300
            "
                  onClick={cancelFriend}
                >
                  Cút
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="dark:group-hover:text-white">1 hour</p>
        )}
      </div>
    </div>
  );
};
