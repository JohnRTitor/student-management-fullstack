import z from "zod";

const id = z.coerce
  .number()
  .int("ID must be an integer")
  .positive("ID must be a positive integer");

export const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
  max_capacity: z.number().gt(1, "Maximum capacity must greater than 1"),
});

export const courseIdParamSchema = z.object({
  id,
});

export const updateCourseSchema = courseSchema;

export type AddCourseInput = z.infer<typeof courseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CourseIdParam = z.infer<typeof courseIdParamSchema>;
