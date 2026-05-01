"use client";
import { useEffect, useState } from "react";
import SortIcon from "@/components/sort-icon";
import Loader from "@/components/loader";
import { Student } from "@/backend/modules/student/student.schema";
import AddStudent from "@/components/add-student";

export default function StudentDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [searchString, setSearchString] = useState("");
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending",
  );
  const [sortKey, setSortKey] = useState<"id" | "name" | "email" | "grade">(
    "id",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSort = () => {
    if (sortOrder === "ascending") {
      setSortOrder("descending");
    } else {
      setSortOrder("ascending");
    }
    const sortedData = [...studentsData].sort((a, b) => {
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
          ? a.grade.localeCompare(b.grade)
          : b.grade.localeCompare(a.grade);
      } else {
        return sortOrder === "ascending"
          ? a[sortKey] - b[sortKey]
          : b[sortKey] - a[sortKey];
      }
    });
    setStudentsData(sortedData);
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteStudent = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      if (!deleteStudent.ok) {
        throw new Error("Failed to delete student");
      }
      setStudentsData(studentsData.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    fetch("/api/students")
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Fetched data:", responseData);
        setStudentsData(responseData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch student data");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!studentsData) return <div>Student data is null</div>;

  return (
    <div className="bg-pink-800 min-h-screen">
      <h1 className="underline text-5xl py-10 text-cyan-500 font-bold flex justify-center">
        Student Dashboard
      </h1>
      <br />
      <br />
      <div className="px-50 grid grid-cols-2 gap-10">
        <div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="px-5">
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
            {studentsData
              .filter((student) =>
                student.name.toLowerCase().includes(searchString.toLowerCase()),
              )
              .map((student, index) => (
                <tr key={index} className="bg-teal-800">
                  <td className="border-2 px-4 py-2 text-center">
                    {student.id}
                  </td>
                  <td className="border-2 px-4 py-2">{student.name}</td>
                  <td className="border-2 px-4 py-2">{student.email}</td>
                  <td className="border-2 px-4 py-2 text-center">
                    {student.grade}
                  </td>
                  <td className="border-2 px-4 py-2 text-center bg-slate-800">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="border-1 rounded-md px-3 bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showAddForm && <AddStudent />}
    </div>
  );
}
