import React from "react";
import { download } from "../assets";
import { saveFile } from "../utils";

const Card = ({ data }) => {
  return (
    <div className="rounded-md overflow-hidden relative group">
      <img src={data.image} alt="" className="w-full h-full" />
      <div className=" group-hover:bottom-3 absolute -bottom-full transition-all duration-300 bg-white p-3 w-[95%] left-1/2 -translate-x-1/2 rounded-md text-black">
        <p className=" text-xs mb-4">{data.prompt}</p>
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary text-xs grid place-content-center text-white">
              {data.name[0]}
            </div>
            <p className=" text-xs">{data.name}</p>
          </div>
          <button className="" onClick={() => saveFile(data.image, data._id)}>
            <img src={download} className="w-5" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
