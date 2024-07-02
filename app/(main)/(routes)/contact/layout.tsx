import { ChatSidebar } from "@/components/chat/chat-sidebar";
import ContactSidebar from "@/components/contact/contact-sidebar";
import { MobileToggle } from "@/components/mobile-toggle";

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden fixed md:flex z-20 flex-col inset-y-0">
        <ContactSidebar />
        <MobileToggle />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ContactLayout;
