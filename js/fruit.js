var fruit = new Vue({
    el: "#fruit",
    data: {
        // 水果列表
        list: [],
        // 大型水果
        blist: [],
        bprice: null,
        bg: null,
        bid: 0,
        btext: null,
        bnum: 3,
        // 中型水果
        mlist: [],
        mprice: null,
        mg: null,
        mid: 0,
        mtext: null,
        mnum: 65,
        // 小型水果
        slist: [],
        sprice: null,
        sg: null,
        snum: 2,
        sid: 0,
        stext: null,
        // 总和
        tprice: null,
        tg: null,
        ttext: null,
        budget: 220,
        // 其他
        otext: null,
        og: null
    },
    methods: {
        beginFruit() {
            this.bigFruit();
            this.middleFruit();
            this.smallFruit();
            this.totalMoney();
        },
        bigFruit() {
            var id = parseInt(Math.random() * this.blist.length);
            // 大型水果价格约:一个大型水果约重*价格*个数
            this.bprice = this.blist[id].weight * this.blist[id].price * this.bnum;
            this.btext = this.blist[id].name + ",价格为:" + this.blist[id].price + "元/斤,总计约:" + this.bprice + "元";
            this.bg = this.blist[id].weight * this.bnum;
        },
        middleFruit() {
            var id = parseInt(Math.random() * this.mlist.length);
            // 中型水果价格约:（中型水果个数/2）*价格
            this.mprice = (this.mnum / 2) * this.mlist[id].price;
            this.mtext = this.mlist[id].name + ",价格为:" + this.mlist[id].price + "元/斤,总计约:" + this.mprice + "元";
            this.mg = this.mnum / 2;
        },
        smallFruit() {
            var id = parseInt(Math.random() * this.slist.length);
            // 小型水果价格约:小型水果斤数*价格
            this.sprice = this.slist[id].price * this.snum;
            this.stext = this.slist[id].name + ",价格为:" + this.slist[id].price + "元/斤,总计约:" + this.sprice + "元";
            this.sg = this.snum;
        },
        otherSmall() {
            this.og=0;
            var lastprice = parseInt(this.budget - this.tprice);
            var id = parseInt(Math.random() * this.slist.length);
            // 没有超出预算还能购买小型水果是::（预算减去约价格）\小型水果价格
            this.og = parseInt(lastprice / this.slist[id].price);
            if (this.og <= 0) {
                this.otherSmall();
                return;
            }
            else{
                this.otext = "不到预算可以再买约" + this.og + "斤的" + this.slist[id].name + ",价格为:" + this.slist[id].price + "元/斤,总计约:" + this.slist[id].price * this.og + "元";
            }
        },
        totalMoney() {
            this.tprice = this.bprice + this.mprice + this.sprice;
            if (this.tprice >= this.budget) {
                this.beginFruit();
                return;
            } else {
                this.tg = this.bg + this.mg + this.snum;
                this.ttext = "总价格约:" + this.tprice + "元,约:" + this.tg + "斤";
                this.otherSmall();
            }
        }
    },
    mounted() {
        var vm = this;
        $(document).ready(function () {
            $.getJSON(`../data/fruit/fruit.json` + "?tempstamp=" + (+new Date()), function (res) {
                vm.list = res;
                vm.blist = vm.list[0].fruit;
                vm.mlist = vm.list[1].fruit;
                vm.slist = vm.list[2].fruit;
            });
        });
    },
})