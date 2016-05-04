var tplGoods = require('../tpl/goods.string');

SPA.defineView('goods', {
    html: tplGoods,
    plugins: ['delegated', {
        name: "avalon",
        options: function(vm) {
            vm.isShow = true; //用于控制商品页头部箭头变化
            vm.lunboArray = []; //商品页面轮播图图片数组
            vm.lunbo_ulArray = []; //轮播图下面的图片
            vm.goodsArray = []; //商品图片数组
        }
    }],
    init: {
        getData: function(vm) { //getData方法用于刷新商品列表
            $.ajax({
                url: "/Maishoujie/api/data.do?page=0",
                type: "get",
                success: function(res) {
                    vm.lunboArray = res.lunbo;
                    vm.lunbo_ulArray = res.lunbo_ul;
                    vm.goodsArray = res.goods;
                }
            });
        },
        refreshData: function(vm) { //refreshData方法用于下拉新增商品列表
            $.ajax({
                url: "/Maishoujie/api/data.do?page=2",
                type: "get",
                success: function(res) {
                    newGoodsArray = res.goods;
                    for (var i = 0; i < newGoodsArray.length; i++) {
                        vm.goodsArray = vm.goodsArray.push(newGoodsArray[i]);
                    }
                }
            });
        },
        myScroll: null
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
                observer: true, //改变后刷新
                autoplayDisableOnInteraction: false, //手动控制后不影响自动滑动
            });
            //上拉下拉
            setTimeout(function() {

                _this.myScroll = _this.widgets.refresh; //获得scroll
                _this.myScroll.scrollBy(0, -60); //将下拉动画部分隐藏
                var head = $('.head img');
                var topImgHasClass = head.hasClass('up');
                var foot = $('.foot img');
                var bottomImgHasClass = head.hasClass('down');

                _this.myScroll.on('scroll', function() {
                    var y = this.y;
                    var maxY = this.maxScrollY - y;
                    if (y >= 0) {
                        if (!topImgHasClass) {
                            head.addClass('up');
                            $('.head span').html("够了啦...快松开人家嘛");
                            return '';
                        }
                    }
                    if (maxY >= 0) {
                        if (!bottomImgHasClass) {
                            foot.addClass('down');
                            $('.foot span').html("够了啦...快松开人家嘛");
                            return '';
                        }
                    }
                });

                _this.myScroll.on('scrollEnd', function() {

                    //下拉刷新部分
                    if (this.y >= -60 && this.y < 0) {
                        _this.myScroll.scrollTo(0, -60);
                        head.removeClass('up');
                    } else if (this.y >= 0) {
                        head.attr('src', '/maishoujie/images/ajax-loader.gif');

                        //TODO ajax下拉刷新数据
                        vm = _this.getVM();
                        _this.getData(vm);

                        setTimeout(function() {
                            _this.myScroll.scrollTo(0, -60);
                            head.removeClass('up');
                            $('.head span').html("在拉，在拉就刷给你看...");
                            head.attr('src', '/maishoujie/images/arrow.png');
                        }, 600);
                    }

                    //上拉加载部分
                    var maxY = this.maxScrollY - this.y;
                    if (maxY > -60 && maxY < 0) {
                        var self = this;
                        _this.myScroll.scrollTo(0, self.maxScrollY + 60);
                        foot.removeClass('down');
                    } else if (maxY >= 0) {
                        foot.attr('src', '/maishoujie/images/ajax-loader.gif');

                        //TODO ajax上拉加载数据
                        vm = _this.getVM();
                        _this.refreshData(vm);

                        var selfs = this;
                        setTimeout(function() {
                            _this.myScroll.refresh();
                            _this.myScroll.scrollTo(0, selfs.y + 60);
                            foot.removeClass('down');
                            $('.foot span').html("在拉，在拉就加载给你看...");
                            foot.attr('src', '/maishoujie/images/arrow.png');
                        }, 1000);
                    }
                });
            }, 0);
        }
    }
});
