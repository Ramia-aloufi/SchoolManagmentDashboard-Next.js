import Announcement from '@/components/Announcement'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import EventCalendar from '@/components/EventCalender'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const StudentPage = async() => {

  const { userId } = await  auth();
  const classItem = await prisma.class.findMany ({
    where: {
      students: {
        some: {
          id: userId!
        }
      }
    }
  })
  console.log(classItem);
  
  return (
    <div className='flex flex-col p-4 gap-4 xl:flex-row'>
      {/* Left */}
      <div className="w-full xl:w-2/3">
      <h1 className="text-xl font-semibold">Schedule</h1>
        <BigCalendarContainer type={"classId"} id={classItem[0].id } />
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3">
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  )
}

export default StudentPage