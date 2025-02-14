'use client'

import React, { useState } from 'react'
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const BigCalender = ({data}:{data:{title:string,start:Date,end:Date}[]}) => {
    const localizer = momentLocalizer(moment)
    const [view, setView] = useState<View>(Views.WORK_WEEK)

    const handleView = (view: View) => {
        setView(view)
    }

  return (
     <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleView}
      min={new Date (2025, 1,0,8,0,0)}
      max={new Date(2025, 1,0,18, 0,0)}
    />
   )
}

export default BigCalender