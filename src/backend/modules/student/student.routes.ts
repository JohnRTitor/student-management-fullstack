import { Hono } from "hono";
import {
  createStudentController,
  deleteStudentController,
  getStudentsController,
  updateStudentController,
} from "./student.controller";
import { validateBody, validateParams } from "@/backend/utils";
import {
  createStudentSchema,
  studentIdParamSchema,
  updateStudentSchema,
} from "./student.schema";

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
 * @route   PUT /students/:id
 * @desc    Update a student by ID
 * @param   id - Student ID (path param)
 * @body    Validated using updateStudentSchema
 */
studentRoutes.put(
  "/:id",
  validateParams(studentIdParamSchema),
  validateBody(updateStudentSchema),
  updateStudentController,
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
