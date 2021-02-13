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
      </Head>

      <Markdown source={body} escapeHtml={false} />

      <p>
        If you like what you've read,{" "}
        <Link href="/subscribe" as="/subscribe">
          <a className="subscribe" href="/subscribe">
            subscribe to my newsletter
          </a>
        </Link>
        . You'll get every post, plus some extra goodies, direct to your inbox.
      </p>

      <h2>My Writing</h2>
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
