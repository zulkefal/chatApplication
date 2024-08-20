import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/Slices/userSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {otherUsers }= useSelector(store=>store.user);
  const dispatch = useDispatch();
  const logoutNow = async () => {
    try {
      const logut = await fetch("http://localhost:8000/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await logut.json();
      if (data) {
        navigate("/login");
        toast.success("Logout Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    const conversations = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversations){
            dispatch(setSelectedUser([conversations]));
            console.log(conversations)

      // dispatch(setSelectedUser([conversations]));
    }
    else{
      toast.error("User not found");
    }
  }
  return (
    <div className="border-r border-slate-500 p-2 flex flex-col">
      <form onSubmit={searchSubmit} className="flex flex-row items-center m-1 gap-2" action="">
        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md text-white border-white"
          placeholder="search"
          type="text"
        />
        <button type='submit' className="btn bg-zinc-900 border-white" type="submit">
          <GrSearch className="w-6 h-6 outline-none " />
        </button>
      </form>

      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2 ">
        <button
          className="bg-gray-500 rounded-lg btn-sm text-white hover:bg-red-400 flex-1"
          onClick={logoutNow}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
