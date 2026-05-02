"use client";
import { useState } from "react";
import SortIcon from "@/components/ui/sort-icon";
import Loader from "@/components/ui/loader";
import { Student } from "@/backend/modules/student/student.schema";
import AddStudentForm from "@/components/student-dashboard/add-student";
import EditStudent from "@/components/student-dashboard/edit-student";
import DeleteStudentButton from "@/components/student-dashboard/delete-student";
import { useFetch } from "@/hooks/use-fetch";
import { ApiSuccessResponse } from "@/backend/utils/response";
import Link from "next/link";

export default function StudentDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending",
  );
  const [sortKey, setSortKey] = useState<"id" | "name" | "email" | "grade">(
    "id",
  );
  const {
    data: students,
    execute: refetchStudents,
    isLoading,
    error,
  } = useFetch<ApiSuccessResponse<Student[]>, Student[]>(
    "/api/students",
    {
      method: "GET",
    },
    (response) => response.data,
  );

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!students) return <div>No Student data found.</div>;

  const handleSort = () => {
    if (sortOrder === "ascending") {
      setSortOrder("descending");
    } else {
      setSortOrder("ascending");
    }
  };

  const sortedStudents = students.sort((a, b) => {
    if (sortKey === "name") {
      return sortOrder === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortKey === "email") {
      return sortOrder === "ascending"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortKey === "grade") {
      return sortOrder === "ascending"
        ? a[sortKey] - b[sortKey]
        : b[sortKey] - a[sortKey];
    } else {
      return sortOrder === "ascending"
        ? a[sortKey] - b[sortKey]
        : b[sortKey] - a[sortKey];
    }
  });

  return (
    <div>
      <h1 className="underline text-5xl py-10 text-cyan-500 font-bold flex justify-center">
        Student Dashboard
      </h1>
      <br />
      <br />
      <div className="flex justify-center my-10">
        <div className="flex items-center gap-4 ">
          {" "}
          <input
            type="text"
            placeholder="Search students..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="flex justify-center border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />{" "}
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
            }}
            type="button"
            className="focus:ring-2 focus:ring-cyan-500 border-2 rounded-md px-5 py-2 bg-green-700"
          >
            {showAddForm ? "Close Add Student Form" : "Show Add Student Form"}
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="flex justify-center my-10">
        <table className=" border-collapse border-2">
          <thead>
            <tr className="bg-yellow-700">
              <th
                className="border-2 px-4 py-2"
                onClick={() => {
                  setSortKey("id");
                  handleSort();
                }}
              >
                ID <SortIcon direction={sortKey === "id" ? sortOrder : null} />
              </th>
              <th
                className="border-2 px-4 py-2"
                onClick={() => {
                  setSortKey("name");
                  handleSort();
                }}
              >
                {" "}
                Name{" "}
                <SortIcon direction={sortKey === "name" ? sortOrder : null} />
              </th>
              <th
                className="border-2 px-4 py-2"
                onClick={() => {
                  setSortKey("email");
                  handleSort();
                }}
              >
                Email{" "}
                <SortIcon direction={sortKey === "email" ? sortOrder : null} />
              </th>
              <th
                className="border-2 px-4 py-2"
                onClick={() => {
                  setSortKey("grade");
                  handleSort();
                }}
              >
                Grade{" "}
                <SortIcon direction={sortKey === "grade" ? sortOrder : null} />
              </th>
              <th className="border-2 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents
              .filter((student) =>
                student.name.toLowerCase().includes(searchString.toLowerCase()),
              )
              .map((student, index) => (
                <tr key={index} className="bg-teal-800">
                  <td className="border-2 px-4 py-2 text-center">
                    <Link
                      href={`/students/${student.id}`}
                      className="hover:underline"
                    >
                      {student.id}
                    </Link>
                  </td>
                  <td className="border-2 px-4 py-2">
                    <div className="flex justify-between items-center">
                      {student.name}{" "}
                      <EditStudent
                        id={student.id}
                        field="name"
                        value={student.name}
                        onSuccess={() => refetchStudents()}
                      />
                    </div>
                  </td>
                  <td className="border-2 px-4 py-2">
                    <div className="flex justify-between items-center">
                      {student.email}{" "}
                      <EditStudent
                        id={student.id}
                        field="email"
                        value={student.email}
                        onSuccess={() => refetchStudents()}
                      />
                    </div>
                  </td>
                  <td className="border-2 px-4 py-2 text-center ">
                    <div className="flex justify-between items-center">
                      {student.grade}{" "}
                      <EditStudent
                        id={student.id}
                        field="grade"
                        value={student.grade.toString()}
                        onSuccess={() => refetchStudents()}
                      />
                    </div>
                  </td>
                  <td className="border-2 px-4 py-2 text-center bg-slate-800">
                    <DeleteStudentButton
                      id={student.id}
                      onSuccess={() => refetchStudents()}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showAddForm && <AddStudentForm onSuccess={() => refetchStudents()} />}
    </div>
  );
}
