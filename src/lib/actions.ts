"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
type ActionState = {
  success: boolean;
  error: boolean;
};
// Subject Actions
export const CreateSubject = async (
  currentState: ActionState,
  subject: SubjectSchema
) => {
  try {
    console.log("subject :>> ", subject);

    await prisma.subject.create({
      data: {
        name: subject.name,
        teachers: {
          connect: subject.teachers.map((teacher) => ({ id: teacher })),
        },
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
export const UpdateSubject = async (
  currentState: ActionState,
  subject: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: subject.id,
      },
      data: {
        name: subject.name,
        teachers: {
          set: subject.teachers.map((teacher) => ({ id: teacher })),
        },
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
export const DeleteSubject = async (
  currentState: ActionState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
// Class Actions
export const CreateClass = async (
  currentState: ActionState,
  classSchema: ClassSchema
) => {
  try {
    console.log("classSchema :>> ", classSchema);
    await prisma.class.create({
      data: {
        name: classSchema.name,
        capacity: classSchema.capacity,
        gradeId: classSchema.gradeId,
        supervisorId: classSchema.supervisorId,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
export const UpdateClass = async (
  currentState: ActionState,
  classSchema: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: classSchema.id,
      },
      data: {
        name: classSchema.name,
        capacity: classSchema.capacity,
        gradeId: classSchema.gradeId,
        supervisorId: classSchema.supervisorId,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
export const DeleteClass = async (
  currentState: ActionState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
// Teacher Actions
export const CreateTeacher = async (
  currentState: ActionState,
  data: TeacherSchema
) => {
  try {
    const client = await clerkClient()
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName:data.surname,
      publicMetadata:{role:"teacher"}
    }); 
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({ id: parseInt(subjectId) })) || []
        }
      },
    });
    return { success: true, error: false };
  } catch (error:any) {
    console.log("error :>> ", error?.errors || error?.message);
    return { success: false, error: true };
  }
};
export const UpdateTeacher = async (
  currentState: ActionState,
  data: TeacherSchema
) => {
  try {
    if(!data.id)  return { success: false, error: true };
 
    const client = await clerkClient()
   await client.users.updateUser(data.id,{
      username: data.username,
      ...(data.password !== "" && {password:data.password}),
      firstName: data.name,
      lastName:data.surname,
      publicMetadata:{role:"teacher"}
    }); 
    await prisma.teacher.update({
      where:{
        id:data.id
      },
      data: {
        ...(data.password !== "" && {password:data.password}),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({ id: parseInt(subjectId) })) || []
        }
      }, 
    });
    return { success: true, error: false };
  } catch (error:any) {
    console.log("error :>> ", error?.errors || error?.message);
    return { success: false, error: true };
  }
};
export const DeleteTeacher = async (
  currentState: ActionState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const client = await clerkClient()
    await client.users.deleteUser(id);
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
// Student Actions
export const CreateStudent = async (
  currentState: ActionState,
  data: StudentSchema
) => {
  try {
    const classItem = await prisma.class.findUnique({
      where:{
        id:data.classId
        
      },
      include:{
        _count:{
          select:{
            students:true
          }
        }
      }
    })
    if(classItem && classItem.capacity === classItem._count.students)     return { success: false, error: true };

    const client = await clerkClient()
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName:data.surname,
      publicMetadata:{role:"student"}
    }); 
    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId:data.gradeId,
        classId:data.classId,
        parentId:data.parentId,


      },
    });
    return { success: true, error: false };
  } catch (error:any) {
    console.log("error :>> ", error?.errors || error?.message);
    return { success: false, error: true };
  }
};
export const UpdateStudent = async (
  currentState: ActionState,
  data: StudentSchema
) => {
  try {
    if(!data.id)  return { success: false, error: true };
 
    const client = await clerkClient()
   await client.users.updateUser(data.id,{
      username: data.username,
      ...(data.password !== "" && {password:data.password}),
      firstName: data.name,
      lastName:data.surname,
      publicMetadata:{role:"student"}
    }); 
    await prisma.student.update({
      where:{
        id:data.id
      },
      data: {
        ...(data.password !== "" && {password:data.password}),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId:data.gradeId,
        classId:data.classId,
        parentId:data.parentId,
      }, 
    });
    return { success: true, error: false };
  } catch (error:any) {
    console.log("error :>> ", error?.errors || error?.message);
    return { success: false, error: true };
  }
};
export const DeleteStudent = async (
  currentState: ActionState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const client = await clerkClient()
    await client .users.deleteUser(id);
    await prisma.student.delete({
      where: {
        id: id,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
// Subject Actions
export const CreateExam = async (
  currentState: ActionState,
  data: ExamSchema
) => {
  try {

    const { sessionClaims, userId } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role; 

    if(role==="teacher"){

    const teacherLesson = await prisma.lesson.findFirst({
      where:{
        teacherId:userId!,
        id:data.lessonId,

      }
    })
    if(!teacherLesson)return { success: false, error: true };
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,

      },
    });
  }
  return { success: true, error: false };

  } catch (error:any) {
    console.log("error :>> ", error?.errors || error?.message);
    return { success: false, error: true };
  }
};
export const UpdateExam = async (
  currentState: ActionState,
  data: ExamSchema
) => {
  try {
    const { sessionClaims, userId } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role; 

    if(role==="teacher"){

    const teacherLesson = await prisma.lesson.findFirst({
      where:{
        teacherId:userId!,
        id:data.lessonId,

      }
    })
    if(!teacherLesson)return { success: false, error: true };
    await prisma.exam.update({
      where:{
        id:data.id
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,

      },
    });
  }
  return { success: true, error: false };

  } catch (error) {
    console.log("error :>> ", error);
    return { success: false, error: true };
  }
};
export const DeleteExam = async (
  currentState: ActionState,
  data: FormData
) => {
  const id = data.get("id") as string;
        const { sessionClaims, userId } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role; 
  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher" ? {lesson:{teacherId:userId!}} : {})
      },
    });
    return { success: true, error: false };
  } catch (error:any) {
    console.log("error :>> ", error?.errors || error?.message);
    return { success: false, error: true };
  }
};
