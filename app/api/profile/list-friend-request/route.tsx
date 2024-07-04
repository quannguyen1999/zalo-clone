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
    friendRequestId: string;
}

export async function GET(
    req: Request
) {
    try{
        const currentProfileData = await currentProfile();

        const {searchParams} = new URL(req.url);

        const type = searchParams.get("type");
        
        const listReturnResultProfile: ProfileProps[] = [];
        let listSentRequestFriend;
        if(type === 'approve'){
            listSentRequestFriend = await db.friendRequest.findMany({
                where: {
                    receiverId: currentProfileData?.id,
                    status: 'pending'
                }
            })

        }else{
            listSentRequestFriend = await db.friendRequest.findMany({
                where: {
                    senderId: currentProfileData?.id,
                    status: 'pending'
                }
            })

        }
       

        const listProfile =await db.profile.findMany({
            where: {
                id: {
                    in: listSentRequestFriend.map(t=>  type === 'approve' ? t.senderId : t.receiverId)
                },
            }   
        });

        listProfile.map(value => {
            const profileProps: ProfileProps = {
                id: value.id,
                userId: value.id,
                name: value.name,
                imageUrl: value.imageUrl,
                email: value.email,
                status: type === 'approve' ? 'receivedRequest' : 'pending',
                friendRequestId: value.id
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

