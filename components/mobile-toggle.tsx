"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ChatSidebar } from "./chat/chat-sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const MobileToggle = () => {
  const [isChatoaded, setIsChatoaded] = useState(false);

  useEffect(() => {
    // Assuming this side effect only needs to run once
    if (!isChatoaded) {
        setIsChatoaded(true);
    }
  }, [isChatoaded]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 ">
        <div className=" bg-orange-500">
          <NavigationSidebar />
        </div>
        <div className="bg-gray-500 w-full">
            <ChatSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};
