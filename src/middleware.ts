import { NextResponse, NextRequest } from "next/server";

// this is a logic part;
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // this contaains the path at with the request was made

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    //This means the user is already loggen in aand should not access login and signup pages;
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // this mens the user is not loggen in. He should not have accesss to profile page;
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/profile/:id*",
    "/verifyemail",
  ], //one what route do we want to run our middleware we can give an array an d it will run on those parths;
};
