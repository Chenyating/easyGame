var app = new Vue({
  el: "#app",
  data: {
    scope: 0,
    radomX: null,
    radomY: null,
    foodX: null,
    foodY: null,
    context: null,
    one: 0,
    snaker: []
  },
  methods: {
    //随机生成x坐标
    radomx() {
      this.radomX = parseInt(Math.random() * 13);
      return this.radomX;
    },
    //随机生成y坐标
    radomy() {
      this.radomY = parseInt(Math.random() * 25);
      return this.radomY;
    },
    //随机生成头的坐标
    addSnaker() {
      this.snaker.splice(0, this.snaker.length);
      this.snaker.push([this.radomx() * 20, this.radomy() * 20]);
      console.log(this.snaker);
    },
    //显示食物的坐标红色，且不能和蛇头在同一个位置。
    food() {
      this.foodX = this.radomx() * 20;
      this.foodY = this.radomy() * 20;
      //判断食物不能和头重复了。
      for (var i = 0; i < this.snaker.length; i++) {
        if (this.foodX == this.snaker[i][0] && this.foodY == this.snaker[i][1]) {
          return this.food();
        }
      }
      var c = document.getElementById("tanchi");
      this.context = c.getContext("2d");
      this.context.fillStyle = "#FE4C40";
      this.context.fillRect(this.foodX, this.foodY, 20, 20);
    },
    ifOut() {
      if (
        0 > this.snaker[0][0] ||
        this.snaker[0][0] > 780 ||
        980 < this.snaker[0][1] ||
        this.snaker[0][1] < 0
      ) {
        alert("游戏结束,你跳出方框了！");
        this.snaker.splice(0, this.snaker.length);
        this.one = 0;
        this.scope = 0;
        //清空整个画布
        this.context.clearRect(0, 0, 800, 1000);
        $("#title").html("");
        $("#title").html("游戏开始");
      }
    },
    begin() {
      if (this.one != 0) {
        $("#title").html("");
        $("#title").html("游戏开始");
        this.one = 0;
        this.scope = 0;
        //清空整个画布
        this.context.clearRect(0, 0, 800, 1000);
      } else {
        this.addSnaker();
        this.food();
        this.context.fillStyle = "#00FF80";
        this.context.fillRect(this.snaker[0][0], this.snaker[0][1], 20, 20);
        this.one = 1;
        $("#title").html("");
        $("#title").html("游戏结束");
        //绘制食物
      }
    },
    changgeX(x) {
      this.context.clearRect(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], 20, 20);
      for (var i = this.snaker.length - 1; i >= 0; i--) {
        if (i == 0) {
          this.snaker[0][0] = this.snaker[0][0] + x;
        } else {
          this.snaker[i][0] = this.snaker[i - 1][0];
          this.snaker[i][1] = this.snaker[i - 1][1];
        }
        this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        this.painSnakerBody();
      }
      if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
        console.log(this.foodX + "+" + this.foodY);
        this.snaker.push([this.foodX - x, this.foodY]);
        console.log(this.snaker);
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
      console.log('changge' + this.snaker)
    },
    changgeY(y) {
      this.context.clearRect(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], 20, 20);
      for (var i = this.snaker.length - 1; i >= 0; i--) {
        if (i == 0) {
          this.snaker[0][1] = this.snaker[0][1] - y;
        } else {
          this.snaker[i][0] = this.snaker[i - 1][0];
          this.snaker[i][1] = this.snaker[i - 1][1];
        }
        this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        this.painSnakerBody();
      }
      if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
        console.log(this.foodX + "+" + this.foodY);
        this.snaker.push([this.foodX, this.foodY + y]);
        console.log(this.snaker);
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
      console.log('changge' + this.snaker)
    },
    painSnakerBody() {
      this.context.fillStyle = "#00FF80";
      this.ifOut();
    }
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
document.addEventListener(
  "touchend",
  function (e) {
    if (app.one == 0) {
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
      }, 500)
    }
    if (direction == 2) {
      timer = setInterval(() => {
        app.changgeY(-20);
      }, 500)
    }
    if (direction == 3) {
      timer = setInterval(() => {
        app.changgeX(-20);
      }, 500)
    }
    if (direction == 4) {
      timer = setInterval(() => {
        app.changgeX(20);
      }, 500)
    }
  },
  false
);