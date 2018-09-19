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
        rotateID: null, //旋转的状态,
        testArr: [],
        defaultX: 400,
        defaultY: 0
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
            // this.radomID = parseInt(Math.random() * 7);
            this.radomID = 2;
            //开始存储不同形状的数组
            switch (this.radomID) {
                case 0:
                    //长条
                    for (var i = 0; i < 4; i++) {
                        this.defaultX = 400;
                        if (i == 2) {
                            this.$set(this.shap, i, [
                                [this.defaultX += 20, this.defaultY, 1],
                                [this.defaultX += 20, this.defaultY, 1],
                                [this.defaultX += 20, this.defaultY, 1],
                                [this.defaultX += 20, this.defaultY, 1]
                            ]);
                        } else {
                            this.$set(this.shap, i, [
                                [this.defaultX += 20, this.defaultY, 0],
                                [this.defaultX += 20, this.defaultY, 0],
                                [this.defaultX += 20, this.defaultY, 0],
                                [this.defaultX += 20, this.defaultY, 0]
                            ]);

                        }
                        this.defaultY += 20;
                    }
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
                    break;
                case 2:
                    //正7
                    this.$set(this.shap, 1, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 1],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 20, 0],
                        [420, 20, 0],
                        [440, 20, 1],
                    ]);
                    this.$set(this.shap, 3, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 1],
                    ]);
                    break;
                case 3:
                    //反7
                    this.shap.push([400, 0]);
                    this.shap.push([400 + 20, 0]);
                    this.shap.push([400, 20]);
                    this.shap.push([400, 40]);
                    break;
                case 4:
                    //正2
                    this.shap.push([400, 0]);
                    this.shap.push([400 + 20, 0]);
                    this.shap.push([400 + 20, 20]);
                    this.shap.push([400 + 40, 20]);
                    break;
                case 5:
                    //反2
                    this.shap.push([400, 0]);
                    this.shap.push([400 + 20, 0]);
                    this.shap.push([400 - 20, 20]);
                    this.shap.push([400, 20]);
                    break;
                case 6:
                    //土
                    this.shap.push([400, 0]);
                    this.shap.push([400 - 20, 20]);
                    this.shap.push([400, 20]);
                    this.shap.push([400 + 20, 20]);
                    break;
                default:
                    break;
            }
            console.log(this.shap)
            console.log(this.shap.length);
            for (var i = 0; i < this.shap.length; i++) {
                for (var j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        this.context.fillRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20); //绘制
                    }
                }
            }
            this.shap.splice(0, this.shap.length); //清空存放图形的数组 
        },
        //旋转的图形变化
        rotate() {
            this.rotateID = parseInt(Math.random() * 4);
            switch (this.radomID) {
                case 0:
                    for (var i = 0; i < this.shap.length; i++) {
                        this.shap[i][0] = this.shap[i][0] + 20;
                        this.shap[i][1] = this.shap[i][0] + 20;
                    }
                    break;
                case 1:
                    //正方形不需要变化
                    break;
                case 2:
                    //正方形不需要变化
                    break;
                case 3:
                    //正方形不需要变化
                    break;
                case 4:
                    //正方形不需要变化
                    break;
                case 5:
                    //正方形不需要变化
                    break;
                case 6:
                    for (var i = 0; i < this.shap.length; i++) {
                        this.shap[i][0] = this.shap[i][0] + 20;
                        this.shap[i][1] = this.shap[i][0] + 20;
                    }
                    break;
                default:
                    break;
            }
        },
        //向下移动
        down() {
            for (var i = 0; i < this.shap.length; i++) {

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