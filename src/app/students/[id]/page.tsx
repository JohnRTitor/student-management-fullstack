"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/use-fetch";
import { ApiSuccessResponse } from "@/backend/utils/response";
import type { Student } from "@/backend/modules/student/student.schema";
import type { EnrollmentDetail } from "@/backend/modules/enrollment/enrollment.schema";
import Loader from "@/components/ui/loader";

export default function StudentDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, error } = useFetch<ApiSuccessResponse<Student>>(
    `/api/students/${id}`,
    {},
    undefined,
  );

  const {
    data: enrollmentData,
    isLoading: isEnrollmentLoading,
    error: enrollmentError,
  } = useFetch<ApiSuccessResponse<EnrollmentDetail[]>, EnrollmentDetail[]>(
    `/api/students/${id}/enrollments`,
    {
      method: "GET",
    },
    (response) => response.data,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  if (!data?.data) {
    return <p className="text-center mt-10">Student not found</p>;
  }

  const student = data.data;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>
        <b>ID:</b> {student.id}
      </p>
      <p>
        <b>Name:</b> {student.name}
      </p>
      <p>
        <b>Email:</b> {student.email}
      </p>
      <p>
        <b>Grade:</b> {student.grade}
      </p>
      <p>
        <b>Created At:</b> {new Date(student.created_at).toLocaleString()}
      </p>

      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center">Enrollments</h2>
        {isEnrollmentLoading && (
          <p className="text-center mt-2">Loading enrollments...</p>
        )}
        {enrollmentError && (
          <p className="text-center mt-2 text-red-500">
            Error: {enrollmentError}
          </p>
        )}
        {!isEnrollmentLoading && !enrollmentError && (
          <>
            {enrollmentData && enrollmentData.length > 0 ? (
              <ul className="space-y-3 mt-3">
                {enrollmentData.map((course) => (
                  <li key={course.course_id} className="border rounded-md p-3">
                    <p>
                      <b>Course:</b> {course.title}
                    </p>
                    <p>
                      <b>Description:</b> {course.description}
                    </p>
                    <p>
                      <b>Max Capacity:</b> {course.max_capacity}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center mt-2 text-gray-500">
                No enrollments found
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
