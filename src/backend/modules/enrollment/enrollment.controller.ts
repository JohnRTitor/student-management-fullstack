import { Context } from "hono";
import { enrollStudent } from "./enrollment.service";
import type { EnrollStudentPayload } from "./enrollment.schema";
import { fail, ok } from "@/backend/utils/response";

export const enrollStudentController = async (c: Context) => {
  try {
    const body = c.get("validatedBody") as EnrollStudentPayload;
    const { student_id, course_id } = body;

    const result = await enrollStudent(student_id, course_id);

    return c.json(ok(result, "Enrollment successful"), 200);
  } catch (error) {
    if (error instanceof Error && error.message === "Course not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    if (error instanceof Error && error.message === "Course full") {
      return c.json(fail(error.message, { code: "COURSE_FULL" }), 400);
    }

    return c.json(
      fail("Failed to enroll student", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};