import bag from "../../../models/bag";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import category from "../../../models/categories";
import item from '../../../models/item'
const { calculateTotalWeight } = require("../../../BL/totalBagKg")
const { calculateCategoryTotalWeight } = require("../../../BL/totalCategoryKg")
const { calculateWornItemsTotalWeight } = require("../../../BL/totalWorn")
import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options";


export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const session = await getServerSession(options)
    const userId = session.user.id

    const foundBag = await bag.findOne({_id: params.id, creator: userId});

    const totalWorn = await calculateWornItemsTotalWeight(params.id, userId)
    const totalWeightCategory = await calculateCategoryTotalWeight(params.id, userId)
    const totalWeightResult = await calculateTotalWeight(params.id, userId)
    const categoriesOfTheBag = await category.find({ bagId: params.id, creator: userId });
    const itemsOfTheBag = await item.find({bagId: params.id, creator: userId})

    if (!foundBag) {
      return new NextResponse("Bag not found", { status: 404 });
    }

    const bagWithCategoriesAndItems = {
      bag: foundBag,
      categories: categoriesOfTheBag,
      items: itemsOfTheBag,
      totalBagWeight: totalWeightResult.totalWeight,
      totalWeightCategory: totalWeightCategory,
      worn: totalWorn.totalWeight
    };

    return new NextResponse(JSON.stringify(bagWithCategoriesAndItems), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to fetch bag", { status: 500 });
  }
};



export const PUT = async (req, { params }) => {
  try {
    await connectToDB();

    const session = await getServerSession(options)
    const userId = session.user.id

    const Bag = await bag.findOne({ _id: params.id, creator: userId });

    if (!Bag) {
      return new NextResponse('Bag not found', { status: 404 });
    }

    const { tripId, name, goal, description } = await req.json();

    Object.assign(Bag, { tripId, name, goal, description });

    await Bag.save();
    return new NextResponse('Bag is Updated Successfully', { status: 200 });
  } catch (err) {
    return new NextResponse('Failed to update bag', { status: 500 });
  }
};




export const DELETE = async (req, {params}) => {

  try { 
    await connectToDB();
    await bag.findByIdAndDelete(params.id)
    await category.deleteMany({bagId: params.id})
    await item.deleteMany({bagId: params.id})
    return new NextResponse('Bag is Deleted Successfully', { status: 200 });
  }
  catch (error) {
    return new NextResponse('Failed to delete bag', { status: 500 });
  }
}

