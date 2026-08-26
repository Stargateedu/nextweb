import type { Metadata } from "next";
import AdminProvider from "@/components/admin/AdminProvider";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Console | Stargate Education Consultants",
  description: "Manage blog posts, users, agents, courses, and form submissions.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-admin-bg">
        <AdminSidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <AdminHeader />
          <div className="p-8 flex-1">{children}</div>
        </div>
      </div>
    </AdminProvider>
  );
}
