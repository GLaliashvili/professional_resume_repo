import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: string;
  tags: string[];
  excerpt: string;
}

export async function getPosts(): Promise<BlogPost[]> {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text ?? "",
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    published: page.properties.Published?.date?.start ?? "",
    tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? [],
    excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text ?? "",
  }));
}

export async function getPost(
  slug: string
): Promise<{ post: BlogPost; markdown: string } | null> {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (!response.results.length) return null;

  const page = response.results[0] as any;
  const post: BlogPost = {
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text ?? "",
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    published: page.properties.Published?.date?.start ?? "",
    tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? [],
    excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text ?? "",
  };

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(mdblocks).parent;

  return { post, markdown };
}
