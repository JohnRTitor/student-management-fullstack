import { pool } from "@/lib/db";
import type {
  CreateStudentPayload,
  DeleteStudentPayload,
  PatchStudentPayload,
  Student,
  StudentIdParam,
  UpdateStudentPayload,
} from "./student.schema";

export const createStudent = async (
  payload: CreateStudentPayload,
): Promise<Student> => {
  const { name, email, grade } = payload;

  const result = await pool.query(
    "INSERT INTO students (name, email, grade) VALUES ($1, $2, $3) RETURNING *",
    [name, email, grade],
  );

  if (!result.rows.length) {
    throw new Error("Failed to create student");
  }

  return result.rows[0];
};

export const getStudents = async (): Promise<Student[]> => {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
};

export const updateStudent = async (
  id: StudentIdParam["id"],
  payload: UpdateStudentPayload,
): Promise<Student> => {
  const { name, email, grade } = payload;

  const result = await pool.query(
    "UPDATE students SET name=$1, email=$2, grade=$3 WHERE id=$4 RETURNING *",
    [name, email, grade, id],
  );

  if (!result.rows.length) {
    throw new Error("Student not found");
  }

  return result.rows[0];
};

export const updateStudentPartial = async (
  id: StudentIdParam["id"],
  payload: PatchStudentPayload,
): Promise<Student> => {
  const fields: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  if (payload.name !== undefined) {
    fields.push(`name=$${index++}`);
    values.push(payload.name);
  }

  if (payload.email !== undefined) {
    fields.push(`email=$${index++}`);
    values.push(payload.email);
  }

  if (payload.grade !== undefined) {
    fields.push(`grade=$${index++}`);
    values.push(payload.grade);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided");
  }

  values.push(id);

  const query = `
    UPDATE students
    SET ${fields.join(", ")}
    WHERE id=$${index}
    RETURNING *
  `;

  const result = await pool.query(query, values);

  if (!result.rows.length) {
    throw new Error("Student not found");
  }

  return result.rows[0];
};

export const deleteStudent = async (
  payload: DeleteStudentPayload,
): Promise<Student> => {
  const result = await pool.query(
    "DELETE FROM students WHERE id=$1 RETURNING *",
    [payload.id],
  );

  if (result.rowCount === 0) {
    throw new Error("Student not found");
  }

  return result.rows[0];
};
