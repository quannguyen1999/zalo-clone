import { MobileToggle } from "@/components/mobile-toggle";

export const ChatPage = () => {
  return (
    <div className="h-full flex flex-col text-center justify-center dark:bg-gray-700">
      <div className="absolute top-1 left-1">
        <MobileToggle />
      </div>

      <h1> Chào mừng đến với Zalo clone</h1>
      <p>Nhắn và Chửi</p>
    </div>
  );
};

export default ChatPage;
