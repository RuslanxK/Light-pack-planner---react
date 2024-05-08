import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  try {
    const { email, id } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });


    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to Light Pack Planner",
      html: `

      <div style="text-align: center; height: 500px;">
      <h2 style="font-weight: 500; color: black";>Verify your email address</h2>
      <hr class="solid" style="width: 50%; border: 1px solid #ededed;">
      <p style="color: gray; font-size: 15px;">In order to use your Light Pack Planner account, you need to confirm your email address.</p>
      <a href="http://localhost:3000/${id}"><button style="padding: 15px; margin-bottom: 15px; border: none; color: white; width: 300px; background-color: #08CA28";>Verify your email address</button></a>
      <hr class="solid" style="margin-bottom: 15px; width: 75px; border: 1px solid #ededed;">
      <span style="color: gray; font-size: 12px;">if you did not sign up for this account you can ignore this email and the account will be deleted.</span>
    </div>
    
     `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
};

export const revalidate = 0;
