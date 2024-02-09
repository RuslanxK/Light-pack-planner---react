import bag from '../../models/bag'
import { connectToDB } from "../../utils/database"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { options } from '../api/auth/[...nextauth]/options'


export const GET = async (req, res) => {

     try {

           await connectToDB()

           const session = await getServerSession(options)
           const userId = session.user.id
           const bags = await bag.find({creator: userId})
           return new NextResponse(JSON.stringify(bags), {status: 200})
     }

     catch(error) {

        return new NextResponse("Failed to fetch bags", {status: 500})
     }
}