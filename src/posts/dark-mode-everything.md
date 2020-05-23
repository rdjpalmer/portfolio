---
layout: post
title: "Dark mode everything"
date: 2020-05-17
slug: "/dark-mode-everything"
description: Quickly switch between light and dark mode on MacOS
---

For those of you who utilise dark mode to ease the impact of blue light coming from your screen. You might want to try <a href="https://darkreader.org/" target="_blank" rel="noopener noreferrer">Dark Reader</a>. It’s a browser extension which brings dark mode to any website.

Dark Reader’s not-so-hidden gem is that you can sync it with your system preferences. MacOS in light mode? Excellent, Dark Reader will leave the webpages as-is. Put it in dark mode, and voilà, the entire web is in dark mode too.

<figure style="max-width: 18rem">
  <img src="/images/automated-dark-reader.gif" alt="animation demonstrating how to set up a system wide keyboard shortcut for running the automator script" />
</figure>

It’s quite a pain to switch between light & dark on MacOS though. Having to go aaaaall the way to system preferences for what should be an easily accessible toggle.

Skip all the hassle and <a href="https://beebom.com/how-quickly-switch-between-dark-light-mode-mac/" target="_blank"  rel="noopener noreferrer">make an automator script</a>.

Got that? Now hook it up to a keyboard shortcut.

<figure>
  <img class="img--small" src="/images/system-theme-switch.gif" alt="animation demonstrating how to set up a system wide keyboard shortcut for running the automator script" />
</figure>

You can do this by heading to System Preferences → Keyboard → Shortcuts → Services. Scroll to the bottom and set a shortcut on your automator script. I went with `cmd+shift+b`.

Ensure your desktop background is set to update based on the mode (the default macOS Catalina background will suffice) and switch modes as and when you please.

<figure>
  <img class="img--small" src="/images/switcher.gif" alt="animation demonstrating the shortcut and light/dark mode switch" />
</figure>

## Bonus point: Make VS Code switch themes too

Towards the end of last year the VS Code team added support to switch themes based on system preferences too.

<figure>
  <img class="img--small" src="/images/vscode-theme-switch.gif" alt="animation demonstrating the shortcut and light/dark mode switch" />
</figure>

You can do so, by adding the following to your settings:

```
{
	"window.autoDetectColorScheme": true,
	"workbench.preferredLightColorTheme": "Night Owl Light",
	"workbench.preferredDarkColorTheme": "Night Owl"
}
```

Shout out to <a href="https://twitter.com/sarah_edo" target="_blank" rel="noopener noreferrer">Sarah Drasner</a> and her <a href="https://github.com/sdras/night-owl-vscode-theme" target="_blank" rel="noopener noreferrer">Night Owl theme</a> <span role="image" aria-label="heart">❤️</span>.

I also want to give a shout out to <a href="https://twitter.com/martinlexow" target="_blank" rel="noopener noreferrer">Martin Lexow</a> and <a href="https://www.ixeau.com/keystroke-pro/" target="_blank" rel="noopener noreferrer">Keystroke Pro</a>. You might notice I'm trying it it out in the gifs above!
