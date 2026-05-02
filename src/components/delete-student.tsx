"use client";

import { useFetch } from "@/hooks/use-fetch";

type DeleteStudentProps = {
  id: number;
};

export default function DeleteStudentButton({ id }: DeleteStudentProps) {
  const { execute, isLoading, error } = useFetch(
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

    await execute();
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
