var protectBall = new Vue({
    el: "#protectBall",
    data: {
        bgStage: null,//背景旋转的圈圈
        ballStage:null,//这是小球球
        circleDeg: 1.5 * Math.PI,
        circleX: 200,
        circleY: 400,
        circleR: 40,
        centerCircleR: 10,
        smallBallDeg: 2 * Math.PI,
        smallBallR: 5
    },
    methods: {
        // 旋转的条件
        getRandom() {
            return parseInt(Math.random() * 360);
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
        // 开始旋转
        leftRotate() {
            this.bgStage.clearRect(this.circleX - 40, this.circleY - 40, 80, 80)
            this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg);
            this.bgStage.translate(this.circleX, this.circleY);
            this.bgStage.rotate(this.getRandom() * Math.PI / 180);
            this.bgStage.beginPath();
            this.bgStage.arc(0, 0, this.circleR, 0, 1.5 * Math.PI);
            this.bgStage.stroke();
            this.bgStage.rotate(-this.rotation * Math.PI / 180);
            this.bgStage.translate(-this.circleX, -this.circleY); //坐标转换必须为旋转回去之后
        },
        // 绘制小球球
        drawSmallBall() {
            this.bgStage.beginPath();
            this.bgStage.arc(20, 20, this.smallBallR, 0, this.smallBallDeg);
            this.bgStage.fill();
            this.getLineFunction(20,20);
        },
        getLineFunction(x1, y1) {
            // 求随机小球到中心点的直线公式；y=kx+b；
            var k = (y1 - this.circleY) / (x1 - this.circleX);
            var b = y1 - k * x1;
            // 求下一步的值
            var x2 = x1 + 10;
            var y2 = x2 * k + b;
            // 重新绘制移动的小球球
            this.reDrawSmallBall(x1,y1,x2, y2);
        },
        reDrawSmallBall(x1,y1,x2,y2) {
            this.bgStage.clearRect(x1-this.smallBallR, y1-this.smallBallR, 2*this.smallBallR, 2*this.smallBallR)
            this.bgStage.beginPath();
            this.bgStage.arc(x2, y2, this.smallBallR, 0, this.smallBallDeg);
            this.bgStage.fill();
        },
        //移动小球球
        moveBall(){

        } 
    },
    mounted() {
        var c = document.getElementById("bgStage");
        this.bgStage = c.getContext("2d");
        // 画圈圈
        this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg);
        this.drawCircle(this.circleX, this.circleY, this.circleR, this.circleDeg);
    },
})