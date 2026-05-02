"use client";

import { number } from "zod";

type DeleteStudentProps = {
  id: number;
};

export default function DeleteStudent({ id }: DeleteStudentProps) {
  const handleDelete = async (id: number) => {
    try {
      const deleteStudent = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      if (!deleteStudent.ok) {
        throw new Error("Failed to delete student");
      }
      alert(`${id} ID Student deleted successfully`);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className="border-1 rounded-md px-3 bg-red-700 text-white"
    >
      Delete
    </button>
  );
}
