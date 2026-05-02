import { Context } from "hono";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "./course.service";
import type { AddCourseInput, UpdateCourseInput } from "./course.schema";
import { fail, ok } from "@/backend/utils/response";

export const getCoursesController = async (c: Context) => {
  try {
    const courses = await getCourses();

    return c.json(ok(courses, "Courses fetched successfully"), 200);
  } catch (error) {
    return c.json(
      fail("Failed to fetch courses", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const createCourseController = async (c: Context) => {
  try {
    const body = c.get("validatedBody") as AddCourseInput;
    const { title, description, max_capacity } = body;

    const createdCourse = await createCourse(title, description, max_capacity);

    return c.json(ok(createdCourse, "Course created successfully"), 201);
  } catch (error) {
    return c.json(
      fail("Failed to create course", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const updateCourseController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");
    const body = c.get("validatedBody") as UpdateCourseInput;

    const updatedCourse = await updateCourse(id, body);

    return c.json(ok(updatedCourse, "Course updated successfully"), 200);
  } catch (error) {
    if (error instanceof Error && error.message === "Course not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    return c.json(
      fail("Failed to update course", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};

export const deleteCourseController = async (c: Context) => {
  try {
    const { id } = c.get("validatedParams");

    const deletedCourse = await deleteCourse(id);

    return c.json(ok(deletedCourse, "Course deleted successfully"), 200);
  } catch (error) {
    if (error instanceof Error && error.message === "Course not found") {
      return c.json(fail(error.message, { code: "NOT_FOUND" }), 404);
    }

    return c.json(
      fail("Failed to delete course", {
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : String(error),
      }),
      500,
    );
  }
};
