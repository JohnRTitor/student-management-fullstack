import { Hono } from "hono";
import { courseRoutes } from "./modules/course/course.routes";
import { studentRoutes } from "./modules/student/student.routes";

export const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.route("/students", studentRoutes);
// app.route("/courses", courseRoutes);
// app.route("/enrollments", enrollmentRoutes);
