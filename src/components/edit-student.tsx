"use client";
import { Student } from "@/backend/modules/student/student.schema";
import { ApiSuccessResponse } from "@/backend/utils/response";
import { useFetch } from "@/hooks/use-fetch";
import { FiEdit } from "react-icons/fi";

type EditStudentProps = {
  id: number;
  field: "name" | "email" | "grade";
  value: string;
};

export default function EditStudent({ id, field, value }: EditStudentProps) {
  const { execute } = useFetch<ApiSuccessResponse<Student>, Student>(
    `/api/students/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    },
    undefined,
    true,
  );

  const handleEdit = async () => {
    const newValue = prompt(`Enter new ${field}`, value);
    if (newValue === null || newValue.trim() === "") {
      return;
    }

    await execute({
      options: {
        body: JSON.stringify({ [field]: newValue }),
      },
      transform: (response) => {
        if (!response.success) {
          alert(`Failed to update ${field}: ${response.message}`);
        }

        alert(`${field} updated successfully`);
        return response.data;
      },
    });
  };

  return (
    <button onClick={handleEdit} className="text-blue-400 hover:text-blue-200">
      <FiEdit />
    </button>
  );
}
