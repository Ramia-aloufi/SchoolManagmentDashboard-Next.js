import prisma from '@/lib/prisma'
import React from 'react'

const StudentAttendanceCard = async({id}:{id:string}) => {
    const attendance =  await prisma.attendance.findMany({
        where:{
            studentId:id,
            date:{
                gte:new Date(new Date().getFullYear(), 0, 1),
            }
        },

    })
    const totalDays = attendance.length
    const presentDays = attendance.filter((date)=>date.present).length
    const percentage = (totalDays / presentDays) * 100
  return (
    <div className="">
    <h1 className="text-xl font-semibold">{percentage || "-"}%</h1>
    <p className="text-sm text-gray-400">attendance</p>
  </div>  )
}

export default StudentAttendanceCard