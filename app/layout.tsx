import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/provider/theme-provider';
import { NavigationSidebar } from '@/components/navigation/navigation-sidebar';
import { ModalProvider } from '@/components/provider/modal-provider';
const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <ClerkProvider>
        <body className={cn(font.className,
          "bg-white dark:bg-[#313338]"
          )}>
            <ThemeProvider attribute='class'
              defaultTheme='dark'
              enableSystem={true}
              storageKey='zalo-theme'
            >
                <ModalProvider />
                <main className="h-full">
                  <div className="hidden md:flex h-full w-[58px] fixed inset-y-0">
                    <NavigationSidebar />
                    {children}
                  </div>  
                </main>
            </ThemeProvider>
          </body>
      </ClerkProvider>
    </html>
  );
}
