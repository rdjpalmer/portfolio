import Head from "next/head";
import Link from "next/link";

import { PostReference } from "../src/types";

interface PageProps {
  postList: PostReference[];
  statusCode: string | number;
}

export default function ErrorPage(props: PageProps) {
  const { statusCode, postList } = props;

  return (
    <>
      <Head>
        <title>
          {statusCode} | Richard Palmer, Creator of Byozo and HelloTimo
        </title>
      </Head>
      <h1>{statusCode}</h1>
      <p>
        <Link href="/">
          <a>Head home</a>
        </Link>
        , or check out some of my writing{" "}
        <span role="img" aria-label="below">
          👇
        </span>
      </p>

      <h2>Writing</h2>
      <ul className="articles list">
        {postList.map((post) => (
          <li key={post.slug}>
            <article>
              <h3 className="heading">
                <Link href="/[slug]" as={post.slug}>
                  <a href={post.slug}>{post.title}</a>
                </Link>
              </h3>
              <time dateTime={post.date}>{post.date}</time>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const matter = require("gray-matter");

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

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode, postList: posts };
};
