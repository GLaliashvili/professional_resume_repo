import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, BlogPost } from "../lib/notion";
import { Badge } from "../components/ui/badge";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<{ post: BlogPost; markdown: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getPost(slug)
      .then((result) => {
        if (!result) setError("Article not found.");
        else setData(result);
      })
      .catch(() => setError("Couldn't load this article."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-16">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        {loading && (
          <p className="text-muted-foreground text-sm">Loading...</p>
        )}

        {error && (
          <p className="text-muted-foreground text-sm">{error}</p>
        )}

        {data && (
          <>
            <div className="mb-10">
              <h1 className="text-2xl font-semibold mb-3">{data.post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                {data.post.published && (
                  <time>
                    {new Date(data.post.published).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
              {data.post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="prose prose-neutral max-w-none text-sm leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.markdown}
              </ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
