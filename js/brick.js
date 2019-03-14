var brick = new Vue({
    el: "#brick",
    data: {
        // 画布配置
        canvasWidth: 310,
        canvasHeight: 500,
        canvasCenterX: 0,
        // 整块画布
        context: null,
        // 滑块配置
        sliderX: 125,
        sliderY: 490,
        sliderWidth: 100, //滑块宽度
        sliderHeight: 10, //滑块高度
        sliderCenter: null, //滑块中心
        sliderSpeed: 15, //滑块速度
        // 滑块移动到的位置
        mouseX: null,
        position: 1, //1为右，-1为左
        redraw: null, //滑块移动的循环作用
        // 砖头们的设置
        blocksContext: null,
        blocks: null,
        blocksWidth: 9,
        // 小红砖
        redBlock: null,
        redX: 150,
        redY: 480,
        redK: -1,
        redB: null,
        redM: 1,
        rered: null,
        redSpeed: 20,
        // 分值记录
        fail: 0,
        score: 0
    },
    methods: {
        begin() {
            // this.changgeKM();
            // clearTimeout(this.rered)
            this.getLine(-1, 1);
        },
        gameOver() {
            // 刷新当前页面；
            // alert("刷新")
            window.location.reload();
          },
        /** 
         * 移动滑块的方法开始
         */
        //获取鼠标X的位置
        sliderDot(e) {
            this.mouseX = e.layerX - (this.sliderWidth / 2)
            // 判断鼠标点击的滑块的位置相对于滑块的方向
            if (this.mouseX >= this.sliderCenter) {
                // 右边
                this.position = 1
                this.moveSlider(this.sliderX, this.position)
            } else {
                // 左边
                this.position = -1
                this.moveSlider(this.sliderX, this.position)
            }
        },
        // 重新绘制滑块
        moveSlider(sliderX, x) {
            var that = this;
            // 移动循环
            clearTimeout(this.redraw);
            // 清除原来
            var bu = this.context;
            bu.clearRect(sliderX, this.sliderY, this.sliderWidth, this.sliderHeight)
            // 同步更新数据
            this.sliderX = sliderX + x
            // 重绘
            this.drawSlider(sliderX + x);
            // 条件判断：每次移动的时候先判断是否碰到墙壁
            this.sliderCenter = that.sliderX + 20
            if (this.sliderX >= (this.canvasWidth - this.sliderWidth) || this.sliderX <= 0) {
                // 如果碰到壁就停止
                clearTimeout(this.redraw);
                return;
            } else {
                // 判断一下滑块是否到鼠标点击的位置
                if (this.sliderCenter == this.mouseX) {
                    // 如果到达鼠标位置，就结束；
                    clearTimeout(this.redraw);
                    return;
                } else {
                    //否则就继续移动
                    this.redraw = setTimeout(() => {
                        this.moveSlider(sliderX + x, x);
                    }, this.sliderSpeed);
                    return;
                }
            }
        },
        // 绘制滑块
        drawSlider(x) {
            var bu = this.context
            bu.fillStyle = "#000000";
            bu.fillRect(x, this.sliderY, this.sliderWidth, this.sliderHeight);

        },
        /** 
         * 绘制砖头们开始
         */
        // 已知砖头数组，绘制砖头
        drawBlocks() {
            var that = this;
            var context = that.blocksContext;
            // 绘制众多小方块
            context.fillStyle = "#000000";
            for (var i = 0; i < that.blocks.length; i++) {
                for (var j = 0; j < that.blocks[i].length; j++) {
                    // 绘制方块
                    if (that.blocks[i][j][2] == 1) {
                        context.fillRect(that.blocks[i][j][0], that.blocks[i][j][1], this.blocksWidth, this.blocksWidth)
                    } else {
                        continue;
                    }
                }
            }
        },
        // 初始化砖头们的值，
        blocksArray() {
            var that = this;
            this.blocks = []
            for (var i = 0; i < (that.canvasWidth / 10); i++) {
                this.blocks[i] = []
                for (var j = 0; j < (that.canvasHeight / 10); j++) {
                    this.blocks[i][j] = []
                    // 10行以内有颜色
                    if (j < 30) {
                        var color = 1;
                    } else {
                        // 否则无颜色
                        var color = 0;
                    }
                    this.blocks[i][j][0] = i * 10;
                    this.blocks[i][j][1] = j * 10;
                    this.blocks[i][j][2] = color;
                }
            }
        },
        /**
         * 绘制移动小红
         */
        changgeKM() {
            if (this.sliderX - 10 <= this.redX && this.redX <= this.sliderX + 20) {
                this.redK = 0.5;
                this.redM = -1;
                this.getLine(this.redK, this.redM)
                return;
            }
            if (this.sliderX + 20 <= this.redX && this.redX <= this.sliderX + 40) {
                this.redK = 1;
                this.redM = -1;
                this.getLine(this.redK, this.redM)
                return;
            }
            if (this.sliderX + 40 <= this.redX && this.redX <= this.sliderX + 50) {
                this.redK = 2;
                this.redM = -1;
                this.getLine(this.redK, this.redM)
                return;
            }
            if (this.sliderX + 50 <= this.redX && this.redX <= this.sliderX + 60) {
                this.redK = -2;
                this.redM = 1;
                this.getLine(this.redK, this.redM)
                return;
            }
            if (this.sliderX + 60 <= this.redX && this.redX <= this.sliderX + 80) {
                this.redK = -1;
                this.redM = 1;
                this.getLine(this.redK, this.redM)
                return;
            }
            if (this.sliderX + 80 <= this.redX && this.redX <= this.sliderX + 110) {
                this.redK = -0.5;
                this.redM = 1;
                this.getLine(this.redK, this.redM)
                return;
            }
            this.getLine(this.redK, this.redM)
            return;
        },
        // 计算红砖所在的直线函数,m为移动的距离
        getLine(k, m) {
            this.redB = this.redY - k * this.redX;
            // console.log("y=" + k + "*x+" + this.redB, m)
            this.moveRed(k, this.redB, m, this.redX, this.redY)
        },
        // 碰壁结束移动，左右反弹
        turnLeftRight(k, m) {
            this.redK = -k;
            this.redM = -m
            // console.log("左右换方向！", this.redK, this.redM)
            // 反弹，获取反弹的直线函数，继续移动
            this.getLine(this.redK, this.redM)
        },
        // 碰壁结束移动，左右反弹
        turnUpDown(k, m) {
            this.redK = -k;
            this.redM = m;
            // console.log("下换方向！", this.redK, this.redM)
            // 反弹，获取反弹的直线函数，继续移动
            this.getLine(this.redK, this.redM)
        },
        // 重新绘制小红
        moveRed(k, b, m, x, y) {
            // 移动循环
            clearTimeout(this.rered);
            // 1、判断小红是否超出到左右壁；
            if ((x + m) >= this.canvasWidth || (x + m) <= 0) {
                // 左右反弹
                this.turnLeftRight(k, m);
                return;
            }
            // 2、小红等到顶底部；
            // 2.1、判断小红是否超出到顶部；
            if ((x + m) * k + b <=0) {
                this.turnUpDown(k, m);
                return;
            }
            // 2.2、判断小红在底部时
            if ((x + m) * k + b >= 480) {
                // 判断小红是否在长条上
                if (this.redX >= this.sliderX - 10 && this.redX <= (this.sliderX + this.sliderWidth)) {
                    // 3.1判断小红在长条上,要改变k和m的值；
                    console.log("在长条上")
                    this.changgeKM();
                    return;
                } else {
                    console.log("不在长条上")
                    // 3.2、判断小红不在长条上；落地计算，游戏结束
                    var nowfail = this.fail + 1;
                    this.fail = nowfail;
                    // this.turnUpDown(k, m);
                    clearTimeout(this.rered);
                    return;
                }
            }
            // 4、小红在框内
            else{
                // 4、判断小红是否碰到小白块；
                var i = parseInt((x + m) / 10);
                var j = parseInt(((x + m) * k + b) / 10);
                if (this.blocks[i][j][2] == 1) {
                    // 判断一下头顶有没有小白
                    this.blocks[i][j][2] = 0;
                    this.blocksContext.clearRect(this.blocks[i][j][0], this.blocks[i][j][1], this.blocksWidth, this.blocksWidth);
                    // 分值计算
                    var nowscore = this.score + 1;
    
                    this.score = nowscore;
                    // 重绘小白
                    this.drawBlocks();
                    // 碰到小白随机反弹
                    if (parseInt(Math.random() * 2) == 1) {
                        this.turnLeftRight(k, m);
                        return;
                    } else {
                        this.turnUpDown(k, m);
                        return;
                    }
                } else {
                //5、 绘制下一个小红；
                this.painNextRed(k, b, m, x, y);
                }
            }

        },
        // 绘制下一个小红；
        painNextRed(k, b, m, x, y) {
            // 绘制出现下一个小红
            // 清除原来
            var bu = this.redBlock;
            bu.clearRect(x-m, (x-m)*k+b, this.canvasWidth, this.canvasHeight);
            var xred = x + m;
            var yred = (x + m) * k + b
            // 在壁内
            this.redX = xred;
            this.redY = yred

            // 同步更新数据绘制下一个小方块
            this.drawRed(this.redX, this.redY);
            // 循环移动小红继续移动
            this.rered = setTimeout(() => {
                this.moveRed(this.redK, this.redB, this.redM, this.redX, this.redY);
            }, this.redSpeed);
        },
        // 绘制小红
        drawRed(x, y) {
            var bu = this.redBlock
            bu.fillStyle = "red"
            bu.fillRect(x, y, this.blocksWidth, this.blocksWidth)
        }
    },
    mounted() {
        var that = this;
        this.blocksArray();
        this.canvasCenterX = that.canvasWidth / 2;
        this.sliderCenter = that.sliderX + that.sliderWidth / 2
        // this.blocksArray();
        this.context = document.getElementById('slider').getContext("2d"); //滑块
        this.blocksContext = document.getElementById('bg').getContext("2d"); //砖块们
        this.redBlock = document.getElementById('red').getContext("2d"); //红砖
        // 绘制砖头们
        this.drawBlocks();
        // 绘制红砖头
        this.drawRed(this.redX, this.redY);
        // 绘制滑块
        this.drawSlider(this.sliderX, this.sliderY)
    },
    watch: {
        position: function (val) {
            clearTimeout(this.redraw);
        }
    },
});