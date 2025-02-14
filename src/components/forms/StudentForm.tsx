"use client";
import { CldUploadWidget } from "next-cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import InputField from "../InputFeild";
import SelectField from "../SelectField";
import {
  studentSchema,
  StudentSchema,
} from "@/lib/formValidationSchemas";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateStudent,
  UpdateStudent,
} from "@/lib/actions";
import { toast } from "react-toastify";
import { LuCloudUpload } from "react-icons/lu";

const StudentForm = ({
  type,
  data,
  relatedData,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? CreateStudent : UpdateStudent,
    { success: false, error: false }
  );

  const router = useRouter();

  const onSubmit = (data: StudentSchema) => {
    console.log(data);
    startTransition(() => {
      formAction({ ...data, img: image?.secure_url });
    });
  };

  useEffect(() => {
    if (state.success) {
      toast(
        `Student ${type === "create" ? "Created" : "updated"} Successfully`
      );
      router.refresh();
      setOpen(false);
    }
    if (state.error) {
      toast("Error creating Subject");
    }
  }, [router, setOpen, state, type]);

  const grade = relatedData.grade.map(
    (data: { id: number; level: number }) => ({
      id: data.id,
      value: data.level,
    })
  );
  const StudentClass = relatedData.class.map(
    (data: { id: number; name: string,capacity: number;
      _count: { students: number } }) => ({
      id: data.id,
      value: data.name + " " + "-" + " " + data._count.students + "/" + data.capacity + " " +"Capacity",
    })
  );
  const gender = [
    {
      id: "MALE",
      value: "MALE",
    },
    {
      id: "FEMALE",
      value: "FEMALE",
    },
  ];
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {" "}
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>
      <span className="text-xs font-medium text-gray-400">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Username"}
          register={register}
          error={errors.username}
          name={"username"}
          defaultValue={data?.username}
        />
        <InputField
          label={"Email"}
          register={register}
          type="email"
          error={errors.email}
          name={"email"}
          defaultValue={data?.email}
        />
        <InputField
          label={"Password"}
          register={register}
          type="password"
          error={errors.password}
          name={"password"}
          defaultValue={data?.password}
        />
      </div>
      <span className="text-xs font-medium text-gray-400">
        Personal Information
      </span>
      <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            setImage(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div onClick={() => open()}>
                <LuCloudUpload className="text-xl" />
                <span>Upload a photo</span>
              </div>
            );
          }}
        </CldUploadWidget>
      <div className="flex justify-between flex-wrap gap-4">
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        

        <InputField
          label={"First Name"}
          register={register}
          error={errors.name}
          name={"name"}
          defaultValue={data?.name}
        />
        <InputField
          label={"Last Name"}
          register={register}
          error={errors.surname}
          name={"surname"}
          defaultValue={data?.surname}
        />
        <InputField
          label={"Phone"}
          register={register}
          error={errors.phone}
          name={"phone"}
          defaultValue={data?.phone}
        />
        <InputField
          label={"Address"}
          register={register}
          error={errors.address}
          name={"address"}
          defaultValue={data?.address}
        />
        <InputField
          label={"Blood Type"}
          register={register}
          error={errors.bloodType}
          name={"bloodType"}
          defaultValue={data?.bloodType}
        />
        <InputField
          label={"BirthDay"}
          register={register}
          type="date"
          error={errors.birthday}
          name={"birthday"}
          defaultValue={data?.birthday.toISOString().split("T")[0]}
        />
                <InputField
          label={"Parent Id"}
          register={register}
          error={errors.parentId}
          name={"parentId"}
          defaultValue={data?.parentId}
        />
        <SelectField
          label={"Sex"}
          register={register}
          error={errors.sex}
          name={"sex"}
          options={gender}
          defaultValue={data?.sex}
        />
        <SelectField
          label={"Grade"}
          register={register}
          error={errors.gradeId as FieldError}
          name={"gradeId"}
          options={grade}
          defaultValue={data?.gradeId}
        />
        <SelectField
          label={"Class"}
          register={register}
          error={errors.classId as FieldError}
          name={"classId"}
          options={StudentClass}
          defaultValue={data?.classId}
        />
      </div>
      {state.error && <span>something wrong</span>}
      <button className="bg-blue-300 p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
