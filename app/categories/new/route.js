import category from '../../../models/categories'
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import {options} from '../../api/auth/[...nextauth]/options'

export const POST = async (req, res) => {
    try {
      await connectToDB();
      const session = await getServerSession(options)
      const userId = session.user.id
      const { name, bagId, tripId } = await req.json();
      const Category = new category({ creator: userId, name, bagId, tripId });
      await Category.save();
      return new NextResponse(JSON.stringify(Category), { status: 200 });
    } catch (error) {
      return new NextResponse("Failed to post trips", { status: 500 });
    }
  };
  