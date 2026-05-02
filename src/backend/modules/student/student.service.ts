import { pool } from "@/lib/db";
import type {
  CreateStudentPayload,
  DeleteStudentPayload,
  Student,
} from "./student.schema";

export const createStudent = async (payload: CreateStudentPayload) => {
  const { name, email, grade } = payload;

  const result = await pool.query(
    "INSERT INTO students (name, email, grade) VALUES ($1, $2, $3) RETURNING *",
    [name, email, grade],
  );

  return result.rows[0];
};

export const getStudents = async (): Promise<Student[]> => {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
};

export const updateStudent = async (
  id: string,
  name: string,
): Promise<Student> => {
  const result = await pool.query(
    "UPDATE students SET name=$1 WHERE id=$2 RETURNING *",
    [name, id],
  );
  return result.rows[0];
};

export const deleteStudent = async (payload: DeleteStudentPayload) => {
  await pool.query("DELETE FROM students WHERE id=$1", [payload.id]);
};
