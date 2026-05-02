"use client";

import { Student } from "@/backend/modules/student/student.schema";
import { ApiSuccessResponse } from "@/backend/utils/response";
import { useFetch } from "@/hooks/use-fetch";

type DeleteStudentProps = {
  id: number;
  onSuccess: () => void;
};

export default function DeleteStudentButton({
  id,
  onSuccess,
}: DeleteStudentProps) {
  const { execute, isLoading, error } = useFetch<ApiSuccessResponse<Student>>(
    `/api/students/${id}`,
    { method: "DELETE" },
    undefined,
    true,
  );

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    const response = await execute();

    if (response && response.success) {
      onSuccess();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border-1 rounded-md px-3 bg-red-700 text-white"
    >
      Delete
    </button>
  );
}
