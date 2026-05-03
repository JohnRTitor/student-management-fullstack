import { Context } from "hono";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
  updateStudentPartial,
} from "./student.service";
import type {
  CreateStudentPayload,
  PatchStudentPayload,
  UpdateStudentPayload,
} from "./student.schema";
import { fail, ok } from "@/backend/utils/response";

export const getStudentsController = async (c: Context) => {
  try {
    const students = await getStudents();

    return c.json(ok(students, "Students fetched successfully"), 200);
  } catch (error) {
    return c.json(
      fail("Failed to fetch students", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const getStudentByIdController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");

    const student = await getStudentById(id);

    return c.json(ok(student, "Student fetched successfully"), 200);
  } catch (error) {
    if (error instanceof Error && error.message === "Student not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    return c.json(
      fail("Failed to fetch student", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const createStudentController = async (c: Context) => {
  try {
    const body = c.get("validatedBody") as CreateStudentPayload;
    const { name, email, grade } = body;

    const createdStudent = await createStudent({ name, email, grade });

    return c.json(ok(createdStudent, "Student created successfully"), 201);
  } catch (error) {
    return c.json(
      fail("Failed to create student", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const updateStudentController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");
    const body = c.get("validatedBody") as UpdateStudentPayload;

    const updatedStudent = await updateStudent(id, body);

    return c.json(ok(updatedStudent, "Student updated successfully"), 200);
  } catch (error) {
    if (error instanceof Error && error.message === "Student not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    return c.json(
      fail("Failed to update student", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const deleteStudentController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");

    const deletedStudent = await deleteStudent({ id });

    return c.json(ok(deletedStudent, "Student deleted successfully"), 200);
  } catch (error) {
    console.error("Delete student error:", error);

    if (error instanceof Error && error.message === "Student not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    return c.json(
      fail("Failed to delete student", {
        code: "INTERNAL_ERROR",
        details: errorMessage,
      }),
      500,
    );
  }
};

export const patchStudentController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");
    const body = c.get("validatedBody") as PatchStudentPayload;

    const updatedStudent = await updateStudentPartial(id, body);

    return c.json(ok(updatedStudent, "Student partially updated"), 200);
  } catch (error) {
    if (error instanceof Error && error.message === "Student not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    return c.json(fail("Failed to patch student"), 500);
  }
};
