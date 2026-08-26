"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "./AdminProvider";
import { signOutAction } from "@/lib/actions/auth";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/posts",
    label: "Blog Posts",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 4h11l5 5v11H4z" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="14" y2="16" />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M14.6 14.3c2.5.3 4.4 2.5 4.4 5.2" />
      </svg>
    ),
  },
  {
    href: "/admin/agents",
    label: "Agents",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3 L20 6 V12 C20 17 16.5 20 12 21 C7.5 20 4 17 4 12 V6 Z" />
        <polyline points="9,12 11.5,14.5 15.5,10" />
      </svg>
    ),
  },
  {
    href: "/admin/courses",
    label: "Courses",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4 L22 9 L12 14 L2 9 Z" />
        <path d="M6 11 V16 C6 17 9 18 12 18 C15 18 18 17 18 16 V11" />
      </svg>
    ),
  },
  {
    href: "/admin/submissions",
    label: "Submissions",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" />
        <polyline points="3,7 12,13 21,7" />
      </svg>
    ),
    badge: true,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { unreadCount } = useAdmin();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[200px] flex-shrink-0 bg-ink text-white flex flex-col py-6.5">
      {/* Logo */}
      <div className="flex flex-col items-center px-6 pb-7 border-b border-[#2a2a2c]">
        <img src="/images/footerlogo.png" alt="Stargate logo" className="w-[140px] h-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 px-3 py-5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-semibold tracking-[0.4px] transition-colors ${
                active ? "bg-gold text-ink" : "text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && unreadCount > 0 && (
                <span className="bg-gold text-ink text-[10px] font-extrabold px-1.5 py-0.5 min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-5 px-6 border-t border-[#2a2a2c] flex flex-col gap-3.5">
        <Link href="/" className="text-xs font-semibold tracking-[0.5px] text-silver hover:text-white transition-colors">
          &larr; View public site
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="text-left text-xs font-bold tracking-[0.5px] text-gold hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            SIGN OUT
          </button>
        </form>
      </div>
    </aside>
  );
}
