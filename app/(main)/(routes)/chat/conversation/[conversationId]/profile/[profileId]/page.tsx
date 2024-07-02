'use client'
import MessageBody from "@/components/message/message-body";
import MessageHeader from "@/components/message/message-header";
import MessageInput from "@/components/message/message-input";
import { currentProfile } from "@/lib/current-profile";
interface ConversationPageProp {
  params: {
    conversationId: string;
    profileId: string;
  };
}

const ConversationId = async ({ params }: ConversationPageProp) => {

  return (
    <div className=" h-full w-full">
      <div className="flex flex-col h-full w-full relative ">
        <MessageHeader conversationId={params.conversationId}/>
        <MessageBody conversationId={params.conversationId} profileId={params.profileId}/>
        <MessageInput conversationId={params.conversationId}/>
      </div>
    </div>
  );
};

export default ConversationId;
