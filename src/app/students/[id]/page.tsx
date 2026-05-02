"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/use-fetch";
import { ApiSuccessResponse } from "@/backend/utils/response";
import { Student } from "@/backend/modules/student/student.schema";
import Loader from "@/components/ui/loader";

export default function StudentDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, error } = useFetch<ApiSuccessResponse<Student>>(
    `/api/students/${id}`,
    {},
    undefined,
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
    </div>
  );
}
