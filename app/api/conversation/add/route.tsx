import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from 'uuid'; 
export async function GET(
    req: Request
) {
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status:401})
        }

        const {searchParams} = new URL(req.url);

        const profileIdRequest = searchParams.get("profileIdRequest");

        if(!profileIdRequest){
            return new NextResponse("Bad Request", {status:400})
        }

        const newFriendRequest = await db.friendRequest.create({
            data: {
                senderId: profile.id,
                receiverId: profileIdRequest,
                status: 'pending',
            }
        })

      

        return NextResponse.json({
            newFriendRequest
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}