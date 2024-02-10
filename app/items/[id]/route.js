import item from "../../../models/item";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../utils/database";


export const PUT = async (req, { params }) => {
  try {
    await connectToDB();
   
    const Item = await item.findOne({ _id: params.id});

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


export const revalidate = 0;