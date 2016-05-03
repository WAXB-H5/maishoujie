var tplGoods = require('../tpl/goods.string');

SPA.defineView('goods', {
    html: tplGoods,
    plugins: ['delegated', {
        name: "avalon",
        options: function(vm) {
            vm.isShow = true; //用于控制商品页头部箭头变化
            vm.lunboArray = []; //商品页面轮播图图片数组
            vm.lunbo_ulArray = [];
            vm.goodsArray = [];
        }
    }],
    init: {
        getData: function(vm) {
            $.ajax({
                url: "/maishoujie/mock/goodsPageData.json",
                type: "get",
                success: function(res) {
                    vm.lunboArray = res.lunbo;
                    vm.lunbo_ulArray = res.lunbo_ul;
                    vm.goodsArray = res.goods;
                }
            });
        }
    },
    bindActions: {
        'click': function(el, data) { //商品页头部箭头方向变化
            var vm = this.getVM();
            if (vm.isShow) {
                vm.isShow = false;
            } else {
                vm.isShow = true;
            }
        }
    },
    bindEvents: {
        'beforeShow': function() {
            var _this = this;
            var vm = _this.getVM();
            _this.getData(vm);
            var mySwiper = new Swiper('#goodsLb', { //轮播图滚动
                autoplay: 3000, //可选选项，自动滑动
                loop: true, //无缝衔接
                observer:true,//改变后刷新
                autoplayDisableOnInteraction: false, //手动控制后不影响自动滑动
            });
        }
    }
});
