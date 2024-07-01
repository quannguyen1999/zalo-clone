'use client'
import { Menu } from "lucide-react"
import { Sheet,SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ChatSidebar } from "./chat/chat-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const MobileToggle = () => {
    // const router = useRouter();

    // const currentUrl = router.;
    
    // console.log(currentUrl);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[58px] bg-red-500">
                    <NavigationSidebar />
                </div>
                <div>
                    <ChatSidebar/>
                </div>
                
            </SheetContent>
        </Sheet>
    )
}