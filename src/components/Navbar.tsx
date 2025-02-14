import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { RiMessage3Line } from 'react-icons/ri'
import { TfiAnnouncement } from 'react-icons/tfi'

const Navbar = async() => {
      const user = await currentUser();
      const role = user?.publicMetadata.role as string;
  return (
    <div className="flex justify-between items-center p-4">
      {/* Search  */}
      <div className="hidden md:flex items-center text-xs gap-2 ring-[1.5px] ring-gray-300 px-2 rounded-full">
        <BiSearch/>
        <input type="text" placeholder="Search" className="w-[200px]  p-2 bg-transparent outline-none" />
        
      </div>
      {/* Icons and User */}
      <div className="flex items-center gap-4 justify-end w-full ">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
        <RiMessage3Line className='text-xl' />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
        <TfiAnnouncement className='text-xl' />
        <div className="absolute -top-3 -right-3 w-5 text-center h-5 bg-purple-500 rounded-full text-white text-xs">1</div>
        </div>
        <div className="flex flex-col">
          <span className='text-xs leading-3 font-medium'>John doe</span>
          <span className='text-[10px] text-gray-500 text-right'>{role}</span> 
        </div>
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-purple-500">
        {/* <CgProfile className='text-4xl' /> */}
        <UserButton />
        </div>
      </div> 
    </div>
  )
}

export default Navbar