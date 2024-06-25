'use client'
import { Heart, Video } from "lucide-react";
import { Input } from "../ui/input";
import { EmojiPicker } from "../emoji-picker";

export const MessageInput = () => {
    return <div className="w-full border 
        border-t-2 
        border-gray-300
        h-14
        flex flex-row
        relative
        ">
            <Input placeholder="Nhập @, tin nhắn" 
                className=" 
                    h-full focus-visible:ring-0
                    border-0
                    rounded-none
                    focus-visible:ring-offset-0
                "/>
            <div className="w-[70px]">
                <div className="absolute 
                    text-center justify-center
                    top-4 right-12 cursor-pointer text-gray-600">
                    <EmojiPicker onChange={(emoji: string) => {}}/>
                </div>
                <div className="absolute 
                    text-center justify-center
                    top-4 right-4 cursor-pointer  text-gray-600">
                    <Heart className="cursor-pointer" size={20}/>
                </div>
            </div>
            
            
    </div>
}

export default MessageInput;