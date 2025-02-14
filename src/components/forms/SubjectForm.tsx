"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputFeild";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { startTransition, useActionState, useEffect } from "react";
import { CreateSubject, UpdateSubject } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SelectField from "../SelectField";

const SubjectForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const [state, formAction] = useActionState(
    type === "create" ? CreateSubject : UpdateSubject,
    { success: false, error: false }
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });
  const onSubmit = (data:SubjectSchema) => {
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
  return (
    <form className="flex flex-col gap-8 text-[#333]" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold  ">
        {type === "create" ? "Create a new Subject" : "Update the subject"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Subject name"}
          register={register}
          error={errors.name}
          name={"name"}
          defaultValue={data?.name}
        />
        {data && (
          <InputField
            label={"id"}
            register={register}
            error={errors.name}
            name={"id"}
            defaultValue={data?.name}
            hidden
          />
        )}

        <SelectField
          label={"Teacher"}
          options={teachers}
          register={register}
          name={"teachers"}
          inputProps={{ multiple: true }}
        />
      </div>
      <button className="bg-blue-300 p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
