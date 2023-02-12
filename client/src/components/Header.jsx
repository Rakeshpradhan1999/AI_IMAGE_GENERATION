import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Header = () => {
  return (
    <header className="p-4 bg-gray-100 flex justify-between">
      <Link to={"/"} className="grid place-content-center">
        <img src={logo} className="w-28 object-contain" alt="" />
      </Link>
      <div className="flex items-center ">
        <Link
          to="/create_post"
          className=" p-2 bg-primary text-white  text-sm rounded-md px-4"
        >
          Create Post
        </Link>
      </div>
    </header>
  );
};

export default Header;
