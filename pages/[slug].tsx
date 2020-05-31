import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import Markdown from "react-markdown/with-html";
import { Post } from "../src/types";

export default function PostPage(props: Post) {
  const { body, title, date, slug } = props;

  return (
    <>
      <Head>
        <title>{title} | Richard Palmer, Creator of Byozo and HelloTimo</title>
        <link rel="canonical" href={`https://rdjpalmer.com/${slug}`} />
      </Head>
      <div>
        <Link href="/">
          <a className="all-posts">
            <span>All posts</span>
          </a>
        </Link>
        <h1>{title}</h1>
        <time dateTime={date}>{date}</time>
        <main className="blog">
          <Markdown source={body} escapeHtml={false} />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ ...ctx }): Promise<{ props: Post }> {
  const { slug } = ctx.params;
  const post = await import(`../src/posts/${slug}.md`);
  const date = require("../src/utils/date");

  const { data, content } = matter(post.default);

  return {
    props: {
      layout: data.layout,
      title: data.title,
      slug: data.slug,
      description: data.description,
      date: date.parseAndFormat(data.date, "dd MMM yyyy"),
      body: content,
    },
  };
}

export async function getStaticPaths() {
  const glob = await import("glob");
  //get all .md files in the posts dir
  const blogs = glob.sync("_posts/**/*.md");

  //remove path and extension to leave filename only
  const blogSlugs = blogs.map((file) =>
    file
      .split("/")[1]
      .replace(/ /g, "-")
      .slice(0, -3)
      .trim()
  );

  // create paths with `slug` param
  const paths = blogSlugs.map((slug) => `/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
