import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'

const SignUp = () => {
  const[user,setUser]=useState({
    fullName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    gender:''
  })
  const navigate = useNavigate();
  
  const handleGender=(gender)=>{
    setUser({...user,gender})
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {

      const res = await fetch('http://localhost:8000/api/user/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
      })
      const response = await res.json();
      console.log(response)
      if(response){
        navigate('/login')
        toast.success(response.message)
      }
      
    } catch (error) {
      console.log(error)
      
    }
    setUser({
      fullName:'',
      userName:'',
      password:'',
      confirmPassword:'',
      gender:''
    })
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <form className="w-1/4" onSubmit={handleSubmit}>
      <div className="w-full p-4 rounded-lg shadow-md bg-gray-600 flex items-center justify-center flex-col gap-3 border">
        <div >
          <h1 className="text-white text-3xl mb-5">Signup</h1>
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-white" htmlFor="">
            Full Name
          </label>
          <input
            className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
            placeholder="Enter Full Name"
            value={user.fullName}
            onChange={(e)=>setUser({...user,fullName:e.target.value})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            User Name
          </label>
          <input
            className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
            placeholder="Enter User Name"
            value={user.userName}
            onChange={(e)=>setUser({...user,userName:e.target.value})}

          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Password
          </label>
          <input
            className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
            type="Password"
            placeholder="Enter Password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}

          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Enter Password Again
          </label>
          <input
            className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
            type="Password"
            placeholder="Enter Password Again"
            value={user.confirmPassword}
            onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}

          />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row gap-3">
            <p className="text-white">Male</p>
            <input
              type="checkbox"
              className="checkbox checkbox-warning"
              checked = {user.gender === "male"}
              onChange={()=>handleGender("male")}
            />
          </div>
          <div className="ml-2 flex flex-row gap-3">
            <p className="text-white">Female</p>
            <input
              type="checkbox"
              checked = {user.gender === 'female'}
              onChange={()=>handleGender('female')}
              className="checkbox checkbox-warning"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link className="text-red-400" to="/login">
            Already have an account?
          </Link>
        </div>
        <div className="flex item-center justify-center">
          <button type="submit" className="btn btn-block btn-sm mt-2 border text-white" >
            Signup
          </button>
        </div>
      </div>
      </form>
      
    </div>
  );
};

export default SignUp;
