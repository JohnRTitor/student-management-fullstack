import { pool } from "@/lib/db";

export const enrollStudent = async (student_id: number, course_id: number) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const course = await client.query(
      "SELECT max_capacity FROM courses WHERE id=$1",
      [course_id],
    );

    const count = await client.query(
      "SELECT COUNT(*) FROM enrollments WHERE course_id=$1",
      [course_id],
    );

    if (parseInt(count.rows[0].count) >= course.rows[0].max_capacity) {
      throw new Error("Course full");
    }

    await client.query(
      "INSERT INTO enrollments (student_id, course_id) VALUES ($1,$2)",
      [student_id, course_id],
    );

    await client.query("COMMIT");

    return { message: "Enrolled successfully" };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
