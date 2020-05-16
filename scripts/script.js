(function() {
  function getEstimatedReadingTime(string, wordsPerSecond) {
    if (!string) string = "";
    // 200 words per minute
    if (!wordsPerSecond) wordsPerSecond = 3.33;

    var wordCount = string.split(" ").length;
    var seconds = wordCount / wordsPerSecond;
    var timestamp = seconds * 1000;
    var [minutes, decimalSeconds] = (seconds / 60).toString().split(".");

    return [minutes, Math.ceil(decimalSeconds * 0.6), timestamp];
  }

  function handleIntersection(entries, observer) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      if (entry.intersectionRatio > 0) {
        if (typeof window.fathom !== "undefined") {
          fathom.trackGoal("YICYPV5X", 0);
        }
        observer.unobserve(entry.target);
      }
    }
  }

  var readingTimeElement = document.querySelector(".reading-time");
  var contentElement = document.querySelector("main.blog");

  if (readingTimeElement && contentElement) {
    let [minutes] = getEstimatedReadingTime(contentElement.innerText);
    readingTimeElement.innerHTML = minutes + " min read";
  }

  if ("IntersectionObserver" in window && contentElement) {
    var observer = new IntersectionObserver(handleIntersection);
    var last =
      contentElement.children.length > 0 &&
      contentElement.children[contentElement.children.length - 1];

    if (last) {
      observer.observe(last);
    }
  }
})();
