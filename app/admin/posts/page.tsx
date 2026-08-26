"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "PUBLISHED" | "DRAFT";
  excerpt: string;
  content: string | null;
  imageUrl: string | null;
  createdAt: string;
  author: { name: string };
};

type Draft = {
  slug?: string;
  title: string;
  category: string;
  status: "PUBLISHED" | "DRAFT";
  excerpt: string;
  content: string;
  coverImage: string;
  coverPreview: string;
};

const categories = ["Admissions", "Visa", "Funding", "Test Prep", "Life Abroad"];

const emptyDraft: Draft = {
  title: "",
  category: "Admissions",
  status: "DRAFT",
  excerpt: "",
  content: "",
  coverImage: "",
  coverPreview: "",
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function startEdit(post: Post) {
    setEditing({
      slug: post.slug,
      title: post.title,
      category: post.category,
      status: post.status,
      excerpt: post.excerpt,
      content: post.content || "",
      coverImage: "",
      coverPreview: post.imageUrl || "",
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setEditing({ ...editing, coverImage: base64, coverPreview: base64 });
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!editing || !editing.title.trim()) return;
    setSaving(true);

    const payload: Record<string, string> = {
      title: editing.title,
      category: editing.category,
      status: editing.status,
      excerpt: editing.excerpt,
      content: editing.content,
    };
    if (editing.coverImage) {
      payload.coverImage = editing.coverImage;
    }

    if (editing.slug) {
      const res = await fetch(`/api/posts/${editing.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { await fetchPosts(); setEditing(null); }
    } else {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) { await fetchPosts(); setEditing(null); }
    }
    setSaving(false);
  }

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  async function toggleStatus(post: Post) {
    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const res = await fetch(`/api/posts/${post.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, status: newStatus } : p));
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  if (loading) {
    return <div className="text-center py-12 text-muted text-sm">Loading posts...</div>;
  }

  return (
    <div className={`grid gap-5 items-start ${editing ? "grid-cols-[1.4fr_1fr]" : "grid-cols-1"}`}>
      <div className="bg-white border border-border">
        <div className="px-6 py-4.5 border-b border-border flex items-center justify-between gap-4">
          <span className="text-[13px] font-extrabold tracking-[0.6px]">ALL POSTS ({posts.length})</span>
          <button
            onClick={() => setEditing({ ...emptyDraft })}
            className="bg-ink text-white px-4.5 py-2 text-[11px] font-bold tracking-[0.8px] border-none cursor-pointer hover:bg-gold hover:text-ink transition-colors"
          >
            + NEW POST
          </button>
        </div>

        <div className="grid grid-cols-[2.4fr_1fr_0.9fr_0.9fr_0.9fr] gap-4 px-6 py-3 bg-cream/50 text-[10px] font-extrabold tracking-[1px] text-silver">
          <span>TITLE</span>
          <span>CATEGORY</span>
          <span>STATUS</span>
          <span>DATE</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted text-sm">No posts yet.</div>
        ) : (
          posts.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[2.4fr_1fr_0.9fr_0.9fr_0.9fr] gap-4 px-6 py-4 border-b border-[#F3F1EC] items-center text-[13px]"
            >
              <div>
                <span className="font-semibold">{row.title}</span>
                {row.imageUrl && (
                  <span className="ml-2 text-[10px] text-gold font-bold">📷</span>
                )}
              </div>
              <span className="text-muted text-xs">{row.category}</span>
              <span>
                <button
                  onClick={() => toggleStatus(row)}
                  className="text-[10px] font-extrabold tracking-[0.8px] px-2 py-1 border-none cursor-pointer"
                  style={{
                    background: row.status === "PUBLISHED" ? "#121214" : "#F5F1EB",
                    color: row.status === "PUBLISHED" ? "#D4AF37" : "#5a5a5c",
                  }}
                >
                  {row.status}
                </button>
              </span>
              <span className="text-silver text-xs">{formatDate(row.createdAt)}</span>
              <span className="flex gap-3.5 justify-end">
                <button
                  onClick={() => startEdit(row)}
                  className="text-[11px] font-bold text-ink border-b border-ink bg-transparent p-0 cursor-pointer hover:text-gold hover:border-gold transition-colors"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(row.slug, row.title)}
                  className="text-[11px] font-bold text-danger border-b border-danger bg-transparent p-0 cursor-pointer hover:opacity-70 transition-opacity"
                >
                  DELETE
                </button>
              </span>
            </div>
          ))
        )}
      </div>

      {editing && (
        <div className="bg-white border border-border p-6">
          <div className="text-[13px] font-extrabold tracking-[0.6px] mb-5">
            {editing.slug ? "EDIT POST" : "NEW POST"}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-bold tracking-[0.6px] mb-1.5 block">TITLE</label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full p-2.5 border border-silver text-[13px] outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-[0.6px] mb-1.5 block">CATEGORY</label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full p-2.5 border border-silver text-[13px] bg-white outline-none focus:border-gold transition-colors"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-[0.6px] mb-1.5 block">COVER IMAGE</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="bg-cream text-ink px-4 py-2 text-[11px] font-bold tracking-[0.6px] border border-border cursor-pointer hover:border-gold transition-colors"
                >
                  CHOOSE FILE
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {editing.coverPreview && (
                  <button
                    type="button"
                    onClick={() => setEditing({ ...editing, coverImage: "", coverPreview: "" })}
                    className="text-[11px] font-bold text-danger bg-transparent border-none cursor-pointer hover:opacity-70"
                  >
                    REMOVE
                  </button>
                )}
              </div>
              {editing.coverPreview && (
                <div className="mt-3 border border-border">
                  <img
                    src={editing.coverPreview}
                    alt="Cover preview"
                    className="w-full h-[140px] object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-[0.6px] mb-1.5 block">EXCERPT</label>
              <textarea
                rows={3}
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                className="w-full p-2.5 border border-silver text-[13px] resize-y outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-[0.6px] mb-1.5 block">CONTENT</label>
              <textarea
                rows={10}
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                placeholder="Write the full article content here (HTML supported)..."
                className="w-full p-2.5 border border-silver text-[13px] resize-y outline-none focus:border-gold transition-colors font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-[0.6px] mb-1.5 block">STATUS</label>
              <select
                value={editing.status}
                onChange={(e) => setEditing({ ...editing, status: e.target.value as "PUBLISHED" | "DRAFT" })}
                className="w-full p-2.5 border border-silver text-[13px] bg-white outline-none focus:border-gold transition-colors"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-ink text-white px-5.5 py-3 text-[11px] font-bold tracking-[0.8px] border-none cursor-pointer hover:bg-gold hover:text-ink transition-colors disabled:opacity-50"
              >
                {saving ? "SAVING..." : "SAVE POST"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="border border-silver text-muted px-5.5 py-3 text-[11px] font-bold tracking-[0.8px] bg-transparent cursor-pointer hover:border-ink hover:text-ink transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
