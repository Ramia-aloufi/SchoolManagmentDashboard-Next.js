import prisma from "@/lib/prisma"
import BigCalender from "./BigCalender"
import { adjustScheduleToCurrentWeek } from "@/lib/utils"

 
const BigCalendarContainer = async({type,id}:{type:"teacherId"| "classId",id:number | string }) => {

    const res = await prisma.lesson.findMany({
        where:{
            ...(type === "teacherId" ? {teacherId:id as string} : {classId:id as number}),
        }
    })
    const data = res.map((lesson) => {
        return {
            title: lesson.name,
            start: lesson.startTime,
            end: lesson.endTime,
        }
    })
    const schedule = adjustScheduleToCurrentWeek(data)
  return (
    <div><BigCalender data={schedule}/></div>
  )
}

export default BigCalendarContainer