import { Hono } from "hono";
import { enrollStudentController } from "./enrollment.controller";
import { validateBody } from "@/backend/utils/validation";
import { enrollmentSchema } from "./enrollment.schema";

export const enrollmentRoutes = new Hono();

/**
 * @route   POST /enrollments
 * @desc    Enroll a student in a course
 * @body    Validated using enrollmentSchema
 */
enrollmentRoutes.post(
  "/",
  validateBody(enrollmentSchema),
  enrollStudentController,
);
