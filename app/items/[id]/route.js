import item from "../../../models/item";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../utils/database";
import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options";



export const PUT = async (req, { params }) => {
  try {
    await connectToDB();
    const session = await getServerSession(options)
    const userId = session.user.id
    const Item = await item.findOne({ _id: params.id, creator: userId});

    if (!Item) {
      return new NextResponse('Item not found', { status: 404 });
    }

    const { tripId, bagId, categoryId, name, priority, description, qty, weight, wgtOpt, link, worn } = await req.json();

    Object.assign(Item, { tripId, bagId, categoryId, name, priority, description, qty, weight, wgtOpt, link, worn });

    await Item.save();
    return new NextResponse('Bag is Updated Successfully', { status: 200 });
  } catch (err) {
    return new NextResponse('Failed to update bag', { status: 500 });
  }
};




export const DELETE = async (req, {params}) => {

    try {

    await connectToDB();
    await item.findByIdAndDelete(params.id);
    return new NextResponse("Item is Deleted Successfully", {
      status: 200,
    });
  } catch (error) {
    console.error(error)
    return new NextResponse("Failed to delete category", { status: 500 });
    
  }
};
