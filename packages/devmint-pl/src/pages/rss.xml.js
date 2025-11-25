import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("posts");
  const sorted = posts.sort((a, b) =>
    a.data.meta.datePublished < b.data.meta.datePublished ? -1 : 1,
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sorted.map((post) => ({
      ...post.data,
      link: post.data.href,
    })),
  });
}
