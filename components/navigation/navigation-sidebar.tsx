import { UserButton } from "@clerk/nextjs";
import { Check, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { NagigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { Contact } from "lucide-react";
import { Settings } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const menuIconMapTop = [
  { id: 1, icon: <MessageCircle size={18}/>, url: "/chat" },
  { id: 2, icon: <Contact size={18}/>, url: "/contact" },
];

const menuIconMapBottom = [{ id: 1, icon: <Settings size={18}/> }];

export const NavigationSidebar = () => {
  return (
    <div className="w-full h-full bg-blue-500 dark:bg-gray-600 flex flex-col gap-2 p-2">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-[38px] w-[38px]",
          },
        }} 
      />
      {/* <NagigationAction /> */}
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

      <div className="flex flex-col gap-3">
        {menuIconMapBottom.map((menu) => (
          <NavigationItem 
            key={menu.id} 
            icon={menu.icon} 
            id={menu.id} 
            url=""
            />
        ))}
      </div>
    </div>
  );
};
