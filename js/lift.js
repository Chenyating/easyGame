var lift = new Vue({
    el: "#lift",
    data: {
        lift_number: [5, 4, 3, 2, 1, 0], //电梯楼层编号
        lift_in: [], //电梯楼层亮灯情况
        floor_now: 0, //当前电梯所在楼层，
        lift_out_up: [], //外面电梯按上的数组；
        lift_out_down: [], //外面电梯按下的数组；
        up_or_down: true, //电梯的运行的方向，true为上，false为下
        ifRun: false, //电梯是否要运行true为运行，false为不运行
    },
    methods: {
        // 点击上
        up(item) {
            Vue.set(this.lift_out_up, item, true);
        },
        //点击下 
        down(item) {
            Vue.set(this.lift_out_down, item, true);
        },
        // 点击要去的楼层；
        goLift(item) {
            Vue.set(this.lift_in, item, true);
        },
        //判断当前是否为上，以及上面有楼层；
        ifHaveAfter() {
            for (let i = this.floor_now; i < this.lift_number.length; i++) {
                if (this.lift_in[i] == true) {
                    this.up_or_down = true;
                    return true;
                }
                if (this.lift_out_up[i] == true) {
                    this.up_or_down = true;
                    return true;
                }
            }
            return false;
        },
        // 判断当前楼层是否为下，以及下面是否有按楼层
        ifHaveAhead() {
            for (let i = this.floor_now; i >= 0; i--) {
                if (this.lift_in[i] == true) {
                    this.up_or_down = false;
                    return true;
                }
                if (this.lift_out_down[i] == true) {
                    this.up_or_down = false;
                    return true;
                }
            }
            return false;
        },
        liftRun() {
            while (this.ifHaveAfter()) {
                for (let i = this.floor_now; i < this.lift_out_up.length; i++) {
                    if (this.lift_out_up[i] == true || this.lift_in[i]==true) {
                        this.floor_now = i;
                        this.lift_in[i] = false
                        this.lift_out_up[i] = false
                        console.log("going to: ", this.floor_now)
                    }
                }
            }
            for (let i = this.lift_number.length-1; i > this.floor_now; i--)
            {
                if(this.lift_out_down[i]==true)
                {
                    this.floor_now = i
                    this.lift_out_down[i] = false
                    console.log("going to: ", this.floor_now)
                }
            }

            while (this.ifHaveAhead()) {
                for (let i = this.floor_now; i >= 0; i--) {
                    if (this.lift_out_down[i] == true|| this.lift_in[i]==true) {
                        this.floor_now = i;
                        this.lift_in[i] = false
                        this.lift_out_down[i] = false
                        console.log("going to: ", this.floor_now)
                    }
                }
            }
            for (let i = 0; i < this.floor_now; i++)
            {
                if(this.lift_out_up[i]==true)
                {
                    this.floor_now = i
                    this.lift_out_up[i] = false
                    console.log("going to: ", this.floor_now)
                }
            }
        }
    },
    mounted() {
        // 定义初始值，都为false
        for (let i = 0; i < 6; i++) {
            this.lift_out_down[i] = false;
            this.lift_out_up[i] = false;
            this.lift_in[i] = false;
        }
    },
    watch: {
        // 只有三个数组里的其中一个数组为真，电梯就要动
        lift_out_up: function (val) {
            if (this.lift_out_up.includes(true)) {
                this.liftRun();
                this.ifRun = true;
            } else {
                this.ifRun = false;
            }
        },
        lift_out_down: function (val) {
            if (this.lift_out_down.includes(true)) {
                this.liftRun();
                this.ifRun = true;
            } else {
                this.ifRun = false;
            }
        },
        lift_in: function (val) {
            if (this.lift_in.includes(true)) {
                this.liftRun();
                this.ifRun = true;
            } else {
                this.ifRun = false;
            }
        },
        // // 监听，这个电梯要不要动。
        // ifRun: function (val) {
        //     if (this.ifRun) {
        //         this.liftRun();
        //     }
        // }
    }
})