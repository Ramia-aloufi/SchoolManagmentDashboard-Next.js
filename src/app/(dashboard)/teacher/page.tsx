import Announcement from '@/components/Announcement'
import BigCalender from '@/components/BigCalender'
import React from 'react'

const TeacherPage = () => {
  return (
    <div className='flex-1 flex flex-col p-4 gap-4 xl:flex-row'>
    {/* Left */}
    <div className="w-full xl:w-2/3">
    <h1 className="text-xl font-semibold">Schedule</h1>
      <BigCalender />
    </div>
    {/* Right */}
    <div className="w-full xl:w-1/3">
      <Announcement />
    </div>
  </div>
  )
}

export default TeacherPage