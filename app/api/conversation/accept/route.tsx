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

        const friendRequestId = searchParams.get("friendRequestId");

        if(!friendRequestId){
            return new NextResponse("Bad Request", {status:400})
        }

        const dataFriendRequest = await db.friendRequest.findFirst({
            where: {
                id: friendRequestId
            }
        })

        if(!dataFriendRequest){
            return new NextResponse("Bad Request", {status:400})
        }

        const uuid = uuidv4();

        await db.conversation.create({
            data: {
                roomId: uuid,
                profileId: dataFriendRequest.receiverId
            }
        })

        await db.conversation.create({
            data: {
                roomId: uuid,
                profileId: dataFriendRequest.senderId
            }
        })

        await db.friendRequest.update({
            where: {
                id: dataFriendRequest.id
            },
            data: {
                status: 'accepted'
            }
        })
        
        return NextResponse.json({
            status: 'success'
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}