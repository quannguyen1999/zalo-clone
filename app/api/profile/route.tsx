import { NextResponse } from "next/server";
import {db} from '@/lib/db';
import { initialProfile } from "@/lib/initial-profile";
import { currentUser } from "@clerk/nextjs/server";
export async function GET(
    req: Request
) {
    try{
        const user = await currentUser();

        if(!user){
            return NextResponse.json({
                items: []
            })
    
        }

        const {searchParams} = new URL(req.url);

        const emailProfile = searchParams.get("emailProfile");
        
        const profiles = await db.profile.findMany({
            where: {
              AND: [
                {
                    email:{
                        contains: emailProfile!,
                        mode: "insensitive",
                    } 
                },
                {
                    email: {
                        not: user.emailAddresses[0].emailAddress,
                    }
                }
              ]
              
            }
        })

        return NextResponse.json({
            items: profiles
        })

    }catch(error){
        console.log("[PROFILE_ERROR]", error);
        return new NextResponse("internal server error", {status: 500});
    }
}