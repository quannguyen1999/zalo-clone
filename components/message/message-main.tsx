import MessageBody from "./message-body";
import MessageHeader from "./message-header";
import MessageInput from "./message-input";

export const MessageMain = () => {
    return <div className="flex flex-col h-full w-full relative">
        <MessageHeader />
        <MessageBody />
        <MessageInput />
    </div>
}

export default MessageMain;