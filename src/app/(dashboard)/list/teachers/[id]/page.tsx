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
import Link from "next/link";
import Announcement from "@/components/Announcement";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { Teacher } from "@prisma/client";
import { notFound } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const SingleTeacherPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
        const { sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role; 
  const teacher:
    | (Teacher & {
        _count: { lessons: number; subjects: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
  if (!teacher) return notFound();

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-ful xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-Sky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/profile.avif"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium ">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <MdOutlineBloodtype className="text-lg" />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <MdDateRange className="text-lg" />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <HiOutlineMail className="text-lg" />
                  <span>{teacher.email || "_"}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2 ">
                  <IoPhonePortraitSharp className="text-lg" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48%]">
              <SlCalender className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <p className="text-sm text-gray-400">attendance</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48%]">
              <IoGitBranchOutline className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <p className="text-sm text-gray-400">branches</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48%]">
              <SiGoogleclassroom className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <p className="text-sm text-gray-400">classes</p>
              </div>
            </div>
            <div className="bg-white rounded-md gap-4 w-full flex md:w-[48%] p-4 xl:w-[45%] 2xl:w-[48%]">
              <MdOutlinePlayLesson className="w-6 h-6 text-Purple" />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
                <p className="text-sm text-gray-400">lessons</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-lg font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type={"teacherId"} id={teacher.id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs •text-gray-500">
            <Link
              className="p-3 rounded-md bg-SkyLight"
              href={`/list/classes?supervisorId=${"teacher12"}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-PurpleLight"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-3 rounded-md bg-YellowLight"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-SkyLight"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
