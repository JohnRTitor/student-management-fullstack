import z from "zod";

const student_id = z.coerce
  .number()
  .int("Student ID must be an integer")
  .positive("Student ID must be a positive integer");

const course_id = z.coerce
  .number()
  .int("Course ID must be an integer")
  .positive("Course ID must be a positive integer");

export const enrollmentSchema = z.object({
  student_id,
  course_id,
});

export type EnrollStudentPayload = z.infer<typeof enrollmentSchema>;