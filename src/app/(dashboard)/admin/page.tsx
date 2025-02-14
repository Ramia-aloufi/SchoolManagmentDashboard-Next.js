import Announcement from '@/components/Announcement'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'

import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'


import React from 'react'

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className='flex flex-col md:flex-row gap-2 p-4 '>
      {/* Left side */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type='admin' />
          <UserCard type='teacher' />
          <UserCard type='student' />
          <UserCard type='parent' />
        </div>
        {/* Middle Chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
          <CountChartContainer/>
          </div>
          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
          <AttendanceChartContainer/>
          </div>

        </div>
        {/* Bottom Chart */}
        <div className="h-[500px] w-full">
          <FinanceChart/>
        </div>
      </div>
      {/* Right side */}
      <div className="w-ful l lg:w-1/3 flex flex-col gap-8">
      <EventCalendarContainer searchParams={searchParams}/>
      <Announcement/>
      </div>
    </div>
  )
}
export default AdminPage