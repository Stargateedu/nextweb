import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "daniel@stargate-ec.com" },
    update: {},
    create: {
      name: "Daniel Osei",
      email: "daniel@stargate-ec.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create users
  const users = [
    { name: "Amara Okonkwo", email: "amara.o@email.com", role: "STUDENT" as const },
    { name: "Rohan Kapoor", email: "rohan.k@email.com", role: "STUDENT" as const },
    { name: "Chidi Eze", email: "chidi.e@email.com", role: "STUDENT" as const },
    { name: "Sofia Marino", email: "sofia.m@email.com", role: "STUDENT" as const },
    { name: "Leila Haddad", email: "leila@brightpath.ae", role: "AGENT" as const },
  ];

  const defaultPassword = await hash("password123", 12);
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: defaultPassword },
    });
  }

  // Create posts
  const posts = [
    { title: "Top UK Universities for International Students in 2026", slug: "top-uk-universities-2026", category: "Admissions", status: "PUBLISHED" as const, excerpt: "A look at the Russell Group institutions attracting the most international applicants this year." },
    { title: "Understanding the UK Student Visa Process, Step by Step", slug: "uk-student-visa-process", category: "Visa", status: "PUBLISHED" as const, excerpt: "Everything you need to know about the CAS, financial evidence, and interview stage." },
    { title: "Five Scholarships UK-Bound Students Overlook", slug: "five-scholarships-overlooked", category: "Funding", status: "PUBLISHED" as const, excerpt: "Lesser-known funding routes that can significantly offset tuition and living costs." },
    { title: "How to Raise Your IELTS Score in Six Weeks", slug: "raise-ielts-score-six-weeks", category: "Test Prep", status: "PUBLISHED" as const, excerpt: "A study plan our test-prep coaches use with students ahead of deadlines." },
    { title: "Settling In: A First-Term Checklist for New Students", slug: "first-term-checklist", category: "Life Abroad", status: "DRAFT" as const, excerpt: "Practical steps for banking, housing, and healthcare in your first weeks." },
    { title: "Writing a Personal Statement That Stands Out", slug: "personal-statement-guide", category: "Admissions", status: "DRAFT" as const, excerpt: "What admissions officers actually look for, from our head of admissions." },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, authorId: admin.id },
    });
  }

  // Create agents
  const agents = [
    { agentCode: "SG-0001", name: "Leila Haddad", email: "leila@brightpath.ae", phone: "+971501234567", country: "UAE", tier: "OG" as const, status: "APPROVED" as const },
    { agentCode: "SG-0002", name: "Samuel Mensah", email: "sam@accraglobal.com", phone: "+233241234567", country: "Ghana", tier: "GOLD" as const, status: "APPROVED" as const },
    { agentCode: "SG-0003", name: "Nguyen Minh", email: "minh@hanoiedu.vn", phone: "+84901234567", country: "Vietnam", tier: "SILVER" as const, status: "APPROVED" as const },
    { agentCode: "SG-0004", name: "Fatima Bello", email: "fatima@lagosstudybridge.ng", phone: "+2348012345678", country: "Nigeria", tier: "BRONZE" as const, status: "APPROVED" as const },
    { agentCode: "SG-0005", name: "Arjun Patel", email: "arjun@ahmedabadoverseas.in", phone: "+919876543210", country: "India", tier: "BRONZE" as const, status: "APPROVED" as const },
  ];

  for (const a of agents) {
    await prisma.agent.upsert({
      where: { email: a.email },
      update: {},
      create: a,
    });
  }

  // Create courses
  const courses = [
    { title: "MSc Data Science", university: "University of Manchester", level: "Masters", fee: "£28,000", intake: "Sep 2026" },
    { title: "BSc Economics", university: "LSE", level: "Bachelors", fee: "£26,500", intake: "Sep 2026" },
    { title: "MEng Mechanical Engineering", university: "Imperial College London", level: "Masters", fee: "£37,900", intake: "Sep 2026" },
    { title: "LLB Law", university: "University of Bristol", level: "Bachelors", fee: "£24,700", intake: "Jan 2027" },
    { title: "MA International Relations", university: "University of Edinburgh", level: "Masters", fee: "£25,300", intake: "Sep 2026" },
    { title: "BA Architecture", university: "University of Bath", level: "Bachelors", fee: "£25,900", intake: "Sep 2026" },
  ];

  for (const c of courses) {
    await prisma.course.create({ data: c });
  }

  // Create submissions
  const submissions = [
    { type: "STUDENT_APPLICATION" as const, name: "Yuki Tanaka", details: "email: yuki.t@email.com | phone: +81901234567 | dob: 1999-03-15 | gender: Female | address: 2-3-1 Shibuya, Tokyo, Japan | ni_number: N/A | emergency_contact: +81801234567", read: false },
    { type: "CONTACT" as const, name: "Grace Adeyemi", details: "email: grace.a@email.com | phone: +2341234567 | program: Visa Support | message: Do you offer IELTS waivers for students with English-medium education?", read: false },
    { type: "AGENT_ENQUIRY" as const, name: "Samuel Mensah", details: "email: sam@accraglobal.com | phone: +233241234567 | company: Accra Global Education | country: Ghana | experience: 5 years in student recruitment | message: We would like to discuss a partnership for student recruitment in Ghana.", read: false },
    { type: "STUDENT_APPLICATION" as const, name: "Ibrahim Sow", details: "email: ibrahim.s@email.com | phone: +224621234567 | dob: 2000-07-22 | gender: Male | address: Conakry, Guinea | ni_number: N/A | emergency_contact: +224631234567", read: true },
    { type: "CONTACT" as const, name: "Mariam Farouk", details: "email: mariam.f@email.com | phone: +201012345678 | program: Scholarships & Funding | message: Could you share the upcoming scholarship deadlines?", read: true },
    { type: "JOB_APPLICATION" as const, name: "Nguyen Minh", details: "email: minh@hanoiedu.vn | phone: +84901234567 | position: Student Recruitment Officer | experience: 3 years in education consulting | message: Interested in joining the Stargate team.", read: true },
  ];

  for (const s of submissions) {
    await prisma.submission.create({ data: s });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
