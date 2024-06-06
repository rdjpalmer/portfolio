import Head from "next/head";

export default function ProjectPage() {
  return (
    <>
      <Head>
        <title>Projects | Richard Palmer</title>
        <link
          rel="canonical"
          href="https://rdjpalmer.com/projects"
          key="canonical"
        />
      </Head>
      <h1>Projects</h1>
      <h2>Making</h2>
      <ul className="articles list">
        <li>
          <a href="https://github.com/rdjpalmer/socket-notes">Socket notes</a>
          <br />
          Open Source project for utilising a Kindle as a secondary display.
          Great for writing late at night.
        </li>
        <li>
          <a href="https://github.com/rdjpalmer/no-persistence-mixpanel">
            No persistence mixpanel
          </a>
          <br />
          Open source project for adding analytics to Figma plug-ins.
        </li>
        <li>
          <a href="https://foodnotes.typehut.com/">Food Notes</a>
          <br />
          The minimum viable food blog, so I don't struggle to re-find recipes
          in the future.
        </li>
      </ul>
      <h2>Defunct</h2>
      <ul className="articles list">
        <li>
          <span className="strike">Timo</span>
          <br />
          Putting freelancer's todos and time tracking in one place.
        </li>
        <li>
          <span className="strike">Byozo</span>
          <br />
          Productivity methodology with accompanying mobile application to keep
          you focused on the best impact to effort ratio tasks.
        </li>
        <li>
          <span className="strike">RSS Reader</span>
          <br />
          Bare-minimum newsletter and RSS Reader to bring back the Google Reader
          days.
        </li>
        <li>
          <span className="strike">Memory knowledge graph tool</span>
          <br />
          I'm not 100% what this is yet, or what it might be. Something is
          cooking.
        </li>
        <li>
          <span className="strike">Twitter Spell Check</span>
          <br />
          Browser extension to prevent sending of tweets with spelling mistakes
          in them.
        </li>
        <li>
          <span className="strike">
            <a>
              Routines<span className="tag">Coming soon</span>
            </a>
          </span>
          <br />
          Computer enabled routines and habits.
        </li>
      </ul>
    </>
  );
}
