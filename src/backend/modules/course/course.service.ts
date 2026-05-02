import { pool } from "@/lib/db";
import type { CourseIdParam, UpdateCourseInput } from "./course.schema";

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
  id: CourseIdParam["id"],
  payload: UpdateCourseInput,
) => {
  const { title, description, max_capacity } = payload;

  const result = await pool.query(
    "UPDATE courses SET title=$1, description=$2, max_capacity=$3 WHERE id=$4 RETURNING *",
    [title, description, max_capacity, id],
  );

  if (!result.rows.length) {
    throw new Error("Course not found");
  }

  return result.rows[0];
};

export const deleteCourse = async (id: CourseIdParam["id"]) => {
  const result = await pool.query(
    "DELETE FROM courses WHERE id=$1 RETURNING *",
    [id],
  );

  if (!result.rows.length) {
    throw new Error("Course not found");
  }

  return result.rows[0];
};
