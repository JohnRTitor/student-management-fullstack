import { Context } from "hono";
import { createStudent, deleteStudent, getStudents } from "./student.service";
import { CreateStudentPayload } from "./student.schema";

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
          code: "INTERNAL_ERROR",
          message: "Failed to fetch students",
          details: error instanceof Error ? error.message : String(error),
        },
      },
      500,
    );
  }
};

export const createStudentController = async (c: Context) => {
  try {
    const body = (await c.get("validatedBody")) || (await c.req.json());
    const { name, email, grade } = body as CreateStudentPayload;

    await createStudent({ name, email, grade });
    return c.json(
      {
        success: true,
        message: "Student created successfully",
      },
      201,
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to create student",
          details: error instanceof Error ? error.message : String(error),
        },
      },
      500,
    );
  }
};

export const deleteStudentController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");

    await deleteStudent({ id });
    return c.json(
      {
        success: true,
        message: "Student deleted successfully",
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to delete student",
          details: error instanceof Error ? error.message : String(error),
        },
      },
      500,
    );
  }
};
