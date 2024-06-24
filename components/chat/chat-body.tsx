import { ChatItem } from "./chat-item"

export const ChatBody = () => {
    const data = [1,2,3,4,5,6,7,8,9,10,11,12,12,14,5];
    return (
        <div className="h-full overflow-auto">
            {data.map((value) => (
                <ChatItem key={value}/>
            
            ))}
        </div>
    )
}