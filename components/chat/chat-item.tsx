import Image from "next/image";

export const ChatItem = () => {
  return (
    <div className="flex flex-row w-full h-[70px] cursor-pointer
        hover:bg-gray-100
      transition-all
        group
    ">
      <div className="p-2 ">
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
      </div>
      <div className="flex-1 flex flex-col mt-2">
        <div>
          <p className="text-sm text-gray-600
            dark:text-white 
            dark:group-hover:text-black
          ">NickName</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Message</p>
        </div>
      </div>
      <div className="p-2 text-xs dark:group-hover:text-black">
        <p>1 hour</p>
      </div>
    </div>
  );
};
