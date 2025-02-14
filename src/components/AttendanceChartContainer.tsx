import React from "react";
import AttendanceChart from "./AttendanceChart";
import { GrMore } from "react-icons/gr";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeak = today.getDay();
  const daySinceSaturday = dayOfWeak === 0 ? 6 : dayOfWeak - 1;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daySinceSaturday);

  const data = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfWeek,
        // lte:today
      },
    },
    select: {
      date: true,
      present: true,
    },
  });
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu","Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  data.forEach((d) => {
    // const date = new Date(d.date);
    if (dayOfWeak >= 1 && dayOfWeak <= 5) {
      const dayName = daysOfWeek[dayOfWeak - 1];
      if (d.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });
  console.log("attendanceMap: " + attendanceMap);


  const attendanceData = daysOfWeek.map((key) => ({
      name: key,
      present: attendanceMap[key].present,
      absent: attendanceMap[key].absent,
 
  }));
  
  return (
    <div className="bg-white p-4 w-full h-full rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <GrMore />
      </div>
      {/* CHART */}
      <AttendanceChart
        data={attendanceData}
      />
    </div>
  );
};

export default AttendanceChartContainer;
