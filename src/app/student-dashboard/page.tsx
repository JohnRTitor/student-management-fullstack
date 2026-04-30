"use client";
import { useEffect, useState } from "react";
import mockData from "./mock-data.json";
import SortIcon from "@/components/sort-icon";
import Loader from "@/components/loader";

type Student = {
  id: number;
  name: string;
  email: string;
  grade: string;
};

export default function StudentDashboard() {
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

  useEffect(() => {
    const fetchData = () => {
      setStudentsData(mockData);
      setIsLoading(false);
    };

    fetchData();

    // fetch("/student-dashboard/mock-data.json")
    // .then((response) => response.json())
    // .then((responseData) => {console.log("Fetched data:", responseData);
    //     setStudentsData(responseData);
    // })
    // .catch((error) => {
    //     console.error("Error fetching data:", error);
    // })
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!studentsData) return <div>Student data is null</div>;

  return (
    <div>
      <h1>Student Dashboard</h1>
      <br />
      <br />
      <input
        type="text"
        placeholder="Search students..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <br />
      <br />
      <table className="border-collapse border-2">
        <thead>
          <tr className="bg-gray-700">
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
          </tr>
        </thead>
        <tbody>
          {studentsData
            .filter((student) =>
              student.name.toLowerCase().includes(searchString.toLowerCase()),
            )
            .map((student, index) => (
              <tr key={index}>
                <td className="border-2 px-4 py-2 text-center">{student.id}</td>
                <td className="border-2 px-4 py-2">{student.name}</td>
                <td className="border-2 px-4 py-2">{student.email}</td>
                <td className="border-2 px-4 py-2 text-center">
                  {student.grade}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
