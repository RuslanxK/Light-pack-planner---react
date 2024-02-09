import category from "../../../models/categories";
import item from "../../../models/item";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../utils/database";
import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options";

export const DELETE = async (req, {params}) => {
  try {

    await connectToDB();

    await category.findByIdAndDelete(params.id);
    await item.deleteMany({ categoryId: params.id });
    return new NextResponse("Category is Deleted Successfully", {
      status: 200,
    });
  } catch (error) {
    console.error(error)
    return new NextResponse("Failed to delete category", { status: 500 });
    
  }
};


export const PUT = async (req, { params }) => {
  try {
    await connectToDB();
    const session = await getServerSession(options)
    const userId = session.user.id
    const Category = await category.findOne({ _id: params.id, creator: userId });

    if (!Category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    const { name } = await req.json();
    Object.assign(Category, { name });

    await Category.save();
    return new NextResponse('Category is Updated Successfully', { status: 200 });
  } catch (err) {
    return new NextResponse('Failed to update category', { status: 500 });
  }
};