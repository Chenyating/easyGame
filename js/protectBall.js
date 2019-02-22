var protectBall = new Vue({
    el: "#protectBall",
    data: {
        context: null,
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
            this.context.beginPath();
            this.context.arc(x, y, r, 0, deg);
            this.context.stroke();
        },
        // 绘制内部小球球
        drawCenterCircle(x, y, r, deg) {
            this.context.beginPath();
            this.context.arc(x, y, r, 0, deg);
            this.context.fill();
        },
        // 开始旋转
        leftRotate() {
            this.context.clearRect(this.circleX - 40, this.circleY - 40, 80, 80)
            this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg);
            this.context.translate(this.circleX, this.circleY);
            this.context.rotate(this.getRandom() * Math.PI / 180);
            this.context.beginPath();
            this.context.arc(0, 0, this.circleR, 0, 1.5 * Math.PI);
            this.context.stroke();
            this.context.rotate(-this.rotation * Math.PI / 180);
            this.context.translate(-this.circleX, -this.circleY); //坐标转换必须为旋转回去之后
        },
        // 获取鼠标在canvas的坐标
        getMousePosition(e) {
            console.log(e.offsetX, e.offsetY)
        },
        // 绘制小球球
        drawSmallBall() {
            this.context.beginPath();
            this.context.arc(20, 20, this.smallBallR, 0, this.smallBallDeg);
            this.context.fill();
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
            this.context.clearRect(x1-this.smallBallR, y1-this.smallBallR, 2*this.smallBallR, 2*this.smallBallR)
            this.context.beginPath();
            this.context.arc(x2, y2, this.smallBallR, 0, this.smallBallDeg);
            this.context.fill();
        },
        //移动小球球
        moveBall(){

        } 
    },
    mounted() {
        var c = document.getElementById("stage");
        this.context = c.getContext("2d");
        // 画圈圈
        this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg);
        this.drawCircle(this.circleX, this.circleY, this.circleR, this.circleDeg);
    },
})