import React, { useState } from "react";
import { useCourses } from "../api/useCourses";
import CourseSelect from "../components/courseSelect";

export default function EducatorDashboard() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: courses = [], isLoading, isError } = useCourses();

  if (isLoading) return <p className="p-4">Cargando cursos…</p>;
  if (isError)   return <p className="p-4 text-red-500">Error cargando cursos.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nueva Actividad</h1>

      <CourseSelect
        courses={courses}
        value={selectedCourse}
        onChange={setSelectedCourse}
      />

      <p className="mt-4 text-gray-600">
        Curso seleccionado: {selectedCourse || "ninguno"}
      </p>
    </div>
  );
}
