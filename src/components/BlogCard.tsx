import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../lib/notion";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="flex items-start justify-between gap-8">
        <div>
          <h2 className="font-medium group-hover:text-primary transition-colors mb-1">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
        {post.published && (
          <time className="text-sm text-muted-foreground shrink-0">
            {new Date(post.published).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </time>
        )}
      </div>
    </Link>
  );
}
