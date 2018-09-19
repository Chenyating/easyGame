var app = new Vue({
    el: "#teris",
    data: {
        scope: 10,
        v: 10,
        radomID: null, //图像编号
        shap: [], //存放图形
        all: [], //存放所有已经内容
        context: null, //画布
        direction: 1, //方块移动方向
        pushAll: 0,
        rotateID: 0, //旋转的状态,
        testArr: [],
        defaultX: 400,
        defaultY: 0,
        shapName: null
    },
    methods: {
        //绘制
        pain() {
            var c = document.getElementById("stage");
            this.context = c.getContext("2d");
            this.context.fillStyle = "#8A3324";
            // this.context.clearRect(0, 0, 800, 60);
        },
        //绘制图像
        painShap() {
            for (var i = 0; i < this.shap.length; i++) {
                console.log(this.shap[i].length);
                for (var j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        this.context.fillRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20); //绘制
                    }
                }
            }
        },
        //随机绘制图形
        radomShap() {
            this.pain();
            this.radomID = parseInt(Math.random() * 7);
            this.shap.splice(0, this.shap.length); //清空存放图形的数组 
            //开始存储不同形状的数组
            switch (this.radomID) {
                case 0:
                    //长条
                    for (var i = 0; i < 4; i++) {
                        this.defaultX = 400;
                        if (i == 2) {
                            this.$set(this.shap, i, [
                                [this.defaultX, this.defaultY, 1],
                                [this.defaultX += 20, this.defaultY, 1],
                                [this.defaultX += 20, this.defaultY, 1],
                                [this.defaultX += 20, this.defaultY, 1]
                            ]);
                        } else {
                            this.$set(this.shap, i, [
                                [this.defaultX, this.defaultY, 0],
                                [this.defaultX += 20, this.defaultY, 0],
                                [this.defaultX += 20, this.defaultY, 0],
                                [this.defaultX += 20, this.defaultY, 0]
                            ]);

                        }
                        this.defaultY += 20;
                    }
                    this.shapName = "长条";
                    break;
                case 1:
                    //正方形
                    this.$set(this.shap, 0, [
                        [400, 0, 1],
                        [400, 20, 1]
                    ]);
                    this.$set(this.shap, 1, [
                        [420, 0, 1],
                        [420, 20, 1]
                    ]);
                    this.shapName = "正方形";
                    break;
                case 2:
                    //正7
                    this.$set(this.shap, 0, [
                        [400, 0, 1],
                        [420, 0, 1],
                        [440, 0, 0],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 0],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 1],
                        [440, 40, 0],
                    ]);
                    this.shapName = "正7";
                    break;
                case 3:
                    //反7
                    this.$set(this.shap, 0, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 1],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 0],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 1],
                        [440, 40, 0],
                    ]);
                    this.shapName = "反7";
                    break;
                case 4:
                    //正2
                    this.$set(this.shap, 0, [
                        [400, 0, 1],
                        [420, 0, 1],
                        [440, 0, 0],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 1],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 0],
                    ]);
                    this.shapName = "正2";
                    break;
                case 5:
                    //反2
                    this.$set(this.shap, 0, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 1],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 1],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 0],
                    ]);
                    this.shapName = "反2";
                    break;
                case 6:
                    //土
                    this.$set(this.shap, 0, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 0],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 1],
                        [420, 20, 1],
                        [440, 20, 1],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 0],
                    ]);
                    this.shapName = "土";
                    break
                default:
                    break;
            }
            console.log("this ramdomID is" + this.shapName)
            this.painShap();
        },
        //旋转的图形变化
        rotate() {
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    var cap;
                    cap = this.shap[i][j][2];
                    this.shap[i][j][2] = this.shap[this.shap[i].length-1-j][this.shap[i].length-1-i][2];
                    console.log(i+j+"<=>"+this.shap[i].length-1-j+this.shap[i].length-1-i);
                    this.shap[this.shap[i].length-1-j][this.shap[i].length-1-i][2] = cap;
                }
            }
            // switch (this.rotateID) {
            //     //1->2
            //     case 0:
            //     this.rotateID =1;
            //         for (let i = 0; i < this.shap.length; i++) {
            //             for (let j = i + 1; j < this.shap[i].length; j++) {
            //                 var cap;
            //                 cap = this.shap[i][j][2];
            //                 this.shap[i][j][2] = this.shap[j][i][2];
            //                 this.shap[j][i][2] = cap;
            //             }
            //         }
            //         console.log("1-->2")
            //         break;
            //         //2-->3
            //     case 1:
            //     this.rotateID =0;
            //         for (let i = 0; i < this.shap.length; i++) {
            //             for (let j = 0; j < this.shap[i].length; j++) {
            //                 var cap;
            //                 cap = this.shap[i][j][2];
            //                 this.shap[i][j][2] = this.shap[this.shap[i].length-1-j][this.shap.length-1-i][2];
            //                 this.shap[this.shap[i].length-1-j][this.shap.length-1-i][2] = cap;
            //             }
            //         }
            //         console.log("2-->3")
            //         break;
            //     default:
            //         break;
            // }
            for (var i = 0; i < this.shap.length; i++) {
                for (var j = 0; j < this.shap[i].length; j++) {
                    console.log(this.shap[i][j][0] + ":" + this.shap[i][j][1] + ":" + this.shap[i][j][2])
                }
                console.log("---------")
            }
        },
        //向下移动
        down() {
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    this.context.clearRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20);
                    this.shap[i][j][1] += 20;
                }
            }
            this.painShap()
        },
        //旋转
        //是否重叠
        ifOverlap() {
            for (var i = this.shap.length - 1; i > 0; i--) {
                if (this.shap[0][0] == this.shap[i][0] && this.shap[0][1] == this.shap[i][1]) {
                    alert("游戏结束，你撞到你自己啦！")
                    this.gameOver();
                }
            }
        },
        behavior() {
            switch (direction) {
                case 1:

                    break;

                default:
                    break;
            }
        }
    },
    mounted() {

    },
})