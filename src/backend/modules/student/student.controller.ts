import { Context } from "hono";
import { getStudents } from "./student.service";

export const getStudentsController = async (c: Context) => {
  try {
    const students = await getStudents();

    return c.json(
      {
        success: true,
        data: students,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: {
          message: "Failed to fetch students",
        },
      },
      500,
    );
  }
};
