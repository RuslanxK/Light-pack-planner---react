import user from "../../../models/user";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async (req) => {

    try {
      await connectToDB();

      const { username, email, password, repeatedPassword } = await req.json();

      const exists = await user.findOne({email})

      if(exists) {

          return new NextResponse("Email Already exists", { status: 500 });
      }

      if(password !== repeatedPassword) {

        return new NextResponse("Passwords do not match", { status: 500 });
      }

      const hashedPassword = await bcrypt.hash(password, 10 )

      const User = new user({ username, email, password: hashedPassword });
      await User.save();
      return new NextResponse(JSON.stringify(User), { status: 200 });
    } catch (error) {
      
      return new NextResponse("Failed to create user", { status: 500 });
    }
  };
  

  export const revalidate = 0;