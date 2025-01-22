 import { GrMore } from "react-icons/gr"

const userCard = ({type}:{type:string}) => {
  return (
    <div className="rounded-2xl odd:bg-Purple even:bg-Yellow p-4 flex-1 min-w-[130px]"> 
    <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
        <GrMore className="text-lg text-white"/>
    </div>
    <h1 className="text-2xl font-semibold my-4">1024</h1>
    <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>

    </div>
  )
}

export default userCard