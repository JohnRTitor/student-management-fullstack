"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newStudent = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, grade: grade }),
      });

      const responseData = await newStudent.json();
      console.log("Added student:", responseData);
      router.refresh();
    } catch (error) {
      console.error("Error adding student:", error);
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
      </form>
    </div>
  );
}
