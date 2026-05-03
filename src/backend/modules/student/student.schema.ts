import z from "zod";

const name = z.string().min(1, "Name is required");
const email = z.email("Invalid email");
const grade = z.coerce
  .number()
  .min(0, "Grade must be at least 0")
  .max(100, "Grade must be at most 100");
const id = z.coerce
  .number()
  .int("ID must be an integer")
  .positive("ID must be a positive integer");
const createdAt = z.string().datetime();

const baseStudentSchema = z.object({
  name,
  email,
  grade,
});

export const studentSchema = baseStudentSchema.extend({
  id,
  created_at: createdAt,
});

export const createStudentSchema = baseStudentSchema;

export const updateStudentSchema = baseStudentSchema;
export const patchStudentSchema = baseStudentSchema.partial();

export const studentIdParamSchema = z.object({
  id,
});

export type Student = z.infer<typeof studentSchema>;
export type CreateStudentPayload = z.infer<typeof createStudentSchema>;
export type UpdateStudentPayload = z.infer<typeof updateStudentSchema>;
export type PatchStudentPayload = z.infer<typeof patchStudentSchema>;
export type StudentIdParam = z.infer<typeof studentIdParamSchema>;
export type DeleteStudentPayload = StudentIdParam;
