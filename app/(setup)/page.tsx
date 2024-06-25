import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation";

export const SetupPage = async () => {
    await initialProfile();
    return redirect(`/chat`);
}

export default SetupPage;