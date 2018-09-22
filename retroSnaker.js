var app = new Vue({
  el: "#app",
  data: {
    scope: 0,
    radomX: null,
    radomY: null,
    foodX: null,
    foodY: null,
    context: null,
    gameState: 0,
    snaker: [],
    v: 300,
  },
  methods: {
    //随机生成x坐标
    radomx() {
      this.radomX = parseInt(Math.random() * 20);
      return this.radomX;
    },
    //随机生成y坐标
    radomy() {
      this.radomY = parseInt(Math.random() * 40);
      return this.radomY;
    },
    //随机生成蛇头的坐标
    snakerHead() {
      //清空蛇身
      this.snaker.splice(0, this.snaker.length);
      this.snaker.push([this.radomx() * 20, this.radomy() * 20]);
      //蛇头也不能和食物重复；
      if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
        return this.snakerHead();
      }
    },
    //随机生成食物的坐标，且不能和蛇身，蛇头重合
    food() {
      this.foodX = this.radomx() * 20;
      this.foodY = this.radomy() * 20;
      //判断食物不能和蛇重复了。
      for (var i = 0; i < this.snaker.length; i++) {
        //只要出现重复，则重新调用food（）；
        if (this.foodX == this.snaker[i][0] && this.foodY == this.snaker[i][1]) {
          return this.food();
        }
      }
      this.painFood();
    },
    //绘制红色食物
    painFood() {
      var c = document.getElementById("tanchi");
      this.context = c.getContext("2d");
      this.context.fillStyle = "#8A3324";
      this.context.fillRect(this.foodX, this.foodY, 20, 20);
    },
    //是否出界
    ifOut() {
      if (
        0 > this.snaker[0][0] ||
        this.snaker[0][0] > 380 ||
        780 < this.snaker[0][1] ||
        this.snaker[0][1] < 0
      ) {
        alert("游戏结束,你撞到墙了");
        this.gameOver();
      }
      for (var i = this.snaker.length - 1; i > 0; i--) {
        if (this.snaker[0][0] == this.snaker[i][0] && this.snaker[0][1] == this.snaker[i][1]) {
          alert("游戏结束，你撞到你自己啦！")
          this.gameOver();
        }
      }
    },
    //游戏结束
    gameOver() {
      //清空蛇身；
      this.snaker.splice(0, this.snaker.length);
      //游戏分值清空，游戏状态改为0；
      this.gameState = 0;
      this.scope = 0;
      //清空整个画布
      this.context.clearRect(0, 0, 400, 800);
      $("#title").html("");
      $("#title").html("游戏开始");
    },
    //游戏开始
    begin() {
      if (this.gameState != 0) {
        //游戏结束状态
        $("#title").html("");
        $("#title").html("游戏开始");
        this.gameState = 0;
        this.scope = 0;
        //清空整个画布
        this.context.clearRect(0, 0, 400, 800);
      } else {
        //游戏开始状态
        this.food();
        this.snakerHead();
        this.painSnakerHead()
        this.gameState = 1;
        $("#title").html("");
        $("#title").html("游戏结束");
        clearInterval(timer);
      }
    },
    //蛇在x轴的变化
    changgeX(x) {
      try {
        this.context.clearRect(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], 20, 20);
        for (var i = this.snaker.length - 1; i >= 0; i--) {
          if (i == 0) {
            this.snaker[0][0] = this.snaker[0][0] + x;
            this.painSnakerHead();
          } else {
            this.snaker[i][0] = this.snaker[i - 1][0];
            this.snaker[i][1] = this.snaker[i - 1][1];
            this.painSnakerBody();
            this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
          }
        }
        //食物出现的位置和蛇头重合，则在末尾加上食物的位置，就是y轴最后+-20；
        if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
          this.snaker.push([this.foodX - x, this.foodY]);
          this.context.fillRect(
            this.snaker[this.snaker.length - 1][0],
            this.snaker[this.snaker.length - 1][1],
            20,
            20
          );
          this.painSnakerBody();
          this.food();
          this.scope = this.scope + 1;
        }
        this.ifOut();
      } catch (error) {}

    },
    //蛇在y轴的变化
    changgeY(y) {
      try {
        this.context.clearRect(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], 20, 20);
        for (var i = this.snaker.length - 1; i >= 0; i--) {
          if (i == 0) {
            this.snaker[0][1] = this.snaker[0][1] - y;
            this.painSnakerHead();
          } else {
            this.snaker[i][0] = this.snaker[i - 1][0];
            this.snaker[i][1] = this.snaker[i - 1][1];
            this.painSnakerBody();
            this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
          }
        }
        //食物出现的位置和蛇头重合，则在末尾加上食物的位置，就是y轴最后+-20；
        if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
          this.snaker.push([this.foodX, this.foodY + y]);
          this.context.fillRect(
            this.snaker[this.snaker.length - 1][0],
            this.snaker[this.snaker.length - 1][1],
            20,
            20
          );
          this.painSnakerBody();
          this.food();
          this.scope = this.scope + 1;
        }
        this.ifOut();
      } catch (error) {}
    },
    //画蛇身
    painSnakerBody() {
      this.context.fillStyle = "#363636";
    },
    //画蛇头
    painSnakerHead() {
      this.context.fillStyle = "#00755E";
      this.context.fillRect(this.snaker[0][0], this.snaker[0][1], 20, 20);
    },
  },
  mounted() {},
  watch: {}
});
var startx, starty;

//获得角度
function getAngle(angx, angy) {
  return (Math.atan2(angy, angx) * 180) / Math.PI;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }

  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if (
    (angle >= 135 && angle <= 180) ||
    (angle >= -180 && angle < -135)
  ) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  } else {
    result = 0;
  }

  return result;
}
//手指接触屏幕
document.addEventListener(
  "touchstart",
  function (e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  },
  false
);

//手指离开屏幕
let timer = null;
//速度控制
app.v = 300 - app.scope;

document.addEventListener(
  "touchend",
  function (e) {
    if (app.gameState == 0) {
      return;
    }
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    clearInterval(timer);
    if (direction == 1) {
      timer = setInterval(() => {
        app.changgeY(20);
      }, app.v)
    }
    if (direction == 2) {
      timer = setInterval(() => {
        app.changgeY(-20);
      }, app.v)
    }
    if (direction == 3) {
      timer = setInterval(() => {
        app.changgeX(-20);
      }, app.v)
    }
    if (direction == 4) {
      timer = setInterval(() => {
        app.changgeX(20);
      }, app.v)
    }
    if (direction == 0) {
      clearInterval(timer);
    }
  },
  false
);