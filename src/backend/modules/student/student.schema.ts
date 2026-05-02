import z from "zod";

const name = z.string().min(1, "Name is required");
const email = z.email("Invalid email");
const grade = z.string().max(3, "Grade must be maximum of 3 characters");
const id = z.coerce
  .number()
  .int("ID must be an integer")
  .positive("ID must be a positive integer");
const createdAt = z.iso.datetime();

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

export const updateStudentSchema = baseStudentSchema.partial();
export const studentIdParamSchema = z.object({
  id,
});

export type Student = z.infer<typeof studentSchema>;
export type CreateStudentPayload = z.infer<typeof createStudentSchema>;
export type UpdateStudentPayload = z.infer<typeof updateStudentSchema>;
export type StudentIdParam = z.infer<typeof studentIdParamSchema>;
export type DeleteStudentPayload = StudentIdParam;
