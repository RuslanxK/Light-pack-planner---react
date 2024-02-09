import item from '../../models/item'
import { connectToDB } from "../../utils/database"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { options } from '../api/auth/[...nextauth]/options'
import { ObjectId } from 'mongodb'; 

export const GET = async (req, res) => {
     try {

           await connectToDB()

           const session = await getServerSession(options)
           const userId = session.user.id

           const items = await item.aggregate([
            {
              $match: {
                creator: new ObjectId(userId), 
                name: { $ne: "", $not: { $regex: /^new item/i } },
              },
            },
            {
              $group: {
                _id: "$name",
                firstItem: { $first: "$$ROOT" },
              },
            },
            {
              $replaceRoot: { newRoot: "$firstItem" },
            },
            {
              $limit: 50,
            },
            {
              $sort: { createdAt: -1 },
            },
          ]);


           return new NextResponse(JSON.stringify(items), {status: 200})
     }

     catch(error) {

        return new NextResponse("Failed to fetch item", {status: 500})
     }
}