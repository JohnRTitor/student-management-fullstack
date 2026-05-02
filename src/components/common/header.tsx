import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4">
      <h1 className="text-2xl font-bold">Student Management System</h1>
      <nav className="mt-2">
        <Link
          href="/student-dashboard"
          className="text-blue-500 hover:underline"
        >
          Student Dashboard
        </Link>
        <Link href="/courses" className="text-blue-500 hover:underline">
          Courses
        </Link>
      </nav>
    </header>
  );
}
