import React, { Suspense } from "react";
import Image from "next/image";
import {
  MdDateRange,
  MdOutlineBloodtype,
} from "react-icons/md";
import { IoGitBranchOutline, IoPhonePortraitSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import Link from "next/link";
import Announcement from "@/components/Announcement";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { Class, Student } from "@prisma/client";
import { notFound } from "next/navigation";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";
import FormContainer from "@/components/FormContainer";

const SingleStudentPage = 
async({params:{id}}:{params:{id:string}}) => {
        const { sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role; 
  const student:Student & {class:Class & {_count:{lessons:number}}} | null = await prisma.student.findUnique({
    where:{
      id
    },
    include:{
      class:{
        include:{
          _count:{
          select:{
            lessons:true

          }
        }
        }
      }
    }
  })
  if(!student) return notFound()
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
                src={student.img || "/profile.avif"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{student.name + " " + student.surname}</h1>
              {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
                </div>
              <p className="text-xs text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium ">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdOutlineBloodtype className="text-lg" />
                  <span>{student.bloodType }</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <MdDateRange className="text-lg" /> 
                  <span>{new Intl.DateTimeFormat("en-GB").format(student.birthday)}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <HiOutlineMail className="text-lg" />
                  <span>{student.email || "_"}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2 ">
                  <IoPhonePortraitSharp className="text-lg" />
                  <span>{student.phone || "_"}</span>
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
                <h1 className="text-xl font-semibold">{student.class.name.charAt(0)}th</h1>
                <p className="text-sm text-gray-400">grade</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <IoGitBranchOutline className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class._count.lessons }</h1>
                <p className="text-sm text-gray-400">branches</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <SiGoogleclassroom className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <p className="text-sm text-gray-400">class</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48% ]">
              <SlCalender className="w-6 h-6 text-Purple" />
              <Suspense  fallback={"...loading"}>

              <StudentAttendanceCard id={student.id}/>
              </Suspense>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-lg font-semibold">Student&apos;s Schedule</h1>
          <BigCalendarContainer type={"classId"} id={student.classId} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Shortcuts</h1>
        <div className="mt-4 flex gap-4 flex-wrap text-xs •text-gray-500">
          <Link className="p-3 rounded-md bg-SkyLight" href={`/list/results?studentId=${"student2"}`}>
            Student&apos;s Result
          </Link>
          <Link className="p-3 rounded-md bg-PurpleLight" href={`/list/teachers?classId=${2}`}>
            Student&apos;s Teacher
          </Link>
          <Link className="p-3 rounded-md bg-YellowLight" href={`/list/lessons?classId=${2}`}>
            Student&apos;s Lessons
          </Link>
          <Link className="p-3 rounded-md bg-pink-50"  href={`/list/exams?classId=${2}`}>
            Student&apos;s Exams
          </Link>
          <Link className="p-3 rounded-md bg-SkyLight"  href={`/list/assignments?classId=${2}`}>
            Student&apos;s Assignments
          </Link>
        </div>
        </div>
        <Performance/>
        <Announcement />
      </div>
      
      </div>
  );
};

export default SingleStudentPage;
