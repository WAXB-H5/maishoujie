var tplSubject = require('../tpl/subject.string');

SPA.defineView('subject', {
  html: tplSubject,
  bindEvents: {
    'beforeShow': function () {
      // var myScroll = new IScroll('#index-scroll');
    }
  }
});
