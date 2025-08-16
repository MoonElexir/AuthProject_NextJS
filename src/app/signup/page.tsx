"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function signupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login"); // automitically pushes the useer to login page after they have signed up
    } catch (error: any) {
      console.log("Signup failed", error.messsge);
      //toast.error(error.messsge); //asingmnet config it and implement it ccopletely
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>SignUp</h1>

      

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter Your Username"
        className=" mb-2 border-2 border-gray-500 rounded-md px-2"
      />
      <label htmlFor="email">Email</label>

      <input
        type="email"
        id="email"
        value={user.email}
        placeholder="Enter Your Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className=" border-2 border-gray-500 rounded-md px-2 mb-2"
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        id="password"
        value={user.password}
        placeholder="Enter Your Password"
        className=" border-2 border-gray-500 rounded-md  mb-2 px-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="bg-amber-600 py-2 px-8 m-2   rounded-sm "
        onClick={onSignup}
      >
        {buttonDisabled ? "No SignUp" : "Signup"}
      </button>
      <label className="mt-4">Already Have A Profile? Login</label>
      <Link href="/login" className="bg-pink-600 py-2 px-8 m-2   rounded-sm ">
       
        Visit Login Page
      </Link>
    </div>
  );
}
