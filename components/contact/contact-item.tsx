import { Plus } from "lucide-react";
interface ContactItemProps {
    icon: any;
    value: string;
}
export const ContactItem = ({
    icon,
    value
}: ContactItemProps) => {
    return (
        <div className="flex flex-row p-4 gap-4 cursor-pointer">
            <div>
                {icon}
            </div>
            <div>
                <p className="text-base">{value}</p>
            </div> 
        </div>
    )
}

export default ContactItem;