'use client'
import MessageBody from "@/components/message/message-body";
import MessageMain from "@/components/message/message-main";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import { db } from "@/lib/db";
import MessageHeader from "@/components/message/message-header";
import MessageInput from "@/components/message/message-input";
interface ConversationPageProp {
  params: {
    conversationId: string;
  };
}
export const ConversationId = ({ params }: ConversationPageProp) => {
 

  return (
    <div className=" h-full w-full">
      <div className="flex flex-col h-full w-full relative ">
        <MessageHeader conversationId={params.conversationId}/>
        <MessageBody />
        <MessageInput />
      </div>
    </div>
  );
};

export default ConversationId;
