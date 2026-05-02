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

export const enrollmentDetailSchema = z.object({
  course_id,
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
  max_capacity: z.number().gt(1, "Maximum capacity must greater than 1"),
});

export type EnrollStudentPayload = z.infer<typeof enrollmentSchema>;
export type EnrollmentDetail = z.infer<typeof enrollmentDetailSchema>;
