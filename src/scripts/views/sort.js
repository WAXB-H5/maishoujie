var tplSort = require('../tpl/sort.string');

SPA.defineView('sort', {
    html: tplSort,
    plugins: ['delegated', {
        name: "avalon",
        options: function(vm) {
            vm.dl = [];
            vm.dl_imgArr = [];
        }
    }],
    init: {
        mySwiper: null,
        getData: function(vm,idx) {
            that = this;
            $.ajax({
                url: "/Maishoujie/api/data.do?page=1",
                type: "get",
                success: function(res) {
                    vm.dl = res['dl'+idx];
                    vm.dl_imgArr = that.getNewDataArr(vm.dl[1].ddImg, 3);
                }
            });
        },
        getNewDataArr: function(array, n) {
            var newDataArr = [];
            var count = 0;
            for (var i = 0; i < array.length / n; i++) {
                newDataArr[i] = [];
                for (var j = 0; j < n; j++) {
                    newDataArr[i][j] = array[count++];
                }
            }
            return newDataArr;
        }
    },
    bindActions: {
        'tapLi': function(e) {
            $(e.el).addClass('activeSideLi').siblings().removeClass('activeSideLi');
            var tapLiIndex = $(e.el).index();
            var _this = this;
            var vm = _this.getVM();
            _this.getData(vm,tapLiIndex);
        },
        'sortSpanSlide': function(e) {
            this.mySwiper.slideTo($(e.el).index());
        }
    },
    bindEvents: {
        'beforeShow': function() {
            var _this = this;
            var vm = _this.getVM();
            _this.getData(vm,0);
            this.mySwiper = new Swiper('.sort-swiper', {
                loop: false,
                onSlideChangeStart: function() {
                    $(".sort-header>ul>li>span").eq(_this.mySwiper.activeIndex).addClass('activeSpanBorder').siblings().removeClass('activeSpanBorder');
                }
            });
        }
    }
});
