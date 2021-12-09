import * as React from "react";

export default function RoutinesPage() {
  return (
    <div>
      <h1>Routines</h1>
      <ol>
        <li>
          <a
            href="https://twitter.com/rdjpalmer/status/1466376612136374274"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start here
          </a>
        </li>
        <li>
          Copy and paste the templates below into your{" "}
          <code>roam/templates</code> page.
        </li>
        <li>Edit the templates to match the habits you're trying to form</li>
        <li>
          Let me know how you get on{" "}
          <a href="https://twitter.com/rdjpalmer">on Twitter</a>
        </li>
      </ol>
      <pre>
        <code>
          {`
- RoutineA
    - [[Remember]] — [[♾ Sustenance without subsidisation]].
    - [[Consolidate]]
        - {{[[TODO]]}} [[Portuguese Study]] via [Practice Portuguese](http://practiceportuguese.com/)
    - [[Journalling]]
- RoutineB
    - [[Connect]] — Message someone you haven't spoken to in a while
    - [[Create]]
    - [[Consume]]
- RoutineC
    - {{[[TODO]]}} [[Training]] (5km run/strength)
- RoutineD
    - {{[[TODO]]}} [[Reading]]
    - {{[[TODO]]}} [[Meditation]]
`}
        </code>
      </pre>
    </div>
  );
}
