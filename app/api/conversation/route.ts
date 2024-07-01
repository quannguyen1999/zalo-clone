import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from 'uuid'; 
interface ProfileProps {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    status: string;
    friendRequestId: string;
    conversationId: string;
    latestMessage: string;
}
export async function GET(
    req: Request
) {
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status:401})
        }

        const listResult: ProfileProps[] = [];

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

        for(let profile of profiles){
            const mapToProfile: ProfileProps = {
                id: profile.id,
                userId: profile.id,
                name: profile.name,
                imageUrl: profile.imageUrl,
                email: profile.email,
                status: '',
                friendRequestId: '',
                conversationId: conversation.filter(t => t.profileId == profile.id)[0].roomId,
                latestMessage: ''
            } 

            const latestMessage = await db.directMessage.findFirst({
                where: {
                    roomId:  mapToProfile.conversationId,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            // console.log(latestMessage)

            mapToProfile.latestMessage = latestMessage?.content || '';

            listResult.push(mapToProfile);
        }
        
        return NextResponse.json({
            items: listResult
        })

    }catch(error) {
        console.log("CHANNELS_POS", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}