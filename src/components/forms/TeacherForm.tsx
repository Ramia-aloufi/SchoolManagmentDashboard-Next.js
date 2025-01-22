"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { input, z } from "zod";
import InputField from "../InputFeild";
import SelectField from "../SelectField";
import FileField from "../FileField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at least 3 characters long!" }),
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});
type inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold"> Create new Teacher</h1>
      <span className="text-xs font-medium text-gray-400">
        Authentication Informati on
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
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"First Name"}
          register={register}
          error={errors.firstName}
          name={"firstname"}
          defaultValue={data?.firstName}
        />
        <InputField
          label={"Last Name"}
          register={register}
          error={errors.lastName}
          name={"lastname"}
          defaultValue={data?.lastName}
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
          name={"bithday"}
          defaultValue={data?.birthday}
        />
        <SelectField
          label={"Sex"}
          register={register}
          error={errors.sex}
          name={"sex"}
          options={["male", "female"]}
          defaultValue={data?.sex}
        />
        <FileField
          register={register}
          error={errors.img}
          name={"img"}
          defaultValue={data?.img}
        />
      </div>
      <button className="bg-blue-300 p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
