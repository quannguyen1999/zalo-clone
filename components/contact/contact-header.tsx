import { MobileToggle } from "../mobile-toggle";

interface ContactProps {
    icon: any;
    label: string;
}
export const ContactHeader = ({
    icon,
    label
}: ContactProps) => {
  return (
    <div
      className="w-full 
                p-3 top-0 left-0 flex 
                flex-row h-[75px]
                 border-b border-gray-300
                 justify-center items-center
                 pl-5
                "
    >
      <MobileToggle />
      {icon}
      <div className="flex-1 flex flex-col p-1 pl-2">
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default ContactHeader;
