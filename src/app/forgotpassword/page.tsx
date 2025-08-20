"use client";
import React from 'react';
import axios from 'axios';

export default function(){

    const [user, setUser] = React.useState({
      email : '',
    });
    const [display, setdisplay] = React.useState(false);
    const forgotpassword = async ()=>{

        try {

          const response =  await axios.post('/api/users/forgotpassword', user);
          console.log(response.data);
          setdisplay(true);
            
        } catch (error : any) {
            console.log("Error :", error.message );
        }

    }
    

    if(!display) {return (
   
   
    
  <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <label htmlFor="email">Enter Your Email</label>
    <input
      type="email"
      placeholder="Enter Your Email"
      value={user.email}
      className="border-2 border-gray-500 rounded-md  mb-2 px-2"
     onChange={(e)=> setUser({...user, email : e.target.value})} 
    />
    <button className="bg-pink-600 py-2 px-8 m-2   rounded-sm" onClick={forgotpassword} >Submit</button>
  </div>
);
    }

    else if(display){
        return (
          <h1 className="flex flex-col items-center justify-center min-h-screen py-2">
            {`An email Has been sent to your ${user.email} to reset your password`}
          </h1>
        );
    }


}