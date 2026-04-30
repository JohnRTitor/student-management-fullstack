import { Hono } from "hono";
import { getStudentsController } from "./student.controller";

export const studentRoutes = new Hono();

studentRoutes.get("/", getStudentsController);
