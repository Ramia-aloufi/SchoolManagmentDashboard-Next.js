'use client'
import { GrMore } from 'react-icons/gr';
import { IoMan, IoWoman } from 'react-icons/io5';
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Total',
        count: 100,
        fill: '#fff',
      },
    {
      name: 'Girls',
      count: 55,
      fill: '#fae27c ',
    },
    {
      name: 'Boys',
      count: 45,
      fill: '#c3ebfa',
    },
    
  ];
  

const CountChart = () => {
  return (
    <div className='bg-white p-4 w-full h-full rounded-xl'>
        {/* Title */}
        <div className="flex justify-between items-center">
            <h1 className='text-lg font-semibold'>Students</h1>
            <GrMore/>
        </div>
        <div className="w-full h-[75%] relative">
        <ResponsiveContainer >
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            background
             dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 flex">
        <IoWoman className='text-[40px] text-Sky' />
        <IoMan  className='text-[40px] text-Yellow' />
        </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 rounded-full bg-Sky"></div>
                <h1 className='font-bold'>1,240</h1>
                <h2 className='text-xs text-gray-300'>Boys(55%)</h2>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 rounded-full bg-Yellow"></div>
                <h1 className='font-bold'>1,240</h1>
                <h2 className='text-xs text-gray-300'>Girls(45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart