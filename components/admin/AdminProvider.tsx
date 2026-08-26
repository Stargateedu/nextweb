"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import {
  type Post, type User, type Agent, type Course, type Submission,
  initialPosts, initialUsers, initialAgents, initialCourses, initialSubmissions,
} from "@/lib/admin-data";

interface AdminState {
  posts: Post[];
  users: User[];
  agents: Agent[];
  courses: Course[];
  submissions: Submission[];
}

interface AdminActions {
  addPost: (post: Omit<Post, "id">) => void;
  updatePost: (id: number, data: Partial<Post>) => void;
  deletePost: (id: number) => void;
  togglePostStatus: (id: number) => void;
  updateUserRole: (id: number, role: User["role"]) => void;
  deleteUser: (id: number) => void;
  updateAgentStatus: (id: number, status: Agent["status"]) => void;
  addAgent: (agent: Omit<Agent, "id">) => void;
  addCourse: (course: Omit<Course, "id">) => void;
  deleteCourse: (id: number) => void;
  toggleSubmissionRead: (id: number) => void;
  deleteSubmission: (id: number) => void;
  unreadCount: number;
}

type AdminCtx = AdminState & AdminActions;

const AdminContext = createContext<AdminCtx | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be inside AdminProvider");
  return ctx;
}

export default function AdminProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dbUnreadCount, setDbUnreadCount] = useState(0);

  useEffect(() => {
    fetch("/api/submissions")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.submissions) {
          setDbUnreadCount(data.submissions.filter((s: { read: boolean }) => !s.read).length);
        }
      })
      .catch(() => {});
  }, []);

  const addPost = useCallback((post: Omit<Post, "id">) => {
    setPosts((prev) => [{ ...post, id: Math.max(0, ...prev.map((p) => p.id)) + 1 }, ...prev]);
  }, []);

  const updatePost = useCallback((id: number, data: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deletePost = useCallback((id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const togglePostStatus = useCallback((id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === "Published" ? "Draft" : "Published" } : p))
    );
  }, []);

  const updateUserRole = useCallback((id: number, role: User["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const updateAgentStatus = useCallback((id: number, status: Agent["status"]) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const addAgent = useCallback((agent: Omit<Agent, "id">) => {
    setAgents((prev) => [{ ...agent, id: Math.max(0, ...prev.map((a) => a.id)) + 1 }, ...prev]);
  }, []);

  const addCourse = useCallback((course: Omit<Course, "id">) => {
    setCourses((prev) => [{ ...course, id: Math.max(0, ...prev.map((c) => c.id)) + 1 }, ...prev]);
  }, []);

  const deleteCourse = useCallback((id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleSubmissionRead = useCallback((id: number) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, read: !s.read } : s)));
  }, []);

  const deleteSubmission = useCallback((id: number) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const unreadCount = dbUnreadCount;

  return (
    <AdminContext.Provider
      value={{
        posts, users, agents, courses, submissions,
        addPost, updatePost, deletePost, togglePostStatus,
        updateUserRole, deleteUser,
        updateAgentStatus, addAgent,
        addCourse, deleteCourse,
        toggleSubmissionRead, deleteSubmission,
        unreadCount,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
