import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import Markdown from "react-markdown/with-html";

interface Metadata {
  layout: "newsletter" | "post";
  title: string;
  date: string;
  permalink: string;
  description: string;
}

interface PostProps {
  metadata: Metadata;
  body: string;
}

export default function PostPage(props: PostProps) {
  const { metadata, body } = props;
  const { title, date } = metadata;

  return (
    <>
      <Head>
        <title>{title} | Richard Palmer, Creator of Byozo and HelloTimo</title>
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

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const post = await import(`../_posts/${slug}.md`);
  const date = require("../src/utils/date");

  const { data, content } = matter(post.default);

  return {
    props: {
      metadata: {
        ...data,
        date: date.parseAndFormat(data.date, "dd MMM yyyy"),
      },
      body: content,
    },
  };
}

export async function getStaticPaths() {
  const glob = require("glob");
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
