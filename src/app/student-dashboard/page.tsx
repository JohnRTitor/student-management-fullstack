"use client";
import { useEffect, useState } from "react";
import mockData from "./mock-data.json";

type Student = {
  id: number;
  name: string;
  email: string;
  grade: string;
};

export default function StudentDashboard() {
  const [studentsData, setStudentsData] = useState<Student[] | null>(null);
  useEffect(() => {
    const fetchData = () =>{setStudentsData(mockData);}
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

  if(!studentsData) return <div>Student data is null</div>

  return (
    <div>
  <h1>Student Dashboard</h1><br/>
  <table className="border-collapse border-2">
    <thead>
      <tr className="bg-gray-700">
        <th className="border-2 px-4 py-2">ID</th>
        <th className="border-2 px-4 py-2">Name</th>
        <th className="border-2 px-4 py-2">Email</th>
        <th className="border-2 px-4 py-2">Grade</th>
      </tr>
    </thead>
    <tbody>
      {studentsData.map((student, index) => (
        <tr key={index}>
          <td className="border-2 px-4 py-2 text-center">{student.id}</td>
          <td className="border-2 px-4 py-2">{student.name}</td>
          <td className="border-2 px-4 py-2">{student.email}</td>
          <td className="border-2 px-4 py-2 text-center">{student.grade}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}