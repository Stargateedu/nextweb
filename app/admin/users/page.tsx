"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { getInitials, type User } from "@/lib/admin-data";

export default function UsersPage() {
  const { users, updateUserRole, deleteUser } = useAdmin();

  return (
    <div className="bg-white border border-border">
      <div className="px-6 py-4.5 border-b border-border text-[13px] font-extrabold tracking-[0.6px]">
        REGISTERED USERS ({users.length})
      </div>

      {/* Header */}
      <div className="grid grid-cols-[1.4fr_1.8fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 bg-cream/50 text-[10px] font-extrabold tracking-[1px] text-silver">
        <span>NAME</span>
        <span>EMAIL</span>
        <span>ROLE</span>
        <span>JOINED</span>
        <span className="text-right">ACTIONS</span>
      </div>

      {users.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[1.4fr_1.8fr_1fr_1fr_0.8fr] gap-4 px-6 py-3.5 border-b border-[#F3F1EC] items-center text-[13px]"
        >
          <span className="flex items-center gap-2.5 font-semibold">
            <span className="w-[30px] h-[30px] rounded-full bg-cream text-ink flex items-center justify-center text-[11px] font-extrabold shrink-0">
              {getInitials(row.name)}
            </span>
            {row.name}
          </span>
          <span className="text-muted text-xs">{row.email}</span>
          <span>
            <select
              value={row.role}
              onChange={(e) => updateUserRole(row.id, e.target.value as User["role"])}
              className="py-1.5 px-2 border border-border text-[11px] font-bold bg-white outline-none focus:border-gold transition-colors cursor-pointer"
            >
              <option>Student</option>
              <option>Agent</option>
              <option>Admin</option>
            </select>
          </span>
          <span className="text-silver text-xs">{row.joined}</span>
          <span className="text-right">
            <button
              onClick={() => deleteUser(row.id)}
              className="text-[11px] font-bold text-danger border-b border-danger bg-transparent p-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              REMOVE
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
