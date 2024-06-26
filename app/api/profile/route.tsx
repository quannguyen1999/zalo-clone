import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { initialProfile } from "@/lib/initial-profile";
import { currentUser } from "@clerk/nextjs/server";
import { currentProfile } from "@/lib/current-profile";

interface ProfileProps {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    status: string;
}
  

export async function GET(
    req: Request
) {
    try{
        const currentProfileData = await currentProfile();

        const {searchParams} = new URL(req.url);

        const emailProfile = searchParams.get("emailProfile");
        
        const listReturnResultProfile: ProfileProps[] = [];

        const profiles = await db.profile.findMany({
            where: {
              AND: [
                {
                    email:{
                        contains: emailProfile!,
                        mode: "insensitive",
                    } 
                },
                {
                    email: {
                        not: currentProfileData?.email,
                    }
                }
              ]
              
            },
            take: 5
        })

        const listSentRequestFriend = await db.friendRequest.findMany({
            where: {
                senderId: currentProfileData?.id,
                receiverId: {
                    in: profiles.map(t=> t.id)
                }
            }   
        })

        const listReceivedFriend = await db.friendRequest.findMany({
            where: {
                senderId: {
                    in: profiles.map(t=> t.id)
                },
                receiverId: currentProfileData?.id,
            }   
        })

       

        profiles.map(value => {
            const profileProps: ProfileProps = {
                id: value.id,
                userId: value.id,
                name: value.name,
                imageUrl: value.imageUrl,
                email: value.email,
                status: '',
            }
            
            const sentRequestProfile = listSentRequestFriend.filter(t => t.receiverId === value.id);
            if(sentRequestProfile.length > 0){
                profileProps.status = sentRequestProfile[0].status;
            }
 
            const receivedProfile = listReceivedFriend.filter(t => t.senderId === value.id);

            if(receivedProfile.length > 0){
                    profileProps.status = 'receivedRequest';
            }

            listReturnResultProfile.push(profileProps);
        })

        return NextResponse.json({
            items: listReturnResultProfile
        })

    }catch(error){
        console.log("[PROFILE_ERROR]", error);
        return new NextResponse("internal server error", {status: 500});
    }
}

