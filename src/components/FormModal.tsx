"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { PiTrash } from "react-icons/pi";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";
import dynamic from "next/dynamic";

const StudentForm = dynamic (() => import("./forms/StudentForm"),{
loading:() => <h1>Loading... </h1>,
});

const TeacherForm = dynamic (() => import("./forms/TeacherForm"),{
  loading:() => <h1>Loading... </h1>,
  });

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-Yellow"
      : type === "update"
      ? "bg-Sky"
      : "bg-Purple";
  const icon =
    type === "create" ? (
      <IoIosAdd />
    ) : type === "update" ? (
      <FiEdit />
    ) : (
      <PiTrash />
    );
  const forms: {
    [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
  } = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
  };
  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <span className="font-medium text-gray-700 text-center ">
          All data will be lost. Are you sure you want to delete this{table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          delete
        </button>
      </form>
    ) : type ==="create" || type ==="update"? (
      forms[table](type,data)
    ):"Form not found"
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {icon}
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[4p%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer text-black "
              onClick={() => setOpen(false)}
            >
              <IoClose className="text-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
