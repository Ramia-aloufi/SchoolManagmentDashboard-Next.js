import { GrMore } from "react-icons/gr";
import EventList from "./EventList";
import EventCalendar from "./EventCalender";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
    const {data} = searchParams;
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold mt-4">Events</h1>
        <GrMore />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dataParam={data}  />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
