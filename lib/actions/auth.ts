"use server";

import { redirect } from "next/navigation";
import { hash, compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/auth";

export type AuthResult = { error?: string };

export async function loginAction(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect(user.role === "ADMIN" ? "/admin" : "/");
}

export async function registerAction(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const hashed = await hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "STUDENT" },
  });

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/");
}

export type ProfileResult = { error?: string; success?: string };

export async function updateProfileAction(_prev: ProfileResult, formData: FormData): Promise<ProfileResult> {
  const { getSession, createSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) redirect("/login");

  const name = (formData.get("name") as string).trim();
  if (!name) return { error: "Name is required." };

  await prisma.user.update({
    where: { id: session.userId },
    data: { name },
  });

  await createSession({ ...session, name });
  return { success: "Name updated successfully." };
}

export async function changePasswordAction(_prev: ProfileResult, formData: FormData): Promise<ProfileResult> {
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) redirect("/login");

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword) return { error: "All fields are required." };
  if (newPassword.length < 6) return { error: "New password must be at least 6 characters." };
  if (newPassword !== confirmPassword) return { error: "New passwords do not match." };

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return { error: "User not found." };

  const valid = await compare(currentPassword, user.password);
  if (!valid) return { error: "Current password is incorrect." };

  const hashed = await hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.userId },
    data: { password: hashed },
  });

  return { success: "Password changed successfully." };
}

export async function signOutAction() {
  await deleteSession();
  redirect("/login");
}
