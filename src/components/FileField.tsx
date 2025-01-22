import React from "react";
import { FieldError } from "react-hook-form";
import { LuCloudUpload } from "react-icons/lu";

type FileFieldProps = {
  register: any;
  error?: FieldError;
  name: string;
  defaultValue?: string;
  inputProps?: React.HtmlHTMLAttributes<HTMLInputElement>;
};
const FileField = ({
  register,
  error,
  name,
  defaultValue,
  inputProps,
}: FileFieldProps) => {
  return (
    <div className="flex flex-col w-full md:w-1/4 gap-2 justify-center">
    <label className="text-xs text-gray-500 flex gap-2 items-center cursor-pointer " htmlFor="img" >
    <LuCloudUpload className="text-xl" />
    <span>Upload a photo</span>
        </label>
    <input
    id="img"
      type="file"
      {...register(name)}
      className="hidden"
      {...inputProps}
      defaultValue={defaultValue}
    />
    {error?.message && <p className="text-xs text-red-400">{error?.message.toString()}</p>}
    </div>
  )
};

export default FileField;
