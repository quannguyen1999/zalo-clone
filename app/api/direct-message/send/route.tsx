import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from 'uuid'; 
export async function POST(
    req: Request
) {
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status:401})
        }
        // roomId String
        // content String 
        // fileUrl String?
        // profileId String @db.ObjectId
        const {roomId, content} = await req.json();
        
        await db.directMessage.create({
            data: {
                roomId: roomId,
                content: content,
                fileUrl: "",
                profileId: profile.id
            }
        })

        return NextResponse.json({
            status: "success"
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}