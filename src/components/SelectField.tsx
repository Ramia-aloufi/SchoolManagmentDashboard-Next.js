import React from 'react'
import { FieldError } from 'react-hook-form'
type SelectFieldProps = {
    label :string
    options : string[]
    register: any
    error?: FieldError  
    name: string
    defaultValue?: string
    inputProps?:React.HtmlHTMLAttributes<HTMLInputElement>
}
const SelectField = (
    {
        label,
        options,
        register,
        error,
        name,
        defaultValue,
        inputProps
    }:SelectFieldProps
) => {
    return (
        <div className="flex flex-col w-full md:w-1/4 gap-2">
        <label className="text-xs text-gray-500" >{label}</label>
        <select  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register(name)}
                  {...inputProps}
                  defaultValue={defaultValue}>

                    {options.map((option,index)=>(
                        <option key={index} value={option}>{option}</option>
                    ))}
                  </select>

        {error?.message && <p className="text-xs text-red-400">{error?.message.toString()}</p>}
        </div>
      )
}

export default SelectField