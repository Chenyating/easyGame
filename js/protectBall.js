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
    circleDeg1: 0,
    circleDeg1: Math.PI / 2,
    centerCircleR: 10,
    smallBallDeg: 2 * Math.PI,
    smallBallR: 5,
    x1: 0,
    y1: 0,
    oldDeg: 0,
    angle: null
  },
  methods: {
    // 随机取x值，x不能在x轴上:没毛病；
    randomX() {
      var x = parseInt(Math.random() * this.canvasWidth);
      if (x == this.circleX) {
        this.randomX();
      }
      return x;
    },
    // 随机取y值，y不能再y轴上：没毛病；
    randomY() {
      var y = parseInt(Math.random() * this.canvasHeight);
      if (y == this.circleY) {
        this.randomY();
      }
      return y;
    },
    // 绘制内部小球球：没毛病；
    drawCenterCircle(x, y, r, deg) {
      this.bgStage.beginPath();
      this.bgStage.arc(x, y, r, 0, deg);
      this.bgStage.fill();
    },
    // 绘制外部大框框：没毛病；
    drawCircle(x, y, r, deg) {
      this.bgStage.beginPath();
      this.bgStage.arc(x, y, r, 0, deg);
      this.bgStage.stroke();
    },
    // 大框框旋转，参数为旋转的角度（newDeg）：没毛病；
    ballRotate(newDeg) {
      this.bgStage.clearRect(this.circleX - 40, this.circleY - 40, 80, 80);
      this.drawCenterCircle(
        this.circleX,
        this.circleY,
        this.centerCircleR,
        this.smallBallDeg
      );
      this.bgStage.translate(this.circleX, this.circleY);
      this.bgStage.rotate(newDeg);
      this.bgStage.beginPath();
      this.bgStage.arc(0, 0, this.circleR, 0, 1.5 * Math.PI);
      this.bgStage.stroke();
      this.bgStage.translate(-this.circleX, -this.circleY); //坐标转换必须为旋转回去之后
    },
    // 获取鼠标在界面上的位置：旋转：没毛病；
    getMousePosition(event) {
      // 全部都化成绝对值；
      if (event.clientX > this.circleX) {
        var x = event.clientX - this.circleX;
      } else {
        var x = this.circleX - event.clientX;
      }
      if (event.clientY > this.circleY) {
        var y = event.clientY - this.circleY;
      } else {
        var y = this.circleY - event.clientY;
      }
      // 现在鼠标的角度；
      this.angle = Math.atan(y / x);

      // 第一象限
      if (event.clientX > this.circleX && event.clientY < this.circleY) {
        this.angle = Math.PI - this.angle;
        // 第二象限
      } else if (event.clientX < this.circleX && event.clientY < this.circleY) {
        this.angle = this.angle;
        // 第三象限
      } else if (event.clientX < this.circleX && event.clientY > this.circleY) {
        this.angle = 2 * Math.PI - this.angle;
        // 第四象限
      } else if (event.clientX > this.circleX && event.clientY > this.circleY) {
        this.angle = Math.PI + this.angle;
      }

      if (this.oldDeg == 0) {
        this.ballRotate(this.angle);
        this.oldDeg = this.angle;
      } else {
        //   需要移动的角度
        var newDeg = this.angle - this.oldDeg;
        //   于是新的鼠标角度将成为旧的鼠标角度；
        this.oldDeg = this.angle;
        this.ballRotate(newDeg);
      }
    },
    // 开始出现众多小球球们：没毛病；
    randomSmallBall() {
      this.getLineFunction(0, this.randomY());
      this.getLineFunction(this.canvasWidth, this.randomY());
      this.getLineFunction(this.randomX(), 0);
      this.getLineFunction(this.randomX(), this.canvasHeight);
    },

    // 小球直线路径公式：得到，K,B,X1,Y1:没毛病；
    getLineFunction(x1, y1) {
      // 求随机小球到中心点的直线公式；y=kx+b；
      var k = (y1 - this.circleY) / (x1 - this.circleX);
      var b = y1 - k * x1;
      // 求完以后开始绘画移动的小球球
      this.moveSmallBall(k, b, x1, y1);
    },
    // 求下一步的值
    getNextXY(k, b, x1, y1) {
      // 求下一步的值
      // 先判断一下X,Y的值，要朝哪个方向向中心去；
      if (y1 < this.circleY) {
        var x2 = (y1 - b) / k;
        var y2 = y1 + 1;
      }
      if (y1 > this.circleY) {
        var x2 = (y1 - b) / k;
        var y2 = y1 - 1;
      }
      // 求完下一步的值后，还是重新绘制小球；
      this.drawSmallBall(x1, y1, x2, y2);
      myVar = setTimeout(() => {
        this.moveSmallBall(k, b, x2, y2);
      }, 10);
    },
    // 绘制小球球:1为初始，2为现状；
    drawSmallBall(x1, y1, x2, y2) {
      // 清空原来的小球球；
      this.ballStage.clearRect(
        x1 - this.smallBallR,
        y1 - this.smallBallR,
        2 * this.smallBallR,
        2 * this.smallBallR
      );
      // 重新绘制移动的小球球
      this.ballStage.beginPath();
      this.ballStage.arc(x2, y2, this.smallBallR, 0, this.smallBallDeg);
      this.ballStage.fill();
    },
    // 小球向下一格的重绘：重点部分；
    moveSmallBall(k, b, x1, y1) {
      var myVar = null;
      clearTimeout(myVar);
      var r1 =
        (x1 - this.circleX) * (x1 - this.circleX) +
        (y1 - this.circleY) * (y1 - this.circleY);
      var r2 = this.circleR * this.circleR;
      // 没有到达边界，则继续前进；
      if (r1 != r2) {
        // 那么(x,y),x+1判断；
        this.getNextXY(k, b, x1, y1);
      }
      // 到达边界，判断一下，此时K值是否在缺口的范围之内；
      if(r1==r2) {
        console.log("相等")
        // k值在缺口范围内；
        if (
          k < Math.tan(this.angle) ||
          k > Math.tan(Math.PI / 2 + this.angle)
        ) {
          console.log(Math.tan(this.angle))
          // 判断是否到达中心
          this.ifCenter(k, b, x1, y1);
        }
        // k值不在缺口范围之内，结束；
        else {
          clearTimeout(myVar);
          return;
        }
      }
    },
    // 判断是否到中心了
    ifCenter(k, b, x1, y1) {
      if (x1 == this.circleX && y1 == this.circleY) {
        clearTimeout(myVar);
        console.log("到达中心了")
        return;
      } else {
        this.getNextXY(k, b, x1, y1);
      }
    }
  },
  mounted() {
    var c1 = document.getElementById("bgStage");
    this.bgStage = c1.getContext("2d");
    var c2 = document.getElementById("ballStage");
    this.ballStage = c2.getContext("2d");
    // 画圈圈
    this.drawCenterCircle(
      this.circleX,
      this.circleY,
      this.centerCircleR,
      this.smallBallDeg
    );
    this.drawCircle(this.circleX, this.circleY, this.circleR, this.circleDeg);
    this.ballRotate(-Math.PI / 2);
  }
});
