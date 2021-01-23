import Head from "next/head";
import Link from "next/link";
import Markdown from "react-markdown/with-html";

import Input from "../src/components/Input/Input";
import Button from "../src/components/Button/Button";

export default function SubscribePage() {
  return (
    <>
      <Head>
        <title>
          Subscribe to Rich's newsletter | Richard Palmer, Creator of Timo
        </title>
      </Head>

      <Link href="/">
        <a className="all-posts">
          <span>Home</span>
        </a>
      </Link>

      <h1>Subscribe to Rich's newsletter</h1>

      <p>Get every blog post, plus extra goodies, straight to your inbox.</p>
      <p>
        What are the extra goodies? Links, references, ideas that I've collected
        over the two week period in between each post. It's the things that
        inspire the posts and provoke new ways of thinking.
      </p>

      <form
        action="https://rdjpalmer.us20.list-manage.com/subscribe/post?u=0cb4f80ca9869534161bfc334&amp;id=5e488d017e"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <div className="subscribe-form">
          <Input
            label="Name"
            placeholder=""
            type="text"
            name="FNAME"
            required
          />
          <Input name="EMAIL" label="Email" required />
          <Button>Subscribe</Button>
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
            You can unsubscribe at any time, by hitting the unsubscribe link at
            the bottom of the emails you'll receive. I use MailChimp to send the
            emails, so by signing up, your email address will be sent to them.
          </small>
        </p>
      </form>
    </>
  );
}
