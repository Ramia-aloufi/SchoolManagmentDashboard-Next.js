import Announcement from '@/components/Announcement'
import BigCalender from '@/components/BigCalender'
import EventCalendar from '@/components/EventCalender'
import React from 'react'

const StudentPage = () => {

  return (
    <div className='flex flex-col p-4 gap-4 xl:flex-row'>
      {/* Left */}
      <div className="w-full xl:w-2/3">
      <h1 className="text-xl font-semibold">Schedule</h1>
        <BigCalender />
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