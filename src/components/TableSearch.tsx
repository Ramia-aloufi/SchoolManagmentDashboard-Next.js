import React from "react";
import { BiSearch } from "react-icons/bi";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex   items-center text-xs gap-2 ring-[1.5px] ring-gray-300 px-2 rounded-full">
      <BiSearch />
      <input
        type="text"
        placeholder="Search"
        className="w-[200px]  p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
