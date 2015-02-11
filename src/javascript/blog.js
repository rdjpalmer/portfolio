(function() {
  var origTitle = document.title,
    newTitle = document.getElementsByTagName('title')[0].getAttribute('data-alt-title')
    
  var onFocusEvents = window.onfocus,
    onBlurEvents = window.onblur;
    
  window.onfocus = function() {
    document.title = origTitle;
    
    if(typeof(onFocusEvents) === 'function') {
      onFocusEvents();   
    }
  };
  
  window.onblur = function() {
    document.title = newTitle;
    
    if(typeof(onBlurEvents) === 'function') {
      onBlurEvents();   
    }
  };

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-38214112-1', 'auto');
  ga('send', 'pageview');
  
})();