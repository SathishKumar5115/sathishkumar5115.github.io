// RSS feed at /rss.xml, built only when at least one post is published (PRD R1, R10).
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../config";
import { getPublishedPosts } from "../lib/blog";

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts.length > 0 ? [{ params: { feed: "rss" } }] : [];
}

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: `${site.name} · Writing`,
    description: "Notes on what I learn while building: agents, security and the web.",
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
