import article from "../../../models/articleModel";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
      await connectToDB();

      const { title, description } = await req.json();
      const Article = new article({ title, description});
      await Article.save();
      return new NextResponse(JSON.stringify(Article), { status: 200 });
    } catch (error) {
      
      console.error('Error:', error);
      return new NextResponse("Failed to post article", { status: 500 });
    }
  };




  export const GET = async (req) => {

    try {
 
      await connectToDB();
    
      const Articles = await article.find()

      return new NextResponse(JSON.stringify(Articles), { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new NextResponse("Failed to fetch articles", { status: 500 });
    }
  };
 
  
  

  export const revalidate = 0;