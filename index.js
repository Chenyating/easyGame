var app = new Vue({
  el: "#app",
  data: {
    scope: 0,
    radomX: null,
    radomY: null,
    foodX: null,
    foodY: null,
    beanX: null,
    beanY: null,
    context: null,
    one: 0,
    snaker: [],
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
    bean() {
      // this.snaker.splice(0,this.snaker.length);
      this.beanX = this.radomx() * 20;
      this.beanY = this.radomy() * 20;
      this.snaker.push([this.beanX,this.beanY]);
      // console.log(this.snaker)
    },
    //显示食物的坐标红色，且不能和豌豆在同一个位置。
    food() {
      this.foodX = this.radomx() * 20;
      this.foodY = this.radomy() * 20;
      //判断食物不能和头重复了。
      if (this.foodX == this.beanX && this.foodY == this.beanY) {
        this.foodX = this.radomx() * 20;
        this.foodY = this.radomy() * 20;
      }
      var c = document.getElementById("tanchi");
      this.context = c.getContext("2d");
      this.context.fillStyle = "#FE4C40";
      this.context.fillRect(this.foodX, this.foodY, 20, 20);
    },
    ifAdd() {
      if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
        console.log(this.foodX + "+" + this.foodY)
        this.snaker.push([this.foodX, this.foodY]);
        for (var i = 0; i < this.snaker.length; i++) {
          this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        }
        console.log(this.snaker);
        this.food();
        this.scope = this.scope + 1;
      }
    },
    ifOut() {
      if (
        0 > this.snaker[0][0] ||
        this.snaker[0][0] > 340 ||
        480 < this.snaker[0][1] ||
        this.snaker[0][1] < 0
      ) {
        alert("游戏结束,你跳出方框了！");
        this.one = 0;
        this.scope = 0;
        this.context.clearRect(this.foodX, this.foodY, 20, 20);
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
        this.context.clearRect(this.foodX, this.foodY, 20, 20);
        this.context.clearRect(this.beanX, this.beanY, 20, 20);
      } else {
        this.bean();
        this.food();
        this.context.fillStyle = "#00FF80";
        this.context.fillRect(this.beanX, this.beanY, 20, 20);
        this.one = 1;
        $("#title").html("");
        $("#title").html("游戏结束");
        //绘制食物
      }
    },
    goRight() {
      for (var i = this.snaker.length - 1; i > 0; i--) {
        this.context.clearRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        this.snaker[i] = this.snaker[i - 1];
      }
      console.log(this.snaker[0][0]);
      this.snaker[0][0] = this.snaker[0][0] + 20;
      //先清空原来的
      this.painBean();
    },
    goLeft() {
      for (var i = this.snaker.length - 1; i > 0; i--) {
        this.context.clearRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        this.snaker[i] = this.snaker[i - 1];
      }
      this.snaker[0][0] = this.snaker[0][0] - 20;
      this.painBean();
    },
    goUp() {
      for (var i = this.snaker.length - 1; i > 0; i--) {
        this.context.clearRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        this.snaker[i] = this.snaker[i - 1];
      }
      this.snaker[0][1] = this.snaker[0][1] - 20;
      this.painBean();
    },
    goDown() {
      for (var i = this.snaker.length - 1; i > 0; i--) {
        this.context.clearRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
        this.snaker[i] = this.snaker[i - 1];
        this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
      }
      this.snaker[0][1] = this.snaker[0][1] + 20;
      this.context.fillRect(this.snaker[0][0], this.snaker[0][1], 20, 20);
      this.painBean();
    },
    painBean() {
      this.context.fillStyle = "#00FF80";
      this.context.fillRect(this.beanX, this.beanY, 20, 20);
      this.ifOut();
      // console.log(this.beanX);
      this.ifAdd();
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
    switch (direction) {
      case 0:
        break;
      case 1:
        app.goUp();
        break;
      case 2:
        app.goDown();
        break;
      case 3:
        app.goLeft();
        break;
      case 4:
        app.goRight();

        break;
      default:
    }
  },
  false
);