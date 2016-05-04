var tplLogin = require('../tpl/login.string');

SPA.defineView('login', {
    html: tplLogin,
    plugins: ['delegated'],
    bindActions: {
      'backToPrevPage':function(){
        this.hide();
      }
    },
    bindEvents: {

    }
});
