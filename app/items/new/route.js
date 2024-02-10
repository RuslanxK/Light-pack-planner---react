import item from '../../../models/item'
import { connectToDB } from '../../../utils/database'
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
      await connectToDB();

      const { tripId, bagId, categoryId, name, qty, description, weight, wgtOpt, priority, link, worn } = await req.json();
      const Item = new item({ tripId, bagId, categoryId, name, qty, description, weight, wgtOpt, priority, link, worn });
      await Item.save();
      return new NextResponse(JSON.stringify(Item), { status: 200 });
    } catch (error) {
      return new NextResponse("Failed to post items", { status: 500 });
    }
  };
  