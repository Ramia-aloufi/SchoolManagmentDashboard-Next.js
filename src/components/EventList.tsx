import prisma from "@/lib/prisma";

const EventList = async({dataParam}:{dataParam:string | undefined}) => {
    const data =  dataParam ?  new Date(dataParam): new Date();
    console.log("dataParam: " + dataParam);
    
    const events = await prisma.event
    .findMany({
        where:{
            startTime:{
                gte: new Date(data.setHours(0,0,0,0)),
                lte: new Date(data.setHours(23,59,59,999)),

            }
        }
    })
    console.log(events);

  return events.map((event) => {
        return (
            <div key={event.id} className=" border-2 border-gray-100 border-t-4 odd:border-t-Sky even:border-t-Purple p-5 rounded-md">
                <div className="flex justify-between items-center">
                    <h1 className=" text-md font-semibold text-gray-600">{event.title}</h1>
                    <span className="text-xs text-gray-300">{event.startTime.toLocaleTimeString("en-UK",{hour:"2-digit",minute:"2-digit",hour12:false})}</span>
                </div>
                <p className=" text-xs text-gray-400">{event.description}</p>
            </div>
        )
    })} 

export default EventList