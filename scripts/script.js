(function() {
  var isDarkMode =
    getComputedStyle(document.body).backgroundColor === "rgb(24, 26, 27)";

  var Color = {
    light: ["#008040", "#0000E0", "#DB0A5B", "#E00000"],
    dark: [
      "#00FF7F",
      "#36D7B7",
      "#FC6399",
      "#9370DB",
      "#FFD700",
      "#F9690E",
      "#F64747",
    ],
  };

  function getColor() {
    if (isDarkMode) {
      var limit = Color.dark.length;
      var index = Math.floor(Math.random() * limit);
      return Color.dark[index];
    }

    var limit = Color.light.length;
    var index = Math.floor(Math.random() * limit);
    return Color.light[index];
  }

  function setColor(color, element) {
    element.style.color = color;
  }

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

  var anchors = [].slice.call(document.querySelectorAll("a"));
  var color = getColor();

  anchors.forEach(function(a) {
    setColor(color, a);
  });

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
