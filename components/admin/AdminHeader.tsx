"use client";

import { usePathname } from "next/navigation";
import { getInitials } from "@/lib/admin-data";

const pageMeta: Record<string, [string, string]> = {
  "/admin": ["Dashboard", "Overview of activity across Stargate Education Consultants"],
  "/admin/posts": ["Blog Posts", "Create, edit, and publish insight articles"],
  "/admin/users": ["Users", "Manage student, agent, and administrator accounts"],
  "/admin/agents": ["Agents", "Review and approve partner agent applications"],
  "/admin/courses": ["Courses", "Maintain the UK course catalogue"],
  "/admin/submissions": ["Form Submissions", "Contact enquiries, applications, and agent requests"],
};

const adminName = "Eleanor Reyes";

export default function AdminHeader() {
  const pathname = usePathname();
  const [title, sub] = pageMeta[pathname] ?? ["Admin", ""];

  return (
    <header className="bg-white border-b border-border px-8 py-5 flex items-center justify-between gap-6">
      <div>
        <h1 className="text-[22px] font-extrabold m-0">{title}</h1>
        <p className="text-xs text-silver mt-1 tracking-[0.4px] m-0">{sub}</p>
      </div>
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-full bg-ink text-gold flex items-center justify-center text-[13px] font-extrabold">
          {getInitials(adminName)}
        </div>
        <div>
          <div className="text-[13px] font-bold">{adminName}</div>
          <div className="text-[11px] text-silver tracking-[0.4px]">ADMINISTRATOR</div>
        </div>
      </div>
    </header>
  );
}
