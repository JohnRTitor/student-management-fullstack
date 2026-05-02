# Student Management Fullstack

A fullstack student management system built with **Next.js 16** (React 19) on the frontend and **Hono** on the backend, backed by **PostgreSQL**. It provides CRUD for students and courses, plus student enrollment with capacity checks.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Hono (mounted via Next.js route handler)
- **Database**: PostgreSQL
- **Validation**: Zod
- **HTTP**: JSON API

## Features

- Student dashboard with search, sorting, add/edit/delete
- Student detail view
- Course management API
- Enrollment with course capacity enforcement
- Consistent API response format with success/error payloads

## Project Structure

- `src/app` – Next.js app routes and pages
- `src/app/api/[...route]/route.ts` – Hono bridge for API routes
- `src/backend` – Hono app, routes, controllers, services, schemas
- `src/lib/db.ts` – Postgres pool
- `src/components` – UI components and dashboard
- `src/hooks/use-fetch.ts` – Fetch helper hook

## Getting Started

### 1) Install dependencies

```
pnpm install
```

### 2) Configure environment

Create a `.env` file in the project root with:

```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME
```

### 3) Run the dev server

```
pnpm dev
```

App runs at: `http://localhost:3000`

## API Overview

Base path: `/api`

### Students

- `GET /api/students` – list all students
- `GET /api/students/:id` – fetch student by ID
- `POST /api/students` – create student
- `PUT /api/students/:id` – update student
- `PATCH /api/students/:id` – partial update
- `DELETE /api/students/:id` – delete student

Payload shape:

```/dev/null/student.payload.json#L1-5
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "grade": 90
}
```

### Courses

- `GET /api/courses` – list courses
- `POST /api/courses` – create course
- `PUT /api/courses/:id` – update course
- `DELETE /api/courses/:id` – delete course

Payload shape:

```/dev/null/course.payload.json#L1-5
{
  "title": "Math 101",
  "description": "Intro math course",
  "max_capacity": 30
}
```

### Enrollments

- `POST /api/enrollments` – enroll a student

```/dev/null/enroll.payload.json#L1-4
{
  "student_id": 1,
  "course_id": 2
}
```

Enrollment checks course capacity before inserting.

## Database Schema

This project expects the following tables:

```/dev/null/schema.sql#L1-30
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    grade INT NOT NULL CHECK (grade >= 0 AND grade <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    max_capacity INT NOT NULL CHECK (max_capacity > 1)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

## Scripts

- `pnpm dev` – start dev server
- `pnpm build` – build for production
- `pnpm start` – run production build
- `pnpm lint` – run ESLint
- `scripts/test.sh` – create random students/courses and enroll them (requires `jq`; run `bash scripts/test.sh`)

## Notes

- API responses follow a consistent `{ success, data?, message?, error? }` shape.
- All API input is validated with Zod.
