import { NextResponse } from "next/server";

export  async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout succesful",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true }); //clearing out the token and setting it as empty string;
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
