import { pool } from "@/lib/db";

export const createStudent = async (name: string, email: string) => {
  const result = await pool.query(
    "INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );
  return result.rows[0];
};

export const getStudents = async () => {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
};

export const updateStudent = async (id: string, name: string) => {
  const result = await pool.query(
    "UPDATE students SET name=$1 WHERE id=$2 RETURNING *",
    [name, id],
  );
  return result.rows[0];
};

export const deleteStudent = async (id: string) => {
  await pool.query("DELETE FROM students WHERE id=$1", [id]);
};
