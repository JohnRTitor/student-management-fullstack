"use client";
import {
  patchStudentSchema,
  Student,
} from "@/backend/modules/student/student.schema";
import { ApiSuccessResponse } from "@/backend/utils/response";
import { useFetch } from "@/hooks/use-fetch";
import { FiEdit } from "react-icons/fi";

type EditStudentProps = {
  id: number;
  field: "name" | "email" | "grade";
  value: string;
  onSuccess: () => void;
};

export default function EditStudent({
  id,
  field,
  value,
  onSuccess,
}: EditStudentProps) {
  const { execute } = useFetch<ApiSuccessResponse<Student>>(
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
    const payload = { [field]: newValue };

    const result = patchStudentSchema.safeParse(payload);

    if (!result.success) {
      alert(
        "Validation failed: " +
          result.error.issues.map((err) => err.message).join(", "),
      );
      return;
    }

    const response = await execute({
      options: {
        body: JSON.stringify(payload),
      },
    });

    if (!response?.success) {
      alert(`Failed to update ${field}: ${response?.message}`);
    }

    if (response && response.success) {
      alert(`${field} updated successfully`);
      onSuccess();
    }
  };

  return (
    <button onClick={handleEdit} className="text-blue-400 hover:text-blue-200">
      <FiEdit />
    </button>
  );
}
