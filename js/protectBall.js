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
    oldDeg: 0,
    angle: null,
    dotR: 1, //像素大小
  },
  methods: {
    // 随机取任意值:没毛病；
    randomN(num) {
      var x = parseInt(Math.random() * num);
      return x;
    },
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
      this.bgStage.fillStyle = "green";
      this.bgStage.arc(x, y, r, 0, deg);
      this.bgStage.fill();
    },
    // 绘制外部大框框：没毛病；
    drawCircle(x, y, r, deg) {
      this.bgStage.beginPath();
      this.bgStage.strokeStyle = "#2ab2a9";
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
    // 判断小球的角度
    whichQuadrant(k, x1, y1) {
      if (k <= 0) {
        k = -k;
      }
      // 现在鼠标的角度；
      var angleK = Math.atan(k);
      // 第一象限
      if (x1 > this.circleX && y1 < this.circleY) {
        return (angleK = Math.PI - angleK);
        // 第二象限
      } else if (x1 < this.circleX && y1 < this.circleY) {
        return (angleK = angleK);
        // 第三象限
      } else if (x1 < this.circleX && y1 > this.circleY) {
        return (angleK = 2 * Math.PI - angleK);
        // 第四象限
      } else if (x1 > this.circleX && y1 > this.circleY) {
        return (angleK = Math.PI + angleK);
      }
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
      console.log(Math.atan(k));
      // 求完以后开始绘画移动的小球球
      this.moveSmallBall(k, b, x1, y1);
    },
    // 求下一步的值,重绘，然后再判断是否到达边界:没毛病
    getNextXYR(k, b, x1, y1) {
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
      this.drawSmallBall(x1, y1, x2, y2, "red");
      myVar = setTimeout(() => {
        this.moveSmallBall(k, b, x2, y2);
      }, 10);
    },
    // 求下一步的值,重绘：没毛病
    getNextXYK(k, b, x1, y1) {
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
      this.drawSmallBall(x1, y1, x2, y2, "red");
    },
    // 求下一步的值,重绘，然后再判断是否到中心点：没毛病
    getNextXYC(k, b, x1, y1) {
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
      this.drawSmallBall(x1, y1, x2, y2, "green");
      myVar = setTimeout(() => {
        this.ifCenter(k, b, x2, y2);
      }, 10);
    },
    // 绘制小球球:1为初始，2为现状：没毛病
    drawSmallBall(x1, y1, x2, y2, color) {
      // 清空原来的小球球；
      this.ballStage.clearRect(
        x1 - this.smallBallR,
        y1 - this.smallBallR,
        2 * this.smallBallR,
        2 * this.smallBallR
      );
      // 重新绘制移动的小球球

      this.ballStage.beginPath();
      this.ballStage.fillStyle = color;
      this.ballStage.arc(x2, y2, this.smallBallR - 1, 0, this.smallBallDeg);
      this.ballStage.fill();
    },
    // 判断是否到中心了：没毛病
    ifCenter(k, b, x1, y1) {
      if (x1 == this.circleX && y1 == this.circleY) {
        clearTimeout(myVar);

        console.log("到达中心了");
        return;
      } else {
        this.getNextXYC(k, b, x1, y1);
      }
    },
    // 小球向下一格的重绘：重点部分：没毛病
    moveSmallBall(k, b, x1, y1) {
      var myVar = null;
      clearTimeout(myVar);
      var r1 =
        (x1 - this.circleX) * (x1 - this.circleX) +
        (y1 - this.circleY) * (y1 - this.circleY);
      var r2 = this.circleR * this.circleR;
      // 没有到达边界，则继续前进；
      if (r1 > r2) {
        // 那么(x,y),x+1判断；
        this.getNextXYR(k, b, x1, y1);
        return;
      }
      // 到达边界，判断一下，此时K值是否在缺口的范围之内；
      if (r1 <= r2) {
        // 判断一下小球所在的象限
        var angleK = this.whichQuadrant(k, x1, y1);
        // 判断一下小球所在的象限
        if (angleK > this.angle && angleK <= this.angle + Math.PI / 2) {
          this.getNextXYK();
          // 判断是否到达中心
          this.ifCenter(k, b, x1, y1);
          return;
        }
        // k值不在缺口范围之内，结束；
        else {
          clearTimeout(myVar);
          // 清空原来的小球球；
          this.ballStage.clearRect(
            x1 - this.smallBallR,
            y1 - this.smallBallR,
            2 * this.smallBallR,
            2 * this.smallBallR
          );
          // 这里要写一个炸裂的动画效果；
          this.specialEffects(x1, y1, this.smallBallR);
          return;
        }
      }
    },

    // 以下是小球到达边界时的动画效果；
    // 获取小球到达边界的像素点：没毛病
    specialEffects(x, y, r) {
      // 绘制新的；
      this.ballStage.beginPath();
      this.ballStage.fillStyle = "red";
      this.ballStage.arc(x, y, r, 0, Math.PI * 2);
      this.ballStage.fill();
      var imgData = this.ballStage.getImageData(x, y, 2 * this.smallBallR, 2 * this.smallBallR);
      console.log(imgData)
      // 把原来的图像去掉；
      this.ballStage.clearRect(x - this.smallBallR, y - this.smallBallR, 2 * this.smallBallR, 2 * this.smallBallR);

      for (var i = 0; i < imgData.width; i += this.dotR) {
        for (var j = 0; j < imgData.height; j += this.dotR) {
          if (imgData.data[i + 3] >= 128) {
            this.painDot(i + x, y + j, this.dotR)
          }
        }
      }
    },
    // 绘制：像素点：没毛病
    painDot(x, y, r) {
      this.ballStage.beginPath();
      this.ballStage.fillStyle = "red";
      this.ballStage.arc(x, y, r, 0, Math.PI * 2);
      this.ballStage.fill();
      this.readyMove(x, y)
    },
    // 像素点各自开始移动：没毛病
    readyMove(x, y) {
      // 
      if(this.randomN(2)==0){

      }
      else{

        if (this.randomN(2) == 0) {
          var k = this.randomN(2)
          var b = this.randomN(10)
        } else {
          var k = -this.randomN(2)
          var b = this.randomN(10)
        }
        console.log(k,b,x,y)
        this.moveDot(k, b, x, y);
      }
    },
    // 小球向下一格的重绘：重点部分：没毛病
    moveDot(k, b, x1, y1) {
      var myVar = null;
      clearTimeout(myVar);
      // 先判断一下X,Y的值，要朝哪个方向向中心去；
      // if (y1 < this.circleY) {
      //   var x2 = (y1 - b) / k;
      //   var y2 = y1 + 1;
      // }
      // if (y1 > this.circleY) {
      //   var x2 = (y1 - b) / k;
      //   var y2 = y1 - 1;
      // }
      // this.getNextXYK(k,b,x1,y1)

    },
  },
  mounted() {
    // 选择外框
    var c1 = document.getElementById("bgStage");
    this.bgStage = c1.getContext("2d");
    // 移动小球
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

    this.specialEffects(300, 500, this.smallBallR);
  }
});