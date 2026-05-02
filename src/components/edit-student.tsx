"use client";
import { FiEdit } from "react-icons/fi";

type EditStudentProps = {
  id: number;
  field: "name" | "email" | "grade";
  value: string;
};

export default function EditStudent({ id, field, value }: EditStudentProps) {
  const handleEdit = async () => {
    const newValue = prompt(`Enter new ${field}`, value);
    if (newValue === null || newValue.trim() === "") {
      return;
    }
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }
      alert(`${field} updated successfully`);
      const updatedStudentData = await response.json();
      if (!updatedStudentData.success) {
        throw new Error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <button onClick={handleEdit} className="text-blue-400 hover:text-blue-200">
      <FiEdit />
    </button>
  );
}
