
import { auth, currentUser } from "@clerk/nextjs/server"
import {db} from "@/lib/db";
export const currentProfile = async () => {
    const data = await currentUser();

    if(!data){
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: data.id
        }
    })

    return profile;
}