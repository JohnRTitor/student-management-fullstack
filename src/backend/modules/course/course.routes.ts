import { Hono } from "hono";
import {
  createCourseController,
  deleteCourseController,
  getCoursesController,
  updateCourseController,
} from "./course.controller";
import { validateBody, validateParams } from "@/backend/utils/validation";
import {
  courseIdParamSchema,
  courseSchema,
  updateCourseSchema,
} from "./course.schema";

export const courseRoutes = new Hono();

/**
 * @route   GET /courses
 * @desc    Fetch all courses
 */
courseRoutes.get("/", getCoursesController);

/**
 * @route   POST /courses
 * @desc    Create a new course
 * @body    Validated using courseSchema
 */
courseRoutes.post("/", validateBody(courseSchema), createCourseController);

/**
 * @route   PUT /courses/:id
 * @desc    Update a course by ID
 * @param   id - Course ID (path param)
 * @body    Validated using updateCourseSchema
 */
courseRoutes.put(
  "/:id",
  validateParams(courseIdParamSchema),
  validateBody(updateCourseSchema),
  updateCourseController,
);

/**
 * @route   DELETE /courses/:id
 * @desc    Delete a course by ID
 * @param   id - Course ID (path param)
 */
courseRoutes.delete(
  "/:id",
  validateParams(courseIdParamSchema),
  deleteCourseController,
);
