"use client";
import { IoMan, IoWoman } from "react-icons/io5";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";


const CountChart = ({boys,girls}:{boys:number,girls:number}) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "#fff",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#fae27c ",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#c3ebfa",
    },
  ];
  return (
    <div className="w-full h-[75%] relative">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 flex">
        <IoWoman className="text-[40px] text-Sky" />
        <IoMan className="text-[40px] text-Yellow" />
      </div>
    </div>
  );
};

export default CountChart;
