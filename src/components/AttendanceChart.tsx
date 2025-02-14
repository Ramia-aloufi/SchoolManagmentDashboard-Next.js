'use client'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const AttendanceChart = ({data}:{data:{name:string,present:number,absent:number}[]}) => {
  return (

        <div className="w-full h-[75%] relative">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
          <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}  />
          <Tooltip  contentStyle={{borderRadius:"10px", borderColor:"lightgrey"}} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}} />
          <Bar dataKey="present" radius={[10,10,0,0]} legendType="circle" fill="#fae27c" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="absent" radius={[10,10,0,0]} legendType="circle" fill="#c3ebfa  " activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
        </div>
    
  )
}

export default AttendanceChart