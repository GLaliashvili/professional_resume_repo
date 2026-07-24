import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPosts, BlogPost } from "../lib/notion";
import { BlogCard } from "../components/BlogCard";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError("Couldn't load posts. Check back soon."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-16">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          George Laliashvili
        </Link>

        <h1 className="text-2xl font-semibold mb-2">Writing</h1>
        <p className="text-muted-foreground mb-12">
          Things I've built, learned, and thought about.
        </p>

        {loading && (
          <p className="text-muted-foreground text-sm">Loading...</p>
        )}

        {error && (
          <p className="text-muted-foreground text-sm">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-muted-foreground text-sm">
            First article coming soon.
          </p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="space-y-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
