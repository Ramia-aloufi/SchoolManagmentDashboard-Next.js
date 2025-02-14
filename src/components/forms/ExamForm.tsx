"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputFeild";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { startTransition, useActionState, useEffect } from "react";
import { CreateExam, UpdateExam } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SelectField from "../SelectField";

const ExamForm = ({
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
    type === "create" ? CreateExam : UpdateExam,
    { success: false, error: false }
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });
  const onSubmit = (data: ExamSchema) => {
    console.log(data);
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.success) {
      toast(`Exam ${type === "create" ? "Created" : "updated"} Successfully`);
      router.refresh();
      setOpen(false);
    }
    if (state.error) {
      toast("Error creating Subject");
    }
  }, [router, setOpen, state, type]);

  const lessons = relatedData.lessons.map(
    (subject: { id: string; name: string }) => ({
      id: subject.id,
      value: subject.name,
    })
  );
  return (
    <form
      className="flex flex-col gap-8 text-[#333]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold  ">
        {type === "create" ? "Create a new exam" : "Update the exam"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Exam Title"}
          register={register}
          error={errors.title}
          name={"title"}
          defaultValue={data?.title}
        />
        <InputField
          label={"Start Date"}
          register={register}
          error={errors.startTime}
          name={"startTime"}
          type="datetime-local"
          defaultValue={data?.startTime}
        />
        <InputField
          label={"End Date"}
          register={register}
          error={errors.endTime}
          name={"endTime"}
          type="datetime-local"
          defaultValue={data?.endTime}
        />
        <SelectField
          label={"Lesson"}
          options={lessons}
          register={register}
          error={errors.lessonId}
          name={"lessonId"}
        />
        {data && (
          <InputField
            label={"id"}
            register={register}
            error={errors.id}
            name={"id"}
            defaultValue={data?.name}
            hidden
          />
        )}
      </div>
      <button className="bg-blue-300 p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamForm;
