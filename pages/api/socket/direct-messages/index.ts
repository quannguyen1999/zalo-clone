import { NextApiResponseServerIo } from "@/type";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfilePage } from "@/lib/current-profile-page";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'method not allowrd'})
    }

    try{
        const profile = await currentProfilePage(req);
        const {content, roomId} = req.body;
        const {conversationId} = req.query;

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!conversationId){
            return new NextResponse("conversation id is missing" , {status : 400})
        }

        if(!content){
            return new NextResponse("content id is missing" , {status : 400})
       
        }

        await db.directMessage.create({
            data: {
                roomId: roomId,
                content: content,
                fileUrl: "",
                profileId: profile.id
            }
        })

        const conversationKey = `conversation:${conversationId}:messages`;

        res?.socket?.server?.io?.emit(conversationKey, content);

        // return res.status(200).json(content);

    } catch (error){
        console.log("[DIRECT_MESSAGES_POST]", error);
        return res.status(500).json({message: "Internal server errror"});
    }
}