import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerParams = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string | number;
};
const FormContainer = async ({
  table,
  type,
  data,
  id,
}: FormContainerParams) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeacher = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeacher };
        break;
      case "class":
        const classGrade = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeacher = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeacher, grades: classGrade };
        break;
      case "teacher":
        const teacherSubject = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubject };
        break;
      case "student":
        const studentGrade = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { grade: studentGrade, class: studentClasses };
        break;
        case "exam":
              const { sessionClaims,userId } = await auth();
              const role = (sessionClaims?.metadata as { role?: string })?.role;
              const examLessons = await prisma.lesson.findMany({
                where:{
                  ...(role === "teacher" ? {teacherId:userId!} : {})
                },
                select:{id:true,name:true}
              })
              relatedData = { lessons: examLessons  };

              break;
      default: 
        break;
    }
  }
  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
