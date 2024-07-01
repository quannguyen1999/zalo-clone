
import { NextApiResponseServerIo } from "@/type";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfilePage } from "@/lib/current-profile-page";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
  
    if(req.method !== 'GET'){
        return res.status(405).json({error: 'Method not allowrd'});
    }

    try{

        const profile = await currentProfilePage(req);
       
        if(!profile){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const response = {
            status: true
        }

        res?.socket?.server?.io?.emit(`profileId:`+profile.id, response);

        return res.status(200).json(response);

    }catch(error){
        console.log("[MESSAGE_ID]", error);
        return res.status(500).json({error: "Internal Error"});
    }
}