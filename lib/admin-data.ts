export interface Post {
  id: number;
  title: string;
  category: string;
  status: "Published" | "Draft";
  date: string;
  excerpt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Student" | "Agent" | "Admin";
  joined: string;
}

export interface Agent {
  id: number;
  agentId: string;
  name: string;
  phone: string;
  country: string;
  tier: "OG" | "Gold" | "Silver" | "Bronze";
  status: "approved" | "pending" | "rejected";
}

export interface Course {
  id: number;
  title: string;
  university: string;
  level: string;
  fee: string;
  intake: string;
}

export interface Submission {
  id: number;
  type: "contact" | "apply" | "agent";
  name: string;
  email: string;
  subject: string;
  date: string;
  read: boolean;
}

export const initialPosts: Post[] = [
  { id: 1, title: "Top UK Universities for International Students in 2026", category: "Admissions", status: "Published", date: "Mar 2026", excerpt: "A look at the Russell Group institutions attracting the most international applicants this year." },
  { id: 2, title: "Understanding the UK Student Visa Process, Step by Step", category: "Visa", status: "Published", date: "Feb 2026", excerpt: "Everything you need to know about the CAS, financial evidence, and interview stage." },
  { id: 3, title: "Five Scholarships UK-Bound Students Overlook", category: "Funding", status: "Published", date: "Jan 2026", excerpt: "Lesser-known funding routes that can significantly offset tuition and living costs." },
  { id: 4, title: "How to Raise Your IELTS Score in Six Weeks", category: "Test Prep", status: "Published", date: "Dec 2025", excerpt: "A study plan our test-prep coaches use with students ahead of deadlines." },
  { id: 5, title: "Settling In: A First-Term Checklist for New Students", category: "Life Abroad", status: "Draft", date: "Nov 2025", excerpt: "Practical steps for banking, housing, and healthcare in your first weeks." },
  { id: 6, title: "Writing a Personal Statement That Stands Out", category: "Admissions", status: "Draft", date: "Oct 2025", excerpt: "What admissions officers actually look for, from our head of admissions." },
];

export const initialUsers: User[] = [
  { id: 1, name: "Amara Okonkwo", email: "amara.o@email.com", role: "Student", joined: "Feb 2026" },
  { id: 2, name: "Rohan Kapoor", email: "rohan.k@email.com", role: "Student", joined: "Jan 2026" },
  { id: 3, name: "Chidi Eze", email: "chidi.e@email.com", role: "Student", joined: "Jan 2026" },
  { id: 4, name: "Sofia Marino", email: "sofia.m@email.com", role: "Student", joined: "Dec 2025" },
  { id: 5, name: "Daniel Osei", email: "daniel@stargate-ec.com", role: "Admin", joined: "Aug 2024" },
  { id: 6, name: "Leila Haddad", email: "leila@brightpath.ae", role: "Agent", joined: "Nov 2025" },
];

export const initialAgents: Agent[] = [
  { id: 1, agentId: "SG-0001", name: "Leila Haddad", phone: "+971501234567", country: "UAE", tier: "OG", status: "approved" },
  { id: 2, agentId: "SG-0002", name: "Samuel Mensah", phone: "+233241234567", country: "Ghana", tier: "Gold", status: "approved" },
  { id: 3, agentId: "SG-0003", name: "Nguyen Minh", phone: "+84901234567", country: "Vietnam", tier: "Silver", status: "approved" },
  { id: 4, agentId: "SG-0004", name: "Fatima Bello", phone: "+2348012345678", country: "Nigeria", tier: "Bronze", status: "approved" },
  { id: 5, agentId: "SG-0005", name: "Arjun Patel", phone: "+919876543210", country: "India", tier: "Bronze", status: "approved" },
];

export const initialCourses: Course[] = [
  { id: 1, title: "MSc Data Science", university: "University of Manchester", level: "Masters", fee: "£28,000", intake: "Sep 2026" },
  { id: 2, title: "BSc Economics", university: "LSE", level: "Bachelors", fee: "£26,500", intake: "Sep 2026" },
  { id: 3, title: "MEng Mechanical Engineering", university: "Imperial College London", level: "Masters", fee: "£37,900", intake: "Sep 2026" },
  { id: 4, title: "LLB Law", university: "University of Bristol", level: "Bachelors", fee: "£24,700", intake: "Jan 2027" },
  { id: 5, title: "MA International Relations", university: "University of Edinburgh", level: "Masters", fee: "£25,300", intake: "Sep 2026" },
  { id: 6, title: "BA Architecture", university: "University of Bath", level: "Bachelors", fee: "£25,900", intake: "Sep 2026" },
];

export const initialSubmissions: Submission[] = [
  { id: 1, type: "apply", name: "Yuki Tanaka", email: "yuki.t@email.com", subject: "BA Architecture — Bath, Sep 2026", date: "Aug 22", read: false },
  { id: 2, type: "contact", name: "Grace Adeyemi", email: "grace.a@email.com", subject: "Question about IELTS waivers", date: "Aug 21", read: false },
  { id: 3, type: "agent", name: "Samuel Mensah", email: "sam@accraglobal.com", subject: "Partnership enquiry — Ghana", date: "Aug 20", read: false },
  { id: 4, type: "apply", name: "Ibrahim Sow", email: "ibrahim.s@email.com", subject: "MSc Finance — Warwick, Jan 2027", date: "Aug 19", read: true },
  { id: 5, type: "contact", name: "Mariam Farouk", email: "mariam.f@email.com", subject: "Scholarship deadlines for 2027", date: "Aug 18", read: true },
  { id: 6, type: "agent", name: "Nguyen Minh", email: "minh@hanoiedu.vn", subject: "Agent agreement documents", date: "Aug 17", read: true },
];

export function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function statusChip(status: string): { bg: string; fg: string } {
  if (status === "approved" || status === "Published") return { bg: "#121214", fg: "#D4AF37" };
  if (status === "rejected") return { bg: "#F6E9E9", fg: "#AA3333" };
  return { bg: "#F5F1EB", fg: "#5a5a5c" };
}

export const typeLabels: Record<string, string> = {
  contact: "CONTACT",
  apply: "APPLY",
  agent: "AGENT",
};

export const postCategories = ["Admissions", "Visa", "Funding", "Test Prep", "Life Abroad"];
