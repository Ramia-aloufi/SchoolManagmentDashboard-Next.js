'use client'
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { GrMore } from 'react-icons/gr';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const events = [{
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
},
{
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
},
{
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}]
const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className='bg-white p-4 rounded-md'>
            <Calendar onChange={onChange} value={value} />
            {/* Title */}
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold mt-4'>Events</h1>
                <GrMore />
            </div>
            <div className="flex flex-col gap-4">
                {events.map((event) => {
                    return (
                        <div key={event.id} className=" border-2 border-gray-100 border-t-4 odd:border-t-Sky even:border-t-Purple p-5 rounded-md">
                            <div className="flex justify-between items-center">
                                <h1 className=" text-md font-semibold text-gray-600">{event.title}</h1>
                                <span className="text-xs text-gray-300">{event.time}</span>
                            </div>
                            <p className=" text-xs text-gray-400">{event.description}</p>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default EventCalendar