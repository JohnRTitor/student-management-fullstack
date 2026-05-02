import { Hono } from "hono";
import {
  createStudentController,
  deleteStudentController,
  getStudentsController,
} from "./student.controller";
import { validateBody, validateParams } from "@/backend/utils";
import { createStudentSchema, studentIdParamSchema } from "./student.schema";

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

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student by ID
 * @param   id - Student ID (path param)
 */
studentRoutes.delete(
  "/:id",
  validateParams(studentIdParamSchema),
  deleteStudentController,
);
