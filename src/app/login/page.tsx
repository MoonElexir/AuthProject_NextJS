"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function LoginPage() {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
    useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    });

  
  const onLogin = async () => {

try {

  const response = await axios.post('/api/users/login', user);
  console.log("Login Success" , response.data);
  router.push('/profile');
} catch (error : any) {
  console.log("Login failed", error.message);
}

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">Email</label>

      <input
        type="text"
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
        className="bg-pink-600 py-2 px-8 m-2   rounded-sm "
        onClick={onLogin}
        
      >
       {buttonDisabled ?  "No Login" : "Login"}
      </button>

      <label className="mt-4">New? Make a Profile and SignUp</label>
      <Link
        href={"/signup"}
        className="bg-amber-600 py-2 px-8 m-2   rounded-sm "
      >
        
        Visit Signup Page
      </Link>
    </div>
  );
}
