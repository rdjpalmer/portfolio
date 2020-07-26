import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import Markdown from "react-markdown/with-html";
import { Post } from "../src/types";

/**
 * @param string
 * @param wordsPerSecond defaults to 200 words/minute
 */
function getEstimatedReadingTime(
  string: string = "",
  wordsPerSecond: number = 3.33
) {
  const wordCount = string.split(" ").length;
  const seconds = wordCount / wordsPerSecond;
  const timestamp = seconds * 1000;

  const [minutes, decimalSeconds] = (seconds / 60)
    .toString()
    .split(".")
    .map((i) => parseInt(i, 10));

  return [minutes, Math.ceil(decimalSeconds * 0.6), timestamp];
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      if (typeof window.fathom !== "undefined") {
        window.fathom.trackGoal("YICYPV5X", 0);
      }
      observer.unobserve(entry.target);
    }
  });
}

export default function PostPage(props: Post) {
  const { body, title, description, date, slug } = props;
  const [minutes] = getEstimatedReadingTime(body);
  const mainRef = useRef(null);

  useEffect(() => {
    if (process.env.ANALYTICS === "true") {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(handleIntersection);
        const last =
          mainRef.current.children.length > 0 &&
          mainRef.current.children[mainRef.current.children.length - 1];

        if (last) {
          observer.observe(last);
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title key="title">
          {title} | Richard Palmer, Creator of Timo and Byozo
        </title>
        <meta name="description" content={description} key="description" />
        <meta name="author" content="Richard Palmer" key="author" />
        <link
          rel="canonical"
          href={`https://rdjpalmer.com${slug}`}
          key="canoncial"
        />
        <meta property="og:title" content={title} key="ogTitle" />
        <meta property="og:site_name" content="rdjpalmer.com" key="ogUrl" />
        <meta
          property="og:url"
          content={`https://rdjpalmer.com${slug}`}
          key="ogUrl"
        />
        <meta
          property="og:description"
          content={description}
          key="ogDescription"
        />
        <meta property="og:type" content="article" key="ogType" />
        <meta
          property="og:image"
          content={`https://og.rdjpalmer.com/${encodeURIComponent(
            title
          )}.png?theme=light&md=0`}
          key="ogImage"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitterCard"
        />
        <meta name="twitter:site" content="@rdjpalmer" key="twitterSite" />
        <meta
          name="twitter:creator"
          content="@rdjpalmer"
          key="twitterCreator"
        />
      </Head>
      <div>
        <Link href="/">
          <a className="all-posts">
            <span>All posts</span>
          </a>
        </Link>
        <h1>{title}</h1>
        <time dateTime={date}>{date}</time>
        <main ref={mainRef} className="blog">
          <Markdown source={body} escapeHtml={false} />
        </main>
        <div className="reading-time">
          {minutes} min{minutes !== 1 && "s"} to read
        </div>
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
      // layout: data.layout,
      title: data.title,
      slug: data.slug,
      description: data.description,
      date: date.parseAndFormat(data.date, "dd MMM yyyy"),
      body: content,
    },
  };
}

export async function getStaticPaths() {
  const path = await import("path");
  const glob = await import("glob");

  //get all .md files in the posts dir
  const blogs = glob.sync(path.resolve("./src/posts/**/*.md"));

  //remove path and extension to leave filename only
  const paths = blogs.map((path) => {
    const segments = path.split("/");
    const filename = segments[segments.length - 1];
    const slug = filename.split(".")[0];
    return `/${slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}
