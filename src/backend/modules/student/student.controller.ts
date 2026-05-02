import { Context } from "hono";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "./student.service";
import type {
  CreateStudentPayload,
  UpdateStudentPayload,
} from "./student.schema";

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
    const body = await c.get("validatedBody");
    const { name, email, grade } = body as CreateStudentPayload;

    const createdStudent = await createStudent({ name, email, grade });
    return c.json(
      {
        success: true,
        message: "Student created successfully",
        data: { ...createdStudent },
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

export const updateStudentController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");
    const body = (await c.get("validatedBody")) as UpdateStudentPayload;

    const updatedStudent = await updateStudent(id, body);
    return c.json(
      {
        success: true,
        message: "Student updated successfully",
        data: { ...updatedStudent },
      },
      200,
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Student not found") {
      return c.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: error.message,
          },
        },
        404,
      );
    }

    return c.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update student",
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

    const deletedStudent = await deleteStudent({ id });
    return c.json(
      {
        success: true,
        message: "Student deleted successfully",
        data: { ...deletedStudent },
      },
      200,
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Student not found") {
      return c.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: error.message,
          },
        },
        404,
      );
    }

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
