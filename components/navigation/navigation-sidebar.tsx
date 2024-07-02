import { UserButton } from "@clerk/nextjs";
import { Check, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { NagigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { Contact } from "lucide-react";
import { Settings } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const menuIconMapTop = [
  { id: 1, icon: <MessageCircle size={19} className="text-white"/>, url: "/chat" },
  { id: 2, icon: <Contact size={19} className="text-white"/>, url: "/contact/list-request" },
];

export const NavigationSidebar = () => {
  return (
    <div className="w-full h-full bg-blue-500 
        dark:bg-gray-600 flex 
        flex-col gap-2 p-2">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-[38px] w-[38px]",
          },
        }} 
      />
      <div className="flex-1 flex flex-col gap-3">
        {menuIconMapTop.map((menu) => (
          <NavigationItem 
            key={menu.id} 
            icon={menu.icon} 
            id={menu.id} 
            url={menu.url}
            />
        ))}
      </div>

      <div className="flex flex-col items-center">
        <ModeToggle />
      </div>
    </div>
  );
};
