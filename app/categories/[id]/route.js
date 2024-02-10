import category from "../../../models/categories";
import item from "../../../models/item";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../utils/database";

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
  
    const Category = await category.findOne({ _id: params.id});

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


export const revalidate = 0;