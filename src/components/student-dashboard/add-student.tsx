"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/use-fetch";
import { ApiSuccessResponse } from "@/backend/utils/response";
import {
  createStudentSchema,
  Student,
} from "@/backend/modules/student/student.schema";

type AddStudentFormProps = {
  onSuccess: () => void;
};

export default function AddStudentForm({ onSuccess }: AddStudentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [formError, setFormError] = useState<string>("");

  const { execute, isLoading, error } = useFetch<ApiSuccessResponse<Student>>(
    "/api/students",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    undefined,
    true,
  );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const formData = { name, email, grade };
    const result = createStudentSchema.safeParse(formData);

    if (!result.success) {
      setFormError(
        "Validation failed: " +
          result.error.issues.map((err) => err.message).join(", "),
      );
      return;
    }

    const response = await execute({
      options: {
        body: JSON.stringify({ name, email, grade }),
      },
    });

    if (response && response.success) {
      onSuccess();
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form onSubmit={handleSubmit} className="border-2 rounded-lg py-5">
        <label className="px-3">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border-2 mx-2 rounded-lg focus:ring-2 focus:ring-cyan-500"
        />
        <br />
        <br />
        <label className="px-3">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border-2 mx-2 rounded-lg focus:ring-2 focus:ring-cyan-500"
        />
        <br />
        <br />
        <label className="px-3">Grade:</label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value);
          }}
          className="border-2 mx-2 rounded-lg focus:ring-2 focus:ring-cyan-500"
        />
        <br />
        <br />

        <div className="flex justify-center">
          <button
            type="submit"
            className="border-2 rounded-md px-15 py-2 mt-3 bg-green-300 text-black"
          >
            Submit
          </button>
        </div>
        <br />
        {formError && (
          <div className="text-red-500 dark:text-red-300 text-center">
            <p>{formError}</p>
          </div>
        )}
      </form>
    </div>
  );
}
