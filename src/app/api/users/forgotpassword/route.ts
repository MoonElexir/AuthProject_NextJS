import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();

    const { email } = reqbody;

    if (!email) {
      return NextResponse.json(
        {
          message: "No Email Found",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "No User found with this email",
        },
        { status: 400 }
      );
    }

    // forgotPasswordToken: String,
    // forgotPasswordTokenExpiry: Date,

    //send an email to user;

    const mailresponse = await sendEmail({
      email,
      emailType: "RESETPASSWORD",
      userId: user._id,
    });

    if (!mailresponse) {
      return NextResponse.json(
        {
          message: "Could'nt send an eamil",
        },
        { status: 500 }
      );
    }

    console.log("Password reset Email Sent Succesfully");

    return NextResponse.json(
      {
        message: "Email sent succesfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: "Error Occured Sending MAil",
    });
  }
}
