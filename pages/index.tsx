import Head from "next/head";
import Link from "next/link";
import Markdown from "react-markdown/with-html";

import { PostReference } from "../src/types";
import Input from "../src/components/Input/Input";
import Button from "../src/components/Button/Button";

interface PageProps {
  postList: PostReference[];
  body: string;
}

export default function HomePage(props: PageProps) {
  const { body, postList } = props;

  return (
    <>
      <Head>
        <title>Richard Palmer, Creator of Timo</title>
        <link rel="canonical" href="https://rdjpalmer.com/" key="canonical" />
      </Head>

      <Markdown source={body} escapeHtml={false} />

      <p>
        <Link href="/projects" as="/projects">
          <a href="/projects">Here's what I'm working on now.</a>
        </Link>
      </p>

      <p>
        If you like what you see,{" "}
        <Link href="/subscribe" as="/subscribe">
          <a className="subscribe" href="/subscribe">
            subscribe to my newsletter
          </a>
        </Link>
        .{" "}
        <span className="strike">
          You'll get every post, plus some extra goodies, direct to your inbox.
        </span>{" "}
        Currently on pause.
      </p>

      <h2>Writing</h2>
      <ul className="articles list">
        {postList.map((post) => (
          <li key={post.slug}>
            <Link href="/[slug]" as={post.slug}>
              <a href={post.slug}>{post.title}</a>
            </Link>{" "}
            <time dateTime={post.date}>{post.date}</time>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const page = await import("../src/pages/index.md");
  const matter = require("gray-matter");
  const { content } = matter(page.default);

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);
    const date = require("../src/utils/date");

    const data = keys
      .map(
        (_, index): PostReference => {
          const value = values[index];
          // @ts-ignore
          const { data } = matter(value.default);

          return {
            description: data.description,
            title: data.title,
            date: date.parseAndFormat(data.date, "dd MMM yyyy"),
            slug: data.slug,
            sortBy: date.parseAndFormat(data.date, "T"),
          };
        }
      )
      .sort((a, b) => {
        return b.sortBy - a.sortBy;
      });
    return data;
  })(require.context("../src/posts", true, /\.md$/));

  return {
    props: {
      body: content,
      postList: posts,
    },
  };
}

export const config = { unstable_runtimeJS: false };
