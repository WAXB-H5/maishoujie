var tplGoodStuff = require('../tpl/goodstuff.string');

SPA.defineView('goodstuff', {
  html: tplGoodStuff,
  bindEvents: {
    'beforeShow': function () {
      // var myScroll = new IScroll('#index-scroll');
    }
  }
});
