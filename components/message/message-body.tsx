import { useChatQuery } from "@/hook/use-chat-query";
import MessageItem from "./message-item";
import { Loader2 } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import { useChatSocket } from "@/hook/use-chat-socket";
interface ConversationProps {
  conversationId: string;
  profileId: string;
}

interface DirectMessage {
  id: string;
  roomId: string;
  content: string;
  fileUrl: string;
  profileId: string;
  deleted: boolean;
}

export const MessageBody = ({
  conversationId,
  profileId,
}: ConversationProps) => {
  const queryKey = `conversation:${conversationId}`;
  const addKey = `conversation:${conversationId}:messages`;
  const updateKey = `conversation:${conversationId}:messages:update`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =  useChatQuery({
      queryKey,
      apiUrl: "/api/direct-message",
      paramKey: "conversationId",
      paramValue: conversationId,
  });

  useChatSocket({queryKey, addKey, updateKey});
  
  // useChatScroll({
  //     chatRef,
  //     bottomRef,
  //     loadMore: fetchNextPage,
  //     shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
  //     count: data?.pages?.[0]?.items?.length ?? 0,
  // })

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col-reverse overflow-x-auto">
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group.items.map((messages: DirectMessage) => (
            <div key={messages.id}>
              <MessageItem
                id={messages.id}
                profileId={messages.profileId}
                currentProfileId={profileId}
                content={messages.content}
              />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default MessageBody;
