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

        console.log("1")
        console.log(listConversation)

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

        console.log("2")
        console.log(conversation)

        const profiles = await db.profile.findMany({
            where: {
                id: {
                    in: conversation.map(t=> t.profileId)
                }
            }
        })

        console.log("3")
        console.log(profiles)
        
        return NextResponse.json({
            profiles
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}