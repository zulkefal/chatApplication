import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { setAuthUser } from "../redux/Slices/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const navigate= useNavigate();

  const dispatch= useDispatch();


  const handleData = async (e) => {
    e.preventDefault();
  
    try {
      const loginUser = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!loginUser.ok) {
        const errorResponse = await loginUser.json();
        toast.error(errorResponse.message || "Login failed");
        return;
      }
  
      const response = await loginUser.json();
  
      if (response.message === "User logged in successfully") {
        navigate('/');
        toast.success(response.message);


        dispatch(setAuthUser(response))
      }
  
      setUser({
        userName: "",
        password: "", 
      });
  
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  
  
  return (
    <div>
      <div className="w-full flex items-center justify-center h-screen">
        <div className="w-1/4 p-4 rounded-lg shadow-md bg-gray-600 flex items-center justify-center flex-col gap-3 border">
          <form onSubmit={handleData}>
          <div>
            <h1 className="text-white text-3xl mb-5">Login</h1>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="">
              User Name
            </label>
            <input
              className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
              placeholder="Enter User Name"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Link className="text-red-400 break-word" to="/signup">
              Dont Have Account? <br />{" "}
              <span className="text-green-300">Click to Signup</span>
            </Link>
          </div>
          <div className="flex item-center justify-center">
            <button type="submit" className="btn btn-block btn-sm mt-2 border text-white">
              LogIn
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
