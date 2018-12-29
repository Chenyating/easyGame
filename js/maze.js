
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

// **********************在if里修改的方向的代码********************************这行以上，复制就可以了。不用管它***************************************
document.addEventListener(
  "touchend",
  function (e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    if (direction == 1) {
      maze.up();
    }
    if (direction == 2) {
      maze.down();

    }
    if (direction == 3) {
      maze.left();
    }
    if (direction == 4) {
      maze.right();
    }
  },
  false
);
// *********************************************************************************************************************************

var maze = new Vue({
  el: "#maze",
  data: {
    catImg: new Image(),
    catX: 380,
    catY: 780,
    dogImg: new Image(),
    dogX: 0,
    dogY: 0,
    obstacleImg: new Image(),
    obstacleImg: new Image(),
    specialImg: new Image(),
    context: null,
    list: [],
    all: [], //地图
    checkPoint: 0,
    author: "yating",
  },
  methods: {
    //  上
    up() {
      if (this.dogY - 20 < 0 || this.all[(this.dogY - 20) / 20][this.dogX / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.dogX, this.dogY, 20, 20);
        this.dogY -= 20;
        this.context.drawImage(this.dogImg, this.dogX, this.dogY, 20, 20);
      }
      this.ifMeet();
    },
    // 下
    down() {
      if (this.dogY + 20 >= 800 || this.all[(this.dogY + 20) / 20][this.dogX / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.dogX, this.dogY, 20, 20);
        this.dogY += 20;
        this.context.drawImage(this.dogImg, this.dogX, this.dogY, 20, 20);
      }
      this.ifMeet();
    },
    // 右
    right() {
      this.ifMeet();
      if (this.dogX + 20 >= 400 || this.all[this.dogY / 20][(this.dogX + 20) / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.dogX, this.dogY, 20, 20);
        this.dogX += 20;
        this.context.drawImage(this.dogImg, this.dogX, this.dogY, 20, 20);
      }
    },
    // 左
    left() {
      this.ifMeet();
      if (this.dogX - 20 < 0 || this.all[this.dogY / 20][(this.dogX - 20) / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.dogX, this.dogY, 20, 20);
        this.dogX -= 20;
        this.context.drawImage(this.dogImg, this.dogX, this.dogY, 20, 20);
      }
    },
    // 是否超出
    ifMeet() {
      console.log(this.dogX + ":" + this.dogY + "dui" + this.catX + ":" + this.catY)
      if (this.dogX== this.catX && this.dogY== this.catY) {
        this.addPoint();
      }
    },
    // 上一关
    subPoint() {
      if (this.checkPoint > 0) {
        this.checkPoint = this.checkPoint - 1;
        this.downloadMap();
        localStorage.setItem('checkPointObj', this.checkPoint);
      } else {
        return;
      }
    },
    // 下一关
    addPoint() {
      if (this.checkPoint < this.list.length - 1) {
        this.checkPoint = this.checkPoint + 1;
        this.downloadMap();
        localStorage.setItem('checkPointObj', this.checkPoint);
      } else {
        alert("敬请期待下一关！或者你可以点击这个地址绘制迷宫：http://106.14.185.143/game/madeMap.html，在把地图发送给我就可以了")
        return;
      }
    },
    // 画猫
    painCat() {
      this.catX = 380;
      this.catY = 780;
      this.catImg.onload = () => {
        this.context.drawImage(this.catImg, this.catX, this.catY, 20, 20);
      };
    },
    // 画狗
    painDog() {
      this.dogX = 0;
      this.dogY = 0;
      this.dogImg.onload = () => {
        this.context.drawImage(this.dogImg, this.dogX, this.dogY, 20, 20);
      }
    },
    // 画障碍
    painObstacle() {
      this.obstacleImg.onload = () => {
        for (let i = 0; i < this.all.length; i++) {
          for (let j = 0; j < this.all[i].length; j++) {
            if (this.all[i][j] == 1) {
              this.context.drawImage(this.obstacleImg, j * 20,
                i * 20,
                20,
                20);
            }
          }
        }
      }
    },
    // 画特制作
    painSpecial() {
      this.specialImg.onload = () => {
        for (let i = 0; i < this.all.length; i++) {
          for (let j = 0; j < this.all[i].length; j++) {
            if (this.all[i][j] == 3) {
              this.context.drawImage(this.specialImg, j * 20,
                i * 20,
                20,
                20);

            }
          }
        }
      }
    },
    // 显示路线
    showWay() {
      for (let i = 0; i < this.all.length; i++) {
        for (let j = 0; j < this.all[i].length; j++) {
          if (this.all[i][j] == 2) {
            this.context.drawImage(this.specialImg, j * 20,
              i * 20,
              20,
              20);

          }
        }
      }
    },
    // 下载地图
    downloadMap() {
      var imgUrl1 = __uri("img/maze/cat.png");
      var imgUrl2 = __uri("img/maze/cat.png");
      var imgUrl3 = __uri("img/maze/cat.png");
      var imgUrl4 = __uri("img/maze/cat.png");
      this.catImg.src = imgUrl1+"?d=" + +new Date();
      this.dogImg.src = imgUrl2+"?d=" + +new Date();
      this.obstacleImg.src = imgUrl3+"?d=" + +new Date();
      this.specialImg.src = imgUrl4+"?d=" + +new Date();
      this.context.clearRect(0, 0, 400, 800);
      console.log("现在下载的是：" + this.checkPoint + "个地图")
      this.all = this.list[this.checkPoint].map;
      // 准备画地图；
      this.painDog();
      this.painCat();
      this.painObstacle();
      this.painSpecial();
    }
  },
  mounted() {
    let vm = this;
    $(document).ready(function () {
      var dataUrl = "data/fruit/fruit.json";
      $.getJSON( dataUrl + "?tempstamp=" + +new Date(), function (res) {
        vm.list = res;
        if (localStorage.getItem('checkPointObj')) {
          vm.checkPoint = JSON.parse(localStorage.getItem('checkPointObj'));
        }
        console.log("现在加载的是第" + vm.checkPoint + "个图")
        vm.all = vm.list[vm.checkPoint].map;
        console.log(vm.all);
        // 准备画地图；
        var c = document.getElementById("stage");
        vm.context = c.getContext("2d");
        // 准备图片
        var imgUrl5 = __uri("img/maze/cat.png");
        var imgUrl6 = __uri("img/maze/cat.png");
        var imgUrl7 = __uri("img/maze/cat.png");
        vm.catImg.src = imgUrl5+"?d=" + +new Date();
        vm.obstacleImg.src = imgUrl6+"?d=" + +new Date();
        vm.dogImg.src = imgUrl7+"?d=" + +new Date();


        if (vm.catImg.complete) {
          vm.context.drawImage(vm.catImg, vm.catX, vm.catY, 20, 20);
        } else {
          vm.catImg.onload = function () {
            vm.context.drawImage(vm.catImg, vm.catX, vm.catY, 20, 20);
            // vm.catImg.onload = null;
          };
        };
        if (vm.dogImg.complete) {
          vm.context.drawImage(vm.dogImg, vm.dogX, vm.dogY, 20, 20);
        } else {
          vm.dogImg.onload = function () {
            vm.context.drawImage(vm.dogImg, vm.dogX, vm.dogY, 20, 20);
            // vm.catImg.onload = null;
          };
        };

        // 画猫
        // vm.catImg.onload = () => {
        //   vm.context.drawImage(vm.catImg, vm.catX, vm.catY, 20, 20);
        // };

        // 画狗
        // vm.dogImg.onload = () => {
        //   vm.context.drawImage(vm.dogImg, vm.dogX, vm.dogY, 20, 20);
        // }

        // 画障碍
        vm.obstacleImg.onload = () => {
          for (let i = 0; i < vm.all.length; i++) {
            for (let j = 0; j < vm.all[i].length; j++) {
              if (vm.all[i][j] == 1) {
                vm.context.drawImage(vm.obstacleImg, j * 20,
                  i * 20,
                  20,
                  20);

              }
            }
          }
        }
      });
    });

    // console.log(this.all[(this.dogY - 20) / 20][this.dogX / 20]);
  }
});