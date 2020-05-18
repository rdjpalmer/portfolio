import Head from "next/head";
import Link from "next/link";
import Markdown from "react-markdown/with-html";

interface Post {
  title: string;
  date: string;
  slug: string;
  sortBy: number;
}

interface PageProps {
  body: string;
  postList: Post[];
}

export default function HomePage(props: PageProps) {
  const { body, postList } = props;

  return (
    <>
      <Head>
        <title>Richard Palmer, Creator of Byozo and HelloTimo</title>
      </Head>
      <Markdown source={body} escapeHtml={false} />
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

export async function getStaticProps() {
  // @ts-ignore
  const page = await import("../src/pages/index.md");
  const matter = require("gray-matter");
  const { content } = matter(page.default);

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
  })(require.context("../_posts", true, /\.md$/));

  return {
    props: {
      body: content,
      postList: posts,
    },
  };
}
