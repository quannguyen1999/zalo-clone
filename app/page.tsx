import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full">
      <div className="hidden md:flex h-full w-72px fixed inset-y-0">
        <NavigationSidebar />
        
      </div>
        
    </main>


  );

  {/* <div className="h-full">
<div className="hidden md:flex h-full w-[72px] *:z-30 flex-col fixed inset-y-0">
    <NavigationSidebar />
</div>
<main className="md:pl-[72px] h-full">
    {children}
</main>
</div> */}
}
