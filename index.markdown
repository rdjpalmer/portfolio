---
layout: home
title: Richard Palmer, Creator of Byozo and HelloTimo
permalink: /
---

# Hey, I&apos;m Richard

I'm the co-creator of time and task manager, [Timo](https://hellotimo.co),
filling the gap between work done, work logged and the time sheet. Currently Engineering Team Lead at [TransferWise](https://transferwise.com).

Over the last eight years, I've taken a leading role in engineering and design
for the likes of [Byozo](https://byozo.org), [nudj](https://twitter.com/nudjHQ),
[Appear Here](https://appearhere.co.uk) and
[Pact Coffee](https://www.pactcoffee.com/).

Feel free to [email me](mailto:{{site.email}}), or
[DM me on twitter](https://twitter.com/rdjpalmer).

## Writing

<ul class="articles list">
  {% for post in site.posts %}
    <li>
      <article>
        <h3 class="heading"><a href="{{ post.permalink }}">{{ post.title }}</a></h3>
        <time datetime="{{ post.date }}">{{ post.date | date: "%d %B %Y" }}</time>
      </article>
    </li>
  {% endfor %}
</ul>
