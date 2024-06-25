import { Camera, Video } from "lucide-react";
import Image from "next/image";

export const MessageHeader = () => {
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
            src="https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg"
            alt=""
            fill
            className="object-cover"
            />
        </div>
        <div className="flex-1 flex flex-row p-2 pl-2">
            <p>NickName</p>
        </div>
        <div className=" p-4">
            <Video className="text-gray-700 cursor-pointer" size={20}/>
        </div>
        <div className=" p-4">
            <Video className="text-gray-700 cursor-pointer" size={20}/>
        </div>
        <div className=" p-4">
            <Video className="text-gray-700 cursor-pointer" size={20}/>
        </div>
        
    </div>
}

export default MessageHeader;