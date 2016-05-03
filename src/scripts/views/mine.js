var tplMine = require('../tpl/mine.string');

SPA.defineView('mine', {
    html: tplMine,
    plugins:['delegated'],
    bindEvents: {
        'beforeShow': function() {

        }
    },
    bindActions:{
      'login':function(){
        SPA.open('login');
      }
    }
});
