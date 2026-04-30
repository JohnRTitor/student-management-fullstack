import { pool } from "@/lib/db";

export const createCourse = async (
  title: string,
  description: string,
  max_capacity: number,
) => {
  const result = await pool.query(
    "INSERT INTO courses (title, description, max_capacity) VALUES ($1,$2,$3) RETURNING *",
    [title, description, max_capacity],
  );
  return result.rows[0];
};

export const getCourses = async () => {
  const result = await pool.query("SELECT * FROM courses");
  return result.rows;
};

export const updateCourse = async (
  id: string,
  title: string,
  max_capacity: number,
) => {
  const result = await pool.query(
    "UPDATE courses SET title=$1, max_capacity=$2 WHERE id=$3 RETURNING *",
    [title, max_capacity, id],
  );
  return result.rows[0];
};

export const deleteCourse = async (id: string) => {
  await pool.query("DELETE FROM courses WHERE id=$1", [id]);
};
