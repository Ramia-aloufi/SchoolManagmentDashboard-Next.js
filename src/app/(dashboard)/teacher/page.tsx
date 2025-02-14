import Announcement from '@/components/Announcement'
import BigCalendarContainer from '@/components/BigCalendarContainer'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const TeacherPage = async() => {

  const { userId } = await  auth();
  return (
    <div className='flex-1 flex flex-col p-4 gap-4 xl:flex-row'>
    {/* Left */}
    <div className="w-full xl:w-2/3">
    <h1 className="text-xl font-semibold">Schedule</h1>
      <BigCalendarContainer type='teacherId' id={userId! }  />
    </div>
    {/* Right */}
    <div className="w-full xl:w-1/3">
      <Announcement />
    </div>
  </div>
  )
}

export default TeacherPage