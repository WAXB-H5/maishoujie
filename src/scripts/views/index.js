var tplIndex = require('../tpl/index.string');
SPA.defineView('index', {
    html: tplIndex,

    plugins: ['delegated'],

    modules: [{
        name: 'indexContent',
        container: ('.m-index-body'),
        views: ['goods', 'sort', 'goodstuff', 'subject', 'mine'],
        defaultTag: 'goods'
    }],

    bindActions: {
        'tap.switch': function(el, data) {
            this.modules.indexContent.launch(data.tag);//添加模块
            $(el.el).addClass("actionLi").siblings().removeClass("actionLi");
        }
    }
});
