var protectBall = new Vue({
  el: "#protectBall",
  data: {
    bgStage: null, //背景旋转的圈圈
    ballStage: null, //这是小球球
    // 画布长宽
    canvasWidth: 400,
    canvasHeight: 800,
    // 大圆圈
    circleDeg: 1.5 * Math.PI,
    circleX: 200,
    circleY: 400,
    circleR: 50,
    // 中心小球
    centerCircleR: 10,
    smallBallDeg: 2 * Math.PI,
    smallBallR: 5,
    // 框框旋转的角度
    oldDeg: 0,
    angle: null,
    // 炸开特性例子半径；
    dotR: 1, //像素大小

    scope: 0, //分数
    subDeg: Math.PI / 12, //每次减少的度数
    changgeNum: 20, //变化的条件，分数每增加n分就，角度减少
    gameState: 0, //游戏状态

    gameTime: 0,
    // 颜色设置：
    safeColor: "#00FFFF", //安全颜色
    dangerColor: "#DC143C", //危险颜色
    nomalColor: "yellow" //正常颜色
  },
  methods: {
    begin() {
      if (this.gameState != 0) {
        //游戏未开始时候
        $("#title").html("");
        $("#title").html("游戏开始");
        this.gameOver();
      } else {

        this.gameState = 1;
        $("#title").html("");
        $("#title").html("游戏结束");
        this.randomSmallBall();
        this.getTime();
      }
    },
    // 计算时间
    getTime(){
      var timeVar=null;
      clearTimeout(timeVar);
      this.gameTime+=1;
      if(this.gameState==0){
        clearTimeout(timeVar);
      }
      else{
         timeVar = setTimeout(() => {
           this.getTime();
        }, 1000);
      }
    },
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
      this.bgStage.fillStyle = "#FFFF00";
      this.bgStage.arc(x, y, r, 0, deg);
      this.bgStage.fill();
    },
    // 绘制外部大框框：没毛病；
    drawCircle(x, y, r, deg) {
      this.bgStage.beginPath();
      this.bgStage.strokeStyle = "#00FF80";
      this.bgStage.arc(x, y, r, 0, deg);
      this.bgStage.stroke();
    },
    // 大框框旋转，参数为旋转的角度（newDeg）：没毛病；
    ballRotate(newDeg) {
      this.bgStage.clearRect(this.circleX - this.circleR, this.circleY - this.circleR, 2 * this.circleR, 2 * this.circleR);
      this.drawCenterCircle(
        this.circleX,
        this.circleY,
        this.centerCircleR,
        this.smallBallDeg
      );
      this.bgStage.translate(this.circleX, this.circleY);
      this.bgStage.rotate(newDeg);
      this.bgStage.beginPath();
      this.bgStage.arc(0, 0, this.circleR, 0, this.circleDeg);
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
      if (event.layerX > this.circleX) {
        var x = event.layerX - this.circleX;
      } else {
        var x = this.circleX - event.layerX;
      }
      if (event.layerY > this.circleY) {
        var y = event.layerY - this.circleY;
      } else {
        var y = this.circleY - event.layerY;
      }
      // 现在鼠标的角度；
      this.angle = Math.atan(y / x);

      // 第一象限
      if (event.layerX > this.circleX && event.layerY < this.circleY) {
        this.angle = Math.PI - this.angle;
        // 第二象限
      } else if (event.layerX < this.circleX && event.layerY < this.circleY) {
        this.angle = this.angle;
        // 第三象限
      } else if (event.layerX < this.circleX && event.layerY > this.circleY) {
        this.angle = 2 * Math.PI - this.angle;
        // 第四象限
      } else if (event.layerX > this.circleX && event.layerY > this.circleY) {
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
    // 随机出现一个安全小球球
    safeBall() {
      var randomColor = this.randomN(5);
      if (randomColor == 1) {
        this.getLineFunction(0, this.randomY(), this.safeColor);
      }
      if (randomColor == 2) {
        this.getLineFunction(this.canvasWidth, this.randomY(), this.safeColor);
      }
      if (randomColor == 3) {
        this.getLineFunction(this.randomX(), 0, this.safeColor);
      }
      if (randomColor == 4) {
        this.getLineFunction(this.randomX(), this.canvasHeight, this.safeColor);
      }
    },
    // 开始出现众多小球球们：没毛病；
    randomSmallBall() {
      var randomBall = null;
      clearTimeout(randomBall);
      this.getLineFunction(0, this.randomY(), this.nomalColor);
      this.getLineFunction(this.canvasWidth, this.randomY(), this.nomalColor);
      this.getLineFunction(this.randomX(), 0, this.nomalColor);
      this.getLineFunction(this.randomX(), this.canvasHeight, this.nomalColor);
      // 随机出现一个安全的小球球
      if(this.randomN(3)==1){
        this.safeBall();
      }
      // 当框半径小于等于中心球半径，或者角度为0；游戏结束；
      if (this.circleR <= this.smallBallR || this.circleDeg == 0) {
        this.gameOver();
        clearTimeout(randomBall);
        return;
      } else {
        randomBall = setTimeout(() => {
          this.randomSmallBall();
        }, 4000);
      }
    },
    // 小球直线路径公式：得到，K,B,X1,Y1:没毛病；
    getLineFunction(x1, y1, color) {
      // 求随机小球到中心点的直线公式；y=kx+b；
      var k = (y1 - this.circleY) / (x1 - this.circleX);
      var b = y1 - k * x1;
      // 求完以后开始绘画移动的小球球
      this.moveSmallBall(k, b, x1, y1, color);
    },
    // 小球向下一格的重绘：重点部分：没毛病
    moveSmallBall(k, b, x1, y1, color) {
      var myVar = null;
      clearTimeout(myVar);
      var r1 =
        (x1 - this.circleX) * (x1 - this.circleX) +
        (y1 - this.circleY) * (y1 - this.circleY);
      var r2 = this.circleR * this.circleR;
      // 没有到达边界，则继续前进；
      if (r1 > r2) {
        // 那么(x,y),x+1判断；
        this.getNextXY(k, b, x1, y1, 1, color);
        return;
      }
      // 到达边界，判断一下，此时K值是否在缺口的范围之内；
      if (r1 <= r2) {
        // 判断一下小球所在的象限
        var angleK = this.whichQuadrant(k, x1, y1);
        // 判断一下小球所在的象限
        if (angleK > this.angle - parseInt(this.scope / this.changgeNum) * this.subDeg && angleK <= this.angle + (2 * Math.PI - this.circleDeg)) {
          this.getNextXY(k, b, x1, y1, 0, color);
          // 判断是否到达中心
          this.ifCenter(k, b, x1, y1, color);
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
          this.scope+=1;
          this.specialEffects(x1, y1, this.smallBallR);
          return;
        }
      }
    },
    // 求下一步的值,重绘，然后再判断是否到达边界:没毛病
    getNextXY(k, b, x1, y1, judge, color) {
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

      // 继续前进
      if (judge == 0) {
        this.drawSmallBall(x1, y1, x2, y2, color);
        return;
      }
      // 判断是否到达边界
      if (judge == 1) {
        this.drawSmallBall(x1, y1, x2, y2, color);
        myVar = setTimeout(() => {
          this.moveSmallBall(k, b, x2, y2, color);
        }, 10);
        return;
      }
      // 判断是否到中心点
      if (judge == 2) {
        // 判断一下，进入圈内的是否是安全小球
        if (color == this.safeColor) {
          this.drawSmallBall(x1, y1, x2, y2, this.safeColor);
        } else {
          this.drawSmallBall(x1, y1, x2, y2, this.dangerColor);
        }
        myVar = setTimeout(() => {
          this.ifCenter(k, b, x2, y2, color);
        }, 10);
        return;
      }
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
      this.ballStage.globalAlpha = 1;
      this.ballStage.fill();
    },
    // 判断是否到中心了：没毛病
    ifCenter(k, b, x1, y1, color) {
      console.log(color)
      if (x1 == undefined && y1 == undefined) {
        this.bgStage.clearRect(this.circleX - this.centerCircleR, this.circleX - this.centerCircleR, 2 * this.centerCircleR, 2 * this.centerCircleR);
        if(color==this.safeColor){
          // 若为蓝色小球，小球半径减小，外框半径增大，分数加5
          this.centerCircleR -= 1;
          this.circleR+=5;
          this.scope+=5;
        }
        else{
          // 红色小球进入，小球半径增大
          this.centerCircleR+=2;
        }
        return;
      } else {
        this.getNextXY(k, b, x1, y1, 2, color);
      }
    },

    // 以下是小球到达边界时的动画效果；
    // 获取小球到达边界的像素点：没毛病
    specialEffects(x, y, r) {
      // 绘制新的；
      this.ballStage.beginPath();
      this.ballStage.fillStyle = "yellow";
      this.ballStage.arc(x, y, r, 0, Math.PI * 2);
      this.ballStage.fill();
      var imgData = this.ballStage.getImageData(x, y, 2 * this.smallBallR, 2 * this.smallBallR);
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
      this.ballStage.fillStyle = "yellow";
      this.ballStage.arc(x, y, r, 0, Math.PI * 2);
      this.ballStage.fill();
      this.readyMove(x, y)
    },
    // 像素点各自开始移动：没毛病
    readyMove(x, y) {
      var k = this.randomN(4);
      if (this.randomN(2) == 1) {
        k = -k;
      } else {
        k = k;
      }
      var b = y - k * x;
      this.moveDot(k, b, x, y, 100)
    },
    // 像素点移动
    moveDot(k, b, x, y, t) {
      var dotVar = null;
      clearTimeout(dotVar);
      //   // 判断以下，一会像素点要朝哪个方向移动
      if (this.randomN(2) == 1) {
        var x2 = x + 10;
      }
      if (this.randomN(2) == 0) {
        var x2 = x - 10
      }
      var y2 = k * x2 + b;
      //   // 求完下一步的值后，还是重新绘制小球；
      this.ballStage.clearRect(x - this.dotR, y - this.dotR, 2 * this.dotR, 2 * this.dotR);
      this.ballStage.beginPath();
      this.ballStage.fillStyle = "yellow";
      this.ballStage.arc(x2, y2, this.dotR, 0, Math.PI * 2);
      this.ballStage.fill();
      //   // 让像素点透明
      t -= 1;
      if (t >= 0) {
        this.ballStage.globalAlpha -= 0.3;
        dotVar = setTimeout(() => {
          this.moveDot(k, b, x2, y2, t);
        }, 100);
      } else {
        clearTimeout(dotVar);
        this.ballStage.globalAlpha = 0;
        return;
      }

    },
    // 恢复初始状态；
    gameOver() {
      // 刷新当前页面；
      window.location.reload();
    }
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
  },
  watch: {
    // 中心小球半径增大，重绘中心小球
    centerCircleR: function (R) {
      this.drawCenterCircle(this.circleX, this.circleY, R, this.smallBallDeg)
      if (R >= this.circleR) {
        this.bgStage.clearRect(this.circleX - this.circleR, this.circleX - this.circleR, 2 * this.circleR, 2 * this.circleR);
        this.gameOver();
        return alert("游戏结束,你的得分是：" + this.scope)
      }
    },
    // 分值增大，角度减少，框的半径减少；
    scope: function (val) {
      if (val % this.changgeNum == 0) {
        this.circleDeg -= this.subDeg;
        this.bgStage.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.circleR -= 5;
        this.drawCenterCircle(this.circleX, this.circleY, this.centerCircleR, this.smallBallDeg)
        if (this.circleR <= this.centerCircleR) {
          this.bgStage.clearRect(this.circleX - this.circleR, this.circleX - this.circleR, 2 * this.circleR, 2 * this.circleR);
          this.gameOver();
          return alert("游戏结束,你的得分是：" + this.scope)
        }

        this.drawCircle(this.circleX, this.circleY, this.circleR, this.circleDeg);
      }
    },
    circleDeg: function (val) {
      if (val <= 0) {
        this.gameOver();
        return alert("游戏结束,你的得分是：" + this.scope)
      }
    }
  },
});