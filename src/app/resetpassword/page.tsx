"use client";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";





export default function ResetPassword (){

    const router = useRouter();
    const [token, setToken] = useState('');
    const[user, serUser] = useState({
      password : '',
      confirmpassword : '',
      token : '',
    });
    const[mismatch, setmismatch] = useState(false);


useEffect(() => {
  const urlToken = window.location.search.split("=")[1];
  setToken(urlToken || "");
}, []);

const resetPass = async () => {

    if(user.password == user.confirmpassword){
        axios.post('/api/users/resetpassword', user );
        router.push('/login');

    }

    else{
        setmismatch(true);
    }

}

const setMismatch =  async ()=>{
setmismatch(false);
}

 
if(!mismatch) { return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <h1>SignUp</h1>

    <label htmlFor="password">Password</label>
    <input
      type="text"
      id="password"
      placeholder="Enter New Password"
      className=" mb-2 border-2 border-gray-500 rounded-md px-2"
      onChange={(e) => serUser({ ...user, password: e.target.value })}
    />

    <label htmlFor="confirm-password">Confirm Password</label>
    <input
      type="text"
      id="password"
      placeholder="Confirm New Password"
      className=" mb-2 border-2 border-gray-500 rounded-md px-2"
      onChange={(e) => serUser({ ...user, confirmpassword: e.target.value })}
    />

    <button
      className="bg-pink-600 py-2 px-8 m-2   rounded-sm"
      onClick={resetPass}
    >
      Submit
    </button>
  </div>
);
}
else if(mismatch){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Your Password and Confirm Password  Don't Match</h1>
        <button
          className="bg-pink-600 py-2 px-8 m-2   rounded-sm"
          onClick={setMismatch}
        >
          Try Again
        </button>
      </div>
    );
}


}
