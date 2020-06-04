---
title: "Review your own code"
date: 2019-05-10
slug: "/review-your-own-code"
description: TBD
---

When you're the first developer on a project, maybe even the only developer on a project, it's tempting to throw caution to the wind and start shipping immediately.

It sounds great doesn't it? No more pesky code reviews. No one to challenge your approach. You get to make the decisions now. You're in charge.

It's you own the company. You're Chief Executive, Chief Technology, Chief Product... you name it, you're the Chief. You've been working on the project for six months, and things are going pretty well.

You hit a snag. One of the early tech decisions is preventing you from shipping a feature which your most important users are requesting.

You need to refactor. You go through the arduous process of addressing the technical debt (yep, you've got technical debt just six months in) and you decide its time to hire in some help. You find a really capable frontender. They join the project. They start berating so many decisions you've had. "It's shit", exclaimed over lunch. Repeatedly. You know it. And well, you sort of knew it at the time you wrote it too.

What you don't realise is, you could've caught it in the first place.

Here's another scenario. You start a project to learn a new technology. Say, you've been using React for awhile now, and feel pretty comfortable. So you decide to try Vue. So you follow the get started documentation, have your project set up and start to build it out. You're going to make quite a few questionable decisions here, because it's such unfamiliar territory. You're not quite sure what good looks like yet.

Both scenarios share common traits. Your code won't go through peer review. You'll write it, you'll commit it, and you'll move on.

Because it doesn't go through peer review, doesn't mean it can't go through *code* review. Like an Author edits and redrafts their manuscript, an Engineer can review their code. 

You can go through the same process to review your code, as if you would anyone else's.

Push your code to a new branch. Create a pull request. Then pause. Take your Engineer's hard hat off and pick up your red marker and get to work. You're now reviewing *someone else's code*. And you're going to mark it up to try to avoid the less than ideal scenarios described above.

It's better than reviewing someone else's code though. Here, you can be ruthless. You can go to town on the nits, you can bring up anything and everything because the only persons feelings you might hurt are, well, your own. Hold no prisoners.

Beyond improving the code, you gain a multitude of other benefits from this. You'll improve as an engineer. You'll be praciticing self-reflection. Why did you do it this way? How else can you achieve the same result?

You'll also be setting precedent. As I said before, there might come a point when you have another engineer working along side you. When they join the team, they'll already have a sense that the code has been vetted. These are the practises that you follow. And they'll have a history of the decisions you've made and why you've made them.

At Byozo, I made the point to do this. While it was little old me hacking away, building the application while learning React Native, I practiced all of the behaviours I would want to see when we hired someone else to work with me. Code review, good test coverage, shipping often and iterating. The idea was to set up the practices now, so when someone did join, it would be easy to bring them up to speed.

It still feels strange, reviewing your own code. GitHub doesn't incentivise it. You can't approve your own code. But you can still review it. And as a learning exercise at the very least, I can't recommend it highly enough.
