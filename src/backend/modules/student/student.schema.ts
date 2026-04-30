import z from "zod";

export const studentSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  created_at: z.iso.datetime(),
});

export const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
});

export const updateStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const studentIdParamSchema = z.object({
  id: z.uuid("Invalid student ID"),
});

export type Student = z.infer<typeof studentSchema>;
export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type StudentIdParam = z.infer<typeof studentIdParamSchema>;
