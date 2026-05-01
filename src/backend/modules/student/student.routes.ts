import { Hono } from "hono";
import {
  createStudentController,
  getStudentsController,
} from "./student.controller";
import { validateBody } from "@/backend/utils";
import { createStudentSchema } from "./student.schema";

export const studentRoutes = new Hono();

/**
 * @route   GET /students
 * @desc    Fetch all students
 */
studentRoutes.get("/", getStudentsController);

/**
 * @route   POST /students
 * @desc    Create a new student
 * @body    Validated using createStudentSchema
 */
studentRoutes.post(
  "/",
  validateBody(createStudentSchema),
  createStudentController,
);
