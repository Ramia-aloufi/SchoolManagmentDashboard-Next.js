import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()),
});
export type SubjectSchema = z.infer<typeof subjectSchema>;
// ClassSchema
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});
export type ClassSchema = z.infer<typeof classSchema>;
// TeacherSchema
export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at least 3 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .or(z.literal("")),
  name: z.string().min(1, { message: " name is required!" }),
  surname: z.string().min(1, { message: "surname is required!" }),
  email: z
    .string()
    .email({ message: "invalid email" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(),
});
export type TeacherSchema = z.infer<typeof teacherSchema>;
// StudentSchema
export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at least 3 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .or(z.literal("")),
  name: z.string().min(1, { message: " name is required!" }),
  surname: z.string().min(1, { message: "surname is required!" }),
  email: z
    .string()
    .email({ message: "invalid email" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }),
});
export type StudentSchema = z.infer<typeof studentSchema>;
// ExamSchema
export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Exam title is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});
export type ExamSchema = z.infer<typeof examSchema>;
