"use client";

import { useActionState } from "react";
import {
  updateProfileAction,
  changePasswordAction,
  signOutAction,
  type ProfileResult,
} from "@/lib/actions/auth";
import { colors } from "@/lib/theme";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 14,
  border: `1px solid ${colors.border}`,
  background: "#fff",
  color: colors.ink,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.5,
  color: colors.ink,
  marginBottom: 6,
  textTransform: "uppercase",
};

const btnStyle: React.CSSProperties = {
  padding: "12px 28px",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: "uppercase",
  background: colors.ink,
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

function Message({ result }: { result: ProfileResult }) {
  if (result.error) {
    return (
      <div
        style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: colors.danger,
          fontSize: 13,
          fontWeight: 500,
          padding: "10px 14px",
          marginBottom: 16,
        }}
      >
        {result.error}
      </div>
    );
  }
  if (result.success) {
    return (
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          color: "#166534",
          fontSize: 13,
          fontWeight: 500,
          padding: "10px 14px",
          marginBottom: 16,
        }}
      >
        {result.success}
      </div>
    );
  }
  return null;
}

export default function ProfileForms({ name }: { name: string }) {
  const [profileState, profileAction, profilePending] = useActionState<ProfileResult, FormData>(
    updateProfileAction,
    {}
  );
  const [passwordState, passwordAction, passwordPending] = useActionState<ProfileResult, FormData>(
    changePasswordAction,
    {}
  );

  return (
    <>
      {/* Update Name */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: colors.ink,
            margin: "0 0 20px",
            paddingBottom: 12,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          Update Name
        </h2>
        <form action={profileAction}>
          <Message result={profileState} />
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="name" style={labelStyle}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={name}
              style={inputStyle}
            />
          </div>
          <button type="submit" disabled={profilePending} style={{ ...btnStyle, opacity: profilePending ? 0.6 : 1 }}>
            {profilePending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Change Password */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: colors.ink,
            margin: "0 0 20px",
            paddingBottom: 12,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          Change Password
        </h2>
        <form action={passwordAction}>
          <Message result={passwordState} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label htmlFor="currentPassword" style={labelStyle}>
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                placeholder="Enter current password"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="newPassword" style={labelStyle}>
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                placeholder="At least 6 characters"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" style={labelStyle}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Re-enter new password"
                style={inputStyle}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={passwordPending}
            style={{ ...btnStyle, opacity: passwordPending ? 0.6 : 1, marginTop: 20 }}
          >
            {passwordPending ? "Changing..." : "Change Password"}
          </button>
        </form>
      </section>

      {/* Sign Out */}
      <section
        style={{
          paddingTop: 24,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <form action={signOutAction}>
          <button
            type="submit"
            style={{
              ...btnStyle,
              background: "transparent",
              color: colors.danger,
              border: `1px solid ${colors.danger}`,
            }}
          >
            Sign Out
          </button>
        </form>
      </section>
    </>
  );
}
