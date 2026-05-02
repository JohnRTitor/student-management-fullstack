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
