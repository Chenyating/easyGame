var protectBall = new Vue({
    el: "#protectBall",
    data: {
        bgStage: null, //背景旋转的圈圈
        ballStage: null, //这是小球球
        canvasWidth: 400,
        canvasHeight: 800,
        circleDeg: 1.5 * Math.PI,
        circleX: 200,
        circleY: 400,
        circleR: 40,
        centerCircleR: 10,
        smallBallDeg: 2 * Math.PI,
        smallBallR: 5,
        x1: 0,
        y1: 0
    },
    methods: {
        // 随机取值
        ramdomDeg(){
            return parseInt(Math.random()*4) ;
        },
        randomX() {
            return parseInt(Math.random() * this.canvasWidth);
        },
        randomY() {
            return parseInt(Math.random() * this.canvasHeight);
        },
        // 绘制外部大框框
        drawCircle(x, y, r, deg) {
            this.bgStage.beginPath();
            this.bgStage.arc(x, y, r, 0, deg);
            this.bgStage.stroke();
        },
        // 绘制内部小球球
        drawCenterCircle(x, y, r, deg) {
            this.bgStage.beginPath();
            this.bgStage.arc(x, y, r, 0, deg);
            this.bgStage.fill();
        },
        // 大框框旋转
        leftRotate() {
            this.bgStage.clearRect(this.circleX - 40, this.circleY - 40, 80, 80)
            this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg);
            this.bgStage.translate(this.circleX, this.circleY);
            this.bgStage.rotate(this.ramdomDeg() * Math.PI / 2);
            this.bgStage.beginPath();
            this.bgStage.arc(0, 0, this.circleR, 0, 1.5 * Math.PI);
            this.bgStage.stroke();
            this.bgStage.translate(-this.circleX, -this.circleY); //坐标转换必须为旋转回去之后
        },
        // 绘制小球球
        drawSmallBall() {
            this.ballStage.beginPath();
            this.ballStage.arc(this.x1, this.y1, this.smallBallR, 0, this.smallBallDeg);
            this.ballStage.fill();
        },
        // 小球直线路径公式
        getLineFunction(x1, y1) {
            // 求随机小球到中心点的直线公式；y=kx+b；
            var k = (y1 - this.circleY) / (x1 - this.circleX);
            var b = y1 - k * x1;
            // 求完以后开始绘画移动的小球球
            this.moveSmallBall(k, b, x1, y1);
        },
        // 小球向下一格的重绘
        moveSmallBall(k, b, x1, y1) {
            var myVar = null;
            clearTimeout(myVar);
            // 求下一步的值
            // 先判断一下X,Y的值，要朝哪个方向向中心去；
            if(y1<this.circleY){
                var x2 = (y1-b)/k;
                var y2 = y1+1;
            }
            if(y1>this.circleY){
                var x2 = (y1-b)/k;
                var y2 = y1-1;
            }
            if(y1==this.circleY){
                var x2 = (y1-b)/k;
                var y2 = y1;
            }
            console.log(k,b,x2,y2)
            // 重新绘制移动的小球球
            this.ballStage.clearRect(x1 - this.smallBallR, y1 - this.smallBallR, 2 * this.smallBallR, 2 * this.smallBallR)
            this.ballStage.beginPath();
            this.ballStage.arc(x2, y2, this.smallBallR, 0, this.smallBallDeg);
            this.ballStage.fill();
            // 判断小球球是不是到达终点了
            if (y2 != this.circleY||x2 != this.circleX) {
                myVar = setTimeout(() => {
                    this.moveSmallBall(k, b, x2, y2)
                }, 50);
            }
            // 到达了就退出吧~
            if (y2 == this.circleY||x2 == this.circleX) {
                console.log("结束啊！")
                clearTimeout(myVar);
                return;
            }
        },
        // 开始出现众多小球球们
        randomSmallBall() {

            this.getLineFunction(0, this.randomY());
            this.getLineFunction(this.canvasWidth, this.randomY());
            this.getLineFunction(this.randomY(),0);
            this.getLineFunction(this.randomY(),this.canvasHeight);
            // for (var i = 0; i < 10; i++) {
            //     this.getLineFunction(this.randomX(), 0);
            // }
        }

    },
    mounted() {
        var c1 = document.getElementById("bgStage");
        this.bgStage = c1.getContext("2d");
        var c2 = document.getElementById("ballStage");
        this.ballStage = c2.getContext("2d");
        // 画圈圈
        this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg);
        this.drawCircle(this.circleX, this.circleY, this.circleR, this.circleDeg);
    },
})