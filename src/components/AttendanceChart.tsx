'use client'
import { GrMore } from "react-icons/gr";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      name: 'Mon',
      present: 40,
      absent: 24,
    },
    {
      name: 'Tus',
      present: 30,
      absent: 13,
    },
    {
      name: 'Wed',
      present: 20,
      absent: 19,
    },
    {
      name: 'Thu',
      present: 27,
      absent: 39,
    },

    {
      name: 'Sun',
      present: 34,
      absent: 43,
    },
  ];
const AttendanceChart = () => {
  return (
    <div className='bg-white p-4 w-full h-full rounded-xl'>
        {/* Title */}
        <div className="flex justify-between items-center">
            <h1 className='text-lg font-semibold'>Attendance</h1>
            <GrMore/>
        </div>
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
    </div>
  )
}

export default AttendanceChart