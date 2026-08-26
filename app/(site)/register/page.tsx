"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type AuthResult } from "@/lib/actions/auth";
import { colors } from "@/lib/theme";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState<AuthResult, FormData>(registerAction, {});

  return (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -0.5,
              color: colors.ink,
              margin: "0 0 8px",
            }}
          >
            Create Account
          </h1>
          <p style={{ fontSize: 14, color: colors.muted, margin: 0 }}>
            Join Stargate Education Consultants
          </p>
        </div>

        <form action={formAction}>
          {state.error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: colors.danger,
                fontSize: 13,
                fontWeight: 500,
                padding: "12px 16px",
                marginBottom: 20,
              }}
            >
              {state.error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: colors.ink,
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: 14,
                  border: `1px solid ${colors.border}`,
                  background: "#fff",
                  color: colors.ink,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: colors.ink,
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: 14,
                  border: `1px solid ${colors.border}`,
                  background: "#fff",
                  color: colors.ink,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: colors.ink,
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="At least 6 characters"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: 14,
                  border: `1px solid ${colors.border}`,
                  background: "#fff",
                  color: colors.ink,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: colors.ink,
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Re-enter your password"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: 14,
                  border: `1px solid ${colors.border}`,
                  background: "#fff",
                  color: colors.ink,
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              style={{
                width: "100%",
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                background: colors.ink,
                color: "#fff",
                border: "none",
                cursor: pending ? "not-allowed" : "pointer",
                opacity: pending ? 0.6 : 1,
                transition: "opacity 0.2s",
                marginTop: 8,
              }}
            >
              {pending ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: colors.muted,
            marginTop: 28,
          }}
        >
          Already have an account?{" "}
          <Link href="/login" style={{ color: colors.gold, fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
