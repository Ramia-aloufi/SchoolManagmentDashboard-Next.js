import React from "react";
import Image from "next/image";
import {
  MdDateRange,
  MdOutlineBloodtype,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { IoGitBranchOutline, IoPhonePortraitSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import BigCalender from "@/components/BigCalender";
import Link from "next/link";
import Announcement from "@/components/Announcement";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";

const SingleTeacherPage = () => {
  return (
    <div className="flex flex-1 p-4 gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-ful xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-Sky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className="">
              <h1 className="text-xl font-semibold">John Doe</h1>
              <FormModal table="teacher" type="update"
data={{
id: 1, 
username: "deanguerrero", 
email: "deanguerrero@gmail.com", 
password: "password", 
firstName: "Dean", 
lastName: "Guerrero", 
phone: "+1 234 567 89", 
address: "1234 Main St, Anytown, USA",
 bloodType: "A+" ,
 dateOfBirth: "2000-01-01", sex:"male",
img:""}}/>
</div>
              <p className="text-xs text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium ">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdOutlineBloodtype className="text-lg" />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <MdDateRange className="text-lg" />
                  <span>Jan 2025</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <HiOutlineMail className="text-lg" />
                  <span>john@doe.com</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2 ">
                  <IoPhonePortraitSharp className="text-lg" />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <SlCalender className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <p className="text-sm text-gray-400">attendance</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <IoGitBranchOutline className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">2</h1>
                <p className="text-sm text-gray-400">branches</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <SiGoogleclassroom className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">4</h1>
                <p className="text-sm text-gray-400">classes</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <MdOutlinePlayLesson className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <p className="text-sm text-gray-400">lessons</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-lg font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalender />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Shortcuts</h1>
        <div className="mt-4 flex gap-4 flex-wrap text-xs •text-gray-500">
          <Link className="p-3 rounded-md bg-SkyLight" href="/">
            Teacher&apos;s Classes
          </Link>
          <Link className="p-3 rounded-md bg-PurpleLight" href="/">
            Teacher&apos;s Students
          </Link>
          <Link className="p-3 rounded-md bg-YellowLight" href="/">
            Teacher&apos;s Lessons
          </Link>
          <Link className="p-3 rounded-md bg-pink-50" href="/">
            Teacher&apos;s Exams
          </Link>
          <Link className="p-3 rounded-md bg-SkyLight" href="/">
            Teacher&apos;s Assignments
          </Link>
        </div>
        </div>
        <Performance/>
        <Announcement />
      </div>
      
      </div>
  );
};

export default SingleTeacherPage;
