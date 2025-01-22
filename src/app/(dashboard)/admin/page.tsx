import Announcement from '@/components/Announcement'
import AttendanceChart from '@/components/AttendanceChart'
import CountChart from '@/components/CountChart'

import EventCalendar from '@/components/EventCalender'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'


import React from 'react'

const AdminPage = () => {
  return (
    <div className='flex flex-col md:flex-row gap-2 p-4 '>
      {/* Left side */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type='student' />
          <UserCard type='teacher' />
          <UserCard type='parent' />
          <UserCard type='class' />
        </div>
        {/* Middle Chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
          <CountChart/>
          </div>
          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
          <AttendanceChart/>
          </div>

        </div>
        {/* Bottom Chart */}
        <div className="h-[500px] w-full">
          <FinanceChart/>
        </div>
      </div>
      {/* Right side */}
      <div className="w-ful l lg:w-1/3 flex flex-col gap-8">
      <EventCalendar/>
      <Announcement/>
      </div>
    </div>
  )
}
export default AdminPage