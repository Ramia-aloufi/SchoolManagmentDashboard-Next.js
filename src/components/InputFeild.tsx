import React from 'react'
import { FieldError } from 'react-hook-form'
type InputFieldProps = {
    label :string
    type? : string
    register: any
    error?: FieldError  
    name: string
    defaultValue?: string
    inputProps?:React.HtmlHTMLAttributes<HTMLInputElement>
    hidden?:boolean
}
const InputField = ({
    label,
    type="text",
    register,
    error,
    name,
    defaultValue,
    inputProps,
    hidden = false
}:InputFieldProps) => {
  return (
    <div className={hidden ?"hidden":"flex flex-col w-full md:w-1/4 gap-2"}>
    <label className="text-xs text-gray-500" >{label}</label>
    <input
      type={type}
      {...register(name)}
      className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
      {...inputProps}
      defaultValue={defaultValue}
    />
    {error?.message && <p className="text-xs text-red-400">{error?.message.toString()}</p>}
    </div>
  )
}

export default InputField