"use client";
import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { PiTrash } from "react-icons/pi";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DeleteClass, DeleteExam, DeleteStudent, DeleteSubject, DeleteTeacher } from "@/lib/actions";
import { FormContainerParams } from "./FormContainer";

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading... </h1>,
});

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading... </h1>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading... </h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading... </h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading... </h1>,
});

const deleteActionMap = {
  subject: DeleteSubject,
  class: DeleteClass,
  teacher: DeleteTeacher,
  student: DeleteStudent,
  parent: DeleteSubject,
  lesson: DeleteSubject,
  exam: DeleteExam,
  assignment: DeleteSubject,
  result: DeleteSubject,
  attendance: DeleteSubject,
  event: DeleteSubject, 
  announcement: DeleteSubject,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerParams & { relatedData?: any }) => {
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
    [key: string]: (
      type: "create" | "update",
      setOpen: Dispatch<SetStateAction<boolean>>,
      data?: any,
      relatedData?: any
    ) => JSX.Element;
  } = {
    subject: (type, data, setOpen, relatedData) => (
      <SubjectForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    teacher: (type, data, setOpen, relatedData) => (
      <TeacherForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    student: (type, data, setOpen, relatedData) => (
      <StudentForm
        type={type} 
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    class: (type, data, setOpen, relatedData) => (
      <ClassForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    exam: (type, data, setOpen, relatedData) => (
      <ExamForm 
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
  };
  const [open, setOpen] = useState(false);

  const [state, formAction] = useActionState(deleteActionMap[table], {
    success: false,
    error: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`${table} deleted Successfully`);
      router.refresh();
      setOpen(false);
    }
    if (state.error) {
      toast("Error creating Subject");
    }
  }, [router, state, table]);

  const Form = () => {
    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" hidden  defaultValue={id}/>
        <span className="font-medium text-gray-700 text-center ">
          All data will be lost. Are you sure you want to delete this{table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data, setOpen, relatedData)
    ) : (
      "Form not found"
    );
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
