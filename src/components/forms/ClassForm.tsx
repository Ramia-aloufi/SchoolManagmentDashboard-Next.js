"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputFeild";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { CreateClass, UpdateClass } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SelectField from "../SelectField";

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const [state, formAction] = useActionState(
    type === "create" ? CreateClass : UpdateClass,
    { success: false, error: false }
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });
  const onSubmit = (data: ClassSchema) => {
    console.log(data);
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.success) {
      toast(
        `Subject ${type === "create" ? "Created" : "updated"} Successfully`
      );
      router.refresh();
      setOpen(false);
    }
    if (state.error) {
      toast("Error creating Subject");
    }
  }, [router, setOpen, state, type]);

  const teachers = relatedData.teachers.map(
    (teacher: { id: string; name: string; surname: string }) => ({
      id: teacher.id,
      value: teacher.name + " " + teacher.surname,
    })
  );
  const grades = relatedData.grades.map(
    (grade: { id: number; level: string }) => ({
      id: grade.id,
      value: grade.level,
    })
  );
  console.log(data);

  return (
    <form
      className="flex flex-col gap-8 text-[#333]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold  ">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Class name"}
          register={register}
          error={errors.name}
          name={"name"}
          defaultValue={data?.name}
        />
        <InputField
          label={"Capacity"}
          register={register}
          error={errors.capacity}
          name={"capacity"}
          defaultValue={data?.capacity}
        />
        {data && (
          <InputField
            label={"id"}
            register={register}
            error={errors.id}
            name={"id"}
            defaultValue={data?.id}
            hidden
          />
        )}

        <SelectField
          label={"Supervisor"}
          options={teachers}
          register={register}
          error={errors.supervisorId}
          defaultValue={data?.supervisorId} 
          name={"supervisorId"}
        />
        <SelectField
          label={"Grades"}
          options={grades}
          register={register}
          error={errors.gradeId}
          defaultValue={data?.gradeId}
          name={"gradeId"}
        />
      </div>
      <button className="bg-blue-300 p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
