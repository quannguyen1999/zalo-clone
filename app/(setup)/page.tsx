import { currentProfile } from "@/lib/current-profile";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  await initialProfile();



  return redirect(`/chat`);
};

export default SetupPage;
