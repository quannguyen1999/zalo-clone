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

        const listConversation = await db.conversation.findMany({
            where: {
                profileId: profile.id
            }
        })

        const conversation = await db.conversation.findMany({
            where: {
                AND: [
                    {
                        roomId:{
                            in: listConversation.map(t=>t.roomId)
                        } 
                    },
                    {
                        profileId: {
                            not: profile.id
                        }
                    }
                ]
            }
        })

        const profiles = await db.profile.findMany({
            where: {
                id: {
                    in: conversation.map(t=> t.profileId)
                }
            }
        })
        
        return NextResponse.json({
            items: profiles
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}