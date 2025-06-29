import React from "react";

export default function CourseSelect({ courses, value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="course" className="block text-sm font-medium text-gray-700">
        Curso
      </label>
      <select
        id="course"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="mt-1 block w-full border rounded p-2"
      >
        <option value="">-- Elige un curso --</option>
        {courses.map(c => (
          <option key={c.id_course} value={c.id_course}>
            {c.name_course}
          </option>
        ))}
      </select>
    </div>
  );
}
