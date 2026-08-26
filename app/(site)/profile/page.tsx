import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { colors } from "@/lib/theme";
import ProfileForms from "./ProfileForms";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const initials = session.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleLabel = session.role === "ADMIN" ? "Administrator" : session.role === "AGENT" ? "Agent" : "Student";

  return (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        padding: "60px 24px",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
        <div
          style={{
            width: 64,
            height: 64,
            background: colors.ink,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.ink, margin: "0 0 4px" }}>
            {session.name}
          </h1>
          <p style={{ fontSize: 13, color: colors.muted, margin: "0 0 2px" }}>{session.email}</p>
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              background: session.role === "ADMIN" ? colors.gold : colors.cream,
              color: session.role === "ADMIN" ? colors.ink : colors.muted,
              padding: "3px 10px",
            }}
          >
            {roleLabel}
          </span>
        </div>
      </div>

      <ProfileForms name={session.name} />
    </div>
  );
}
