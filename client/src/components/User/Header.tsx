import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {

  let navigate = useNavigate()
  return (
    <div>
      <div className="relative h-72 bg-teal-700">
        <div className="relative h-full w-full">
          <img
            src="sasha-kaunas-G6eXUCi8JgA-unsplash.jpg"
            alt="Header Image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className=" w-8/12 h-16 pb-5 mt-3.5 absolute inset-y-0 right-0 mr-60 mt- flex items-center justify-center">
          <div className="mt-5 ml-14">
            <button className="text-white font-bold text-4xl">
              <h1>StayHub.Com</h1>
            </button>
          </div>

          <div className="mr-7 ml-auto mt-5 ">
            <button className="text-white font-semibold text-sm">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="mr-7 mt-5">
            <button className="text-white font-semibold text-sm">
              List your property
            </button>
          </div>
          <div className="mt-4 mr-20">
            <button  onClick={()=>{navigate("/login")}} className="bg-white px-2 py-1 text-teal-700 font-semibold rounded-lg text-sm">
              Login
            </button>
          </div>
        </div>
        <div className=" w-8/12 h-32 mt-24 pt-3.5 absolute inset-y-0 right-0 mr-60 mt-0 flex ">
          <div className="ml-7 mt-4">
            <h1 className="text-white font-medium text-4xl ">
              Discover Your Next Getaway
            </h1>
            <h3 className="text-white font-normal text-2xl  mt-3.5 ">
            Explore Exclusive Offers on Hotels, Vacation Homes, and More...
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
