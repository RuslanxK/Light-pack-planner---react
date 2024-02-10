import category from '../../../models/categories'
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
      await connectToDB();
      
      const { name, bagId, tripId } = await req.json();
      const Category = new category({ name, bagId, tripId });
      await Category.save();
      return new NextResponse(JSON.stringify(Category), { status: 200 });
    } catch (error) {
      return new NextResponse("Failed to post trips", { status: 500 });
    }
  };
  