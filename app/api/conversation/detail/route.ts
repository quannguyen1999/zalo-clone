import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from 'uuid'; 

export async function GET(
    req: Request
) {
    try {

        let profileFriendId = "";

        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status:401})
        }

        const {searchParams} = new URL(req.url);

        const conversationId = searchParams.get("conversationId");

        if(!conversationId){
            return new NextResponse("Bad Request", {status:400})
        }

        const conversationInfo = await db.conversation.findMany({
            where: {
                roomId: conversationId
            }
        })

        conversationInfo.map(t=>{
            if(t.profileId != profile.id){
                profileFriendId = t.profileId;
            }
        })

        const profiles = await db.profile.findFirst({
            where: {
              id: profileFriendId
            }
        })
        
        return NextResponse.json({
            profiles
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}