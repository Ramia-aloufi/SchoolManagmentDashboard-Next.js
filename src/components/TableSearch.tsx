"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { BiSearch } from "react-icons/bi";

const TableSearch = () => {
  const router = useRouter()

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const value = (e.currentTarget[0] as HTMLInputElement).value
    const params = new URLSearchParams(window.location.search)
    params.set("search",value)
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto flex   items-center text-xs gap-2 ring-[1.5px] ring-gray-300 px-2 rounded-full">
      <BiSearch />
      <input
        type="text"
        placeholder="Search"
        className="w-[200px]  p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;
