import bag from "../../../models/bag";
import categories from "../../../models/categories"
import items from "../../../models/item"
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options";


export const POST = async (req, res) => {

  try {

    await connectToDB();

    const session = await getServerSession(options)
    const userId = session.user.id

    const { id, name, tripId, goal, description } = await req.json();

    // Create a new bag
    const newBag = new bag({ creator: userId, name, tripId, goal, description });
    await newBag.save();

    if (id) {

      const existingCategories = await categories.find({ creator: userId, bagId: id });
      const existingItems = await items.find({ creator: userId, bagId: id });

      const categoryMapping = {};

      // Copy and associate categories with the new bag
      const createdCategories = await Promise.all(
        existingCategories.map(async (categoryData) => {
          const { _id, ...restCategoryData } = categoryData.toObject();
          const newCategory = new categories({
            ...restCategoryData,
            bagId: newBag._id,
            creator: userId
          });

          await newCategory.save();
          categoryMapping[_id] = newCategory._id;
          return newCategory;
        })
      );

      // Update the new bag with the copied categories
      newBag.categories = createdCategories.map(category => category._id);
      await newBag.save();

      // Copy and associate items with the new bag
      if (existingItems && existingItems.length > 0) {
        const createdItems = await Promise.all(
          existingItems.map(async (itemData) => {
            const { _id, categoryId, ...restItemData } = itemData.toObject();

            const newItem = new items({
              ...restItemData,
              bagId: newBag._id,
              categoryId: categoryMapping[categoryId],
              creator: userId
            });

            await newItem.save();
            return newItem;
          })
        );

        // Update the new bag with the copied items
        newBag.items = createdItems.map(item => item._id);
        await newBag.save();
      }
    }

    return new NextResponse(JSON.stringify({ bag: newBag }), { status: 200 });
  } catch (error) {
    console.error("Error creating new bag:", error);
    return new NextResponse("Failed to create a new bag", { status: 500 });
  }
};