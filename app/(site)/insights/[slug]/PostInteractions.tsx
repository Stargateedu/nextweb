"use client";

import { useState, FormEvent } from "react";

const gold = "#D4AF37";
const ink = "#121214";
const muted = "#5a5a5c";
const silver = "#B8B8B8";
const border = "#EDEAE3";
const cream = "#F5F1EB";
const danger = "#AA3333";

type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

type Props = {
  slug: string;
  initialLikes: number;
  initialDislikes: number;
  initialComments: Comment[];
};

export default function PostInteractions({
  slug,
  initialLikes,
  initialDislikes,
  initialComments,
}: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [voted, setVoted] = useState<"like" | "dislike" | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleVote(type: "like" | "dislike") {
    if (voted) return;
    const res = await fetch(`/api/posts/${slug}/${type}`, { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setLikes(data.likes);
    setDislikes(data.dislikes);
    setVoted(type);
  }

  async function handleComment(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    const res = await fetch(`/api/posts/${slug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), content: content.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      setName("");
      setContent("");
    }
    setSubmitting(false);
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
      {/* LIKE / DISLIKE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "24px 0",
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          marginBottom: 40,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: muted }}>
          Was this helpful?
        </span>
        <button
          onClick={() => handleVote("like")}
          disabled={voted !== null}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            border: `1px solid ${voted === "like" ? gold : border}`,
            borderRadius: 6,
            background: voted === "like" ? `${gold}15` : "transparent",
            color: voted === "like" ? gold : ink,
            fontSize: 14,
            fontWeight: 600,
            cursor: voted ? "default" : "pointer",
            opacity: voted && voted !== "like" ? 0.4 : 1,
            transition: "all 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
          {likes}
        </button>
        <button
          onClick={() => handleVote("dislike")}
          disabled={voted !== null}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            border: `1px solid ${voted === "dislike" ? danger : border}`,
            borderRadius: 6,
            background: voted === "dislike" ? `${danger}15` : "transparent",
            color: voted === "dislike" ? danger : ink,
            fontSize: 14,
            fontWeight: 600,
            cursor: voted ? "default" : "pointer",
            opacity: voted && voted !== "dislike" ? 0.4 : 1,
            transition: "all 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10zM17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
          </svg>
          {dislikes}
        </button>
      </div>

      {/* COMMENTS SECTION */}
      <h2
        style={{
          fontSize: 20,
          fontWeight: 800,
          margin: "0 0 24px",
          color: ink,
        }}
      >
        Comments ({comments.length})
      </h2>

      {/* COMMENT FORM */}
      <form
        onSubmit={handleComment}
        style={{
          background: cream,
          padding: 24,
          marginBottom: 32,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px 14px",
            border: `1px solid ${border}`,
            borderRadius: 4,
            fontSize: 14,
            outline: "none",
            background: "#fff",
            color: ink,
          }}
        />
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          style={{
            padding: "10px 14px",
            border: `1px solid ${border}`,
            borderRadius: 4,
            fontSize: 14,
            outline: "none",
            resize: "vertical",
            background: "#fff",
            color: ink,
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            alignSelf: "flex-start",
            padding: "10px 24px",
            background: gold,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 700,
            cursor: submitting ? "wait" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* COMMENT LIST */}
      {comments.length === 0 ? (
        <p style={{ fontSize: 14, color: muted }}>
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "20px 0",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: gold,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: ink }}>
                  {c.name}
                </span>
                <span style={{ fontSize: 12, color: silver }}>
                  {timeAgo(c.createdAt)}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: ink,
                  margin: 0,
                  paddingLeft: 42,
                }}
              >
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
