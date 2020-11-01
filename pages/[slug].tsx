import { createElement, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import Markdown from "react-markdown/with-html";

import { Post } from "../src/types";
import Input from "../src/components/Input/Input";
import Button from "../src/components/Button/Button";

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

function getTextContent(props): string[] {
  if (Array.isArray(props.children)) {
    return props.children.map((child) => getTextContent(child.props));
  } else if (typeof props.children === "string") {
    return [props.children];
  }
}

function Heading(props) {
  const text = getTextContent(props)
    .flat()
    .join(" ");
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z-]/g, "");

  return createElement(`h${props.level}`, { id: slug }, props.children);
}

const renderers = {
  heading: Heading,
};

function encodeTitle(title) {
  return title
    .replace(/[^a-z0-9_-]/gi, "-")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

export default function PostPage(props: Post) {
  const { body, title, description, date, slug, hasTweetEmbed } = props;
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
          content={`https://rdjpalmer.com/open-graph/${encodeTitle(title)}.png`}
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
        {hasTweetEmbed && (
          <script async src="https://platform.twitter.com/widgets.js" />
        )}
      </Head>
      <div>
        <Link href="/">
          <a className="all-posts">
            <span>All posts</span>
          </a>
        </Link>
        <article>
          <h1>{title}</h1>
          <time dateTime={date}>{date}</time>
          <main ref={mainRef} className="blog">
            <Markdown source={body} escapeHtml={false} renderers={renderers} />
          </main>
        </article>
        <footer className="newsletter-footer">
          <form
            action="https://rdjpalmer.us20.list-manage.com/subscribe/post?u=0cb4f80ca9869534161bfc334&amp;id=5e488d017e"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
          >
            <h2>Enjoyed what you've read so far?</h2>
            <p>
              Maybe you'll enjoy the next one too.
              <br /> 👉 Sign up to get it straight&nbsp;to&nbsp;your&nbsp;inbox.
            </p>
            <div className="input-group">
              <Input
                name="EMAIL"
                placeholder="youso@nice.co"
                aria-label="Your email"
              />
              <Button>Sign up</Button>
            </div>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_0cb4f80ca9869534161bfc334_5e488d017e"
                tabIndex={-1}
                value=""
                readOnly
              />
            </div>
            <p className="small">
              <small>
                You can unsubscribe at any time, by hitting the unsubscribe link
                at the bottom of the emails you'll receive. I use MailChimp to
                send the emails, so by signing up, your email address will be
                sent to them.
              </small>
            </p>
          </form>
        </footer>
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
      created: date.parseAndFormat(data.created || data.date, "yyyy-MM-dd"),
      updated: date.parseAndFormat(data.updated || data.date, "yyyy-MM-dd"),
      body: content,
      hasTweetEmbed: data.hasTweetEmbed || false,
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
