'use client'
import { Camera, Video } from "lucide-react";
import Image from "next/image";
import MessageMain from "@/components/message/message-main";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import { db } from "@/lib/db";
interface ProfileProps {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    status: string;
}

interface ConversationProps {
    conversationId: string;
}

export const MessageHeader = ({
    conversationId
}: ConversationProps) => {
    const [profileFriend, setProfileFriend] = useState<ProfileProps>();

    useEffect(() => {
      const getInfoFriend = async () => {
        const url = qs.stringifyUrl({
          url: `/api/conversation/detail`,
          query: {
            conversationId: conversationId,
          },
        });
  
        const profile = await axios.get(url);
  
        setProfileFriend(profile.data.profiles);
      };
  
      getInfoFriend();
    }, [conversationId]);

    if(!profileFriend){
        return <div>Loading...</div>
    }

    return <div className="w-full 
            p-3 top-0 left-0 flex 
            flex-row h-[75px]
             border-b border-gray-300
            ">
         <div
            className="relative 
            rounded-full 
            overflow-hidden 
            border 
            bg-secondary
            h-12 w-12 border-1 border-black">
            <Image
            src={profileFriend.imageUrl}
            alt=""
            fill
            className="object-cover"
            />
        </div>
        <div className="flex-1 flex flex-col p-1 pl-2">
            <p className="text-gray-600">{profileFriend.name}</p>
            <p className="text-[10px] text-gray-400">{profileFriend.email}</p>
        </div>
        <div className=" p-4">
            <Video className="text-gray-700 cursor-pointer" size={20}/>
        </div>
        {/* <div className=" p-4">
            <Video className="text-gray-700 cursor-pointer" size={20}/>
        </div>
        <div className=" p-4">
            <Video className="text-gray-700 cursor-pointer" size={20}/>
        </div> */}
        
    </div>
}

export default MessageHeader;