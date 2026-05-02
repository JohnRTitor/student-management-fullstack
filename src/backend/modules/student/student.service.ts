import { pool } from "@/lib/db";
import type {
  CreateStudentPayload,
  DeleteStudentPayload,
  Student,
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
  id: number,
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
