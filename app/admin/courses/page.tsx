"use client";

import { useAdmin } from "@/components/admin/AdminProvider";

export default function CoursesPage() {
  const { courses, addCourse, deleteCourse } = useAdmin();

  return (
    <div className="bg-white border border-border">
      <div className="px-6 py-4.5 border-b border-border flex items-center justify-between gap-4">
        <span className="text-[13px] font-extrabold tracking-[0.6px]">COURSE CATALOGUE ({courses.length})</span>
        <button
          onClick={() =>
            addCourse({ title: "New Course", university: "TBC", level: "Masters", fee: "£—", intake: "Sep 2027" })
          }
          className="bg-ink text-white px-4.5 py-2 text-[11px] font-bold tracking-[0.8px] border-none cursor-pointer hover:bg-gold hover:text-ink transition-colors"
        >
          + ADD COURSE
        </button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[1.8fr_1.5fr_0.9fr_0.9fr_0.9fr_0.7fr] gap-4 px-6 py-3 bg-cream/50 text-[10px] font-extrabold tracking-[1px] text-silver">
        <span>COURSE</span>
        <span>UNIVERSITY</span>
        <span>LEVEL</span>
        <span>TUITION</span>
        <span>INTAKE</span>
        <span className="text-right">ACTION</span>
      </div>

      {courses.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[1.8fr_1.5fr_0.9fr_0.9fr_0.9fr_0.7fr] gap-4 px-6 py-4 border-b border-[#F3F1EC] items-center text-[13px]"
        >
          <span className="font-semibold">{row.title}</span>
          <span className="text-muted text-xs">{row.university}</span>
          <span className="text-muted text-xs">{row.level}</span>
          <span className="font-semibold text-xs">{row.fee}</span>
          <span className="text-silver text-xs">{row.intake}</span>
          <span className="text-right">
            <button
              onClick={() => deleteCourse(row.id)}
              className="text-[11px] font-bold text-danger border-b border-danger bg-transparent p-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              DELETE
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
