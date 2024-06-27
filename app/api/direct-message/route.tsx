import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from 'uuid'; 
import { DirectMessage } from "@prisma/client";

const MESSAGE_BATCH = 10;
export async function GET(
    req: Request
) {
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status:401})
        }

        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get("cursor");

        let messages: DirectMessage[] = [];
        if(cursor){
            messages = await db.directMessage.findMany({
                take: MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }else{
            messages = await db.directMessage.findMany({
                take: MESSAGE_BATCH,
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null;

        if(messages.length === MESSAGE_BATCH) {
            nextCursor = messages[MESSAGE_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}