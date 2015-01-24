(function(w, undefined) {
  /**
   * ~IE8 friendly has, add & remove class functions
   */
  var util = {
    hasClass: function(elm, className) {
      return new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)").test(elm.className);
    },
    addClass: function (elm, className) {
      elm.className = elm.className ? [elm.className, className].join(' ') : className;
    },
    removeClass: function(elm, className) {
      var c = elm.className;
      elm.className = c.replace(new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)", "g"), "");
    }
  };

  util.removeClass(document.getElementsByTagName('html')[0], 'no-js');

  var tumblrURL = 'blog.rdjpalmer.com';
  var tumblrAPIKey = 'nScNnSKcxEaOwZE7jlTGHAaz9tkd2JXFb8TQPxK1h0QS7oyGRX';

  function buildTumblrArticleList(list, posts) {
    var anchor, listItem;

    for(var i = 0; i < posts.length; i++) {
      anchor = document.createElement('a');
      anchor.innerText = posts[i].title;
      anchor.setAttribute('href', posts[i].post_url);

      listItem = document.createElement('li');
      listItem.appendChild(anchor);

      list.appendChild(listItem);
    }
  }

  function buildTumblrArticleLists(posts) {
    var listHeading = document.getElementsByClassName('js-blogListHeading')[0];
    var aboutWritingHeading = document.getElementsByClassName('js-aboutWriting')[0];
    var parentLists = document.getElementsByClassName('js-blogList');

    if(listHeading) {
      util.addClass(listHeading, 'is-active');
    }

    if(aboutWritingHeading) {
      var currentHeading = aboutWritingHeading.innerText;
      aboutWritingHeading.innerHTML = currentHeading
        .substring(0, currentHeading.length - 1) + ':';
    }

    if(parentLists > 1) {
      buildTumblrArticleList(parentLists[0]);
    } else {
      for(var i = 0; i < parentLists.length; i++) {
        buildTumblrArticleList(parentLists[i], posts);
      }
    }
  }

  function getTumblrPosts(blogUrl, apiKey, callback) {
    var url = 'http://api.tumblr.com/v2/blog/' + blogUrl +
      '/posts/text?api_key=' + apiKey + '&notes_info=true';

    JSONP(url, processTumblrPosts);
  }

  function processTumblrPosts(data) {
    if(data.meta.status !== 200) {
      console.error('Error: ' + data.meta.status, data.meta.msg);
      return;
    }

    var posts = data.response.posts;
    var limit = 3;
    var processedPosts = [];

    for(var i = 0; i < limit; i++) {
      processedPosts.push(posts[i]);
    }

    buildTumblrArticleLists(processedPosts);
  }

  getTumblrPosts(tumblrURL, tumblrAPIKey, processTumblrPosts);

  document.getElementsByClassName('js-copyrightYear')[0].innerText = new Date().getFullYear();
})(this);