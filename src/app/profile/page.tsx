"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";


export default function ProfilePage() {

  const router = useRouter();
  const onLogout = async () => {
   try {

    await axios.get('/api/users/logout');
    console.log("Logout Succesfull");
    router.push('/login');
    
   } catch (error : any) {
    console.log("error Logout Failed ", error.messsge);
   }
  };

  
  const [data , setData] = React.useState('');

  const getUserDetails  = async () =>{
    const response : any = await axios.get('/api/users/me');
    console.log(response.data);
    setData(response.data.data._id);
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-400 " >
        {data === "" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <button
        className="bg-red-500 py-2 px-8 m-2 rounded-sm"
        onClick={onLogout}
      >
        Logout
      </button>

      <button
        className="bg-yellow-500 py-2 px-8 m-2 rounded-sm"
        onClick={getUserDetails}
      >
        getUserDetails
      </button>
    </div>
  );
}
