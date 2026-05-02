import { Hono } from "hono";
import { courseRoutes } from "./modules/course/course.routes";
import { enrollmentRoutes } from "./modules/enrollment/enrollment.routes";
import { studentRoutes } from "./modules/student/student.routes";

export const app = new Hono().basePath("/api");

app.route("/students", studentRoutes);
app.route("/courses", courseRoutes);
app.route("/enrollments", enrollmentRoutes);
