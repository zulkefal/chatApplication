import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from "../redux/Slices/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleData = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.userName || !user.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Login failed");
        return;
      }

      const data = await response.json();

      if (data.message === "User logged in successfully") {
        navigate('/');
        toast.success(data.message);
        localStorage.setItem('authUser', JSON.stringify(data));
        dispatch(setAuthUser(data));
      } else {
        toast.error("Login failed. Please try again.");
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
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-1/4 p-4 rounded-lg shadow-md bg-gray-600 flex items-center justify-center flex-col gap-3 border">
        <form onSubmit={handleData}>
          <div>
            <h1 className="text-white text-3xl mb-5">Login</h1>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="userName">
              User Name
            </label>
            <input
              id="userName"
              className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
              placeholder="Enter User Name"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="w-full p-1 bg-white text-black placeholder-gray-400 rounded-lg"
              type="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link className="text-red-400 break-word" to="/signup">
              Don't Have an Account? <br />
              <span className="text-green-300">Click to Signup</span>
            </Link>
          </div>
          <div className="flex item-center justify-center">
            <button type="submit" className="btn btn-block btn-sm mt-2 border text-white">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
