import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect(); // Function that connects to the database;

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check is user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //ceate a new user;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log( savedUser);

    return NextResponse.json(
      {
        message: "User Created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
