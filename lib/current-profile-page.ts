import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./db";
export const currentProfilePage = async (req: NextApiRequest) => {
    const {userId} = getAuth(req);

    if(!userId){
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })

    return profile;
}