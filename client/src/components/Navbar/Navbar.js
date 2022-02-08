import React from "react";
import { Link } from "react-router-dom";
import Controller from "./Controller";
import Searchbox from "./Searchbox";

export default function Navbar() {
  return (
    <div
      className="bg-transparent 
      md:bg-white md:p-4 drop-shadow-xl flex flex-col
       md:flex-row gap-3 md:align-baseline md:items-center mt-3 md:mt-0 p-5"
    >
      <div className="hidden md:flex md:basis-1/4">
        <Link to="/">
          <h1 className="text-blue-500 text-2xl uppercase font-bold">
            BRAND.com
          </h1>
        </Link>
      </div>
      <div className="md:basis-1/4">
        <Searchbox />
      </div>
      <div className="md:basis-2/4">
        <Controller />
      </div>
    </div>
  );
}
