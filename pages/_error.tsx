import Head from "next/head";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  slug: string;
  sortBy: number;
}

interface PageProps {
  postList: Post[];
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
        (_, index): Post => {
          const value = values[index];
          const { data } = matter(value.default);

          return {
            title: data.title,
            date: date.parseAndFormat(data.date, "dd MMM yyyy"),
            slug: data.permalink,
            sortBy: date.parseAndFormat(data.date, "T"),
          };
        }
      )
      .sort((a, b) => {
        return b.sortBy - a.sortBy;
      });
    return data;
    // @ts-ignore
  })(require.context("../src/posts", true, /\.md$/));

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode, postList: posts };
};
