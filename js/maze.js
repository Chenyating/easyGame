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
    meImg: new Image(),
    meX: 380,
    meY: 780,
    youImg: new Image(),
    youX: 0,
    youY: 0,
    treeImg: new Image(),
    context: null,
    list: [],
    all: [], //地图
    checkPoint: 0,
    author: "yating",
  },
  methods: {
    //  上
    up() {
      this.ifMeet();
      if (this.youY - 20 < 0 || this.all[(this.youY - 20) / 20][this.youX / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.youX, this.youY, 20, 20);
        this.youY -= 20;
        this.context.drawImage(this.youImg, this.youX, this.youY, 20, 20);
      }
    },
    // 下
    down() {
      this.ifMeet();
      if (this.youY + 20 >= 800 || this.all[(this.youY + 20) / 20][this.youX / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.youX, this.youY, 20, 20);
        this.youY += 20;
        this.context.drawImage(this.youImg, this.youX, this.youY, 20, 20);
      }
    },
    // 右
    right() {
      this.ifMeet();
      if (this.youX + 20 >= 400 || this.all[this.youY / 20][(this.youX + 20) / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.youX, this.youY, 20, 20);
        this.youX += 20;
        this.context.drawImage(this.youImg, this.youX, this.youY, 20, 20);
      }
    },
    // 左
    left() {
      this.ifMeet();
      if (this.youX - 20 < 0 || this.all[this.youY / 20][(this.youX - 20) / 20] == 1) {
        return;
      } else {
        this.context.clearRect(this.youX, this.youY, 20, 20);
        this.youX -= 20;
        this.context.drawImage(this.youImg, this.youX, this.youY, 20, 20);
      }
    },
    // 是否超出
    ifMeet() {
      console.log(this.youX + ":" + this.youY + "dui" + this.meX + ":" + this.meY)
      if (this.youX == this.meX && this.youY + 20 == this.meY) {
        alert("成功！")
        this.down();
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
        return;
      }
    },
    // 下载地图
    downloadMap() {
      this.context.clearRect(0, 0, 400, 800);
      console.log("现在下载的是：" + this.checkPoint + "个地图")
      this.all = this.list[this.checkPoint].map;
      console.log(this.all);
      // 准备画地图；
      this.meImg.src = "../img/maze/me.png";
      this.youImg.src = "../img/maze/you.png";
      this.treeImg.src = "../img/maze/tree.png"
      // 画黑心
      this.meImg.onload = () => {
        this.context.drawImage(this.meImg, this.meX, this.meY, 20, 20);
      };
      // 画红心
      this.youImg.onload = () => {
        this.context.drawImage(this.youImg, this.youX, this.youY, 20, 20);
      }
      // 画树
      this.treeImg.onload = () => {
        for (let i = 0; i < this.all.length; i++) {
          for (let j = 0; j < this.all[i].length; j++) {
            if (this.all[i][j] == 1) {
              this.context.drawImage(this.treeImg, j * 20,
                i * 20,
                20,
                20);

            } else {
              this.context.clearRect(
                j * 20,
                i * 20,
                20,
                20
              );
            }
          }
        }
      }
    }
  },
  mounted() {
    let vm = this;
    $(document).ready(function () {
      $.getJSON(`../data/maze/map.json` + "?tempstamp=" + (+new Date()), function (res) {
        vm.list = res;
        if (localStorage.getItem('checkPointObj')) {
          vm.checkPoint = JSON.parse(localStorage.getItem('checkPointObj'));
          console.log("初始化" + vm.checkPoint);
        }
        console.log("现在加载的是第" + vm.checkPoint + "个图")
        vm.all = vm.list[vm.checkPoint].map;
        console.log(vm.all);
        // 准备画地图；
        var c = document.getElementById("stage");
        vm.context = c.getContext("2d");
        // 准备图片
        vm.youImg.src = "../img/maze/you.png?d=" + +new Date();
        vm.treeImg.src = "../img/maze/tree.png?d=" + +new Date();
        vm.meImg.src = "../img/maze/me.png?d=" + +new Date();


        if (vm.meImg.complete) {
          vm.context.drawImage(vm.meImg, vm.meX, vm.meY, 20, 20);
        } else {
          vm.meImg.onload = function () {
            vm.context.drawImage(vm.meImg, vm.meX, vm.meY, 20, 20);
            // vm.meImg.onload = null;
          };
        };
        if (vm.youImg.complete) {
          vm.context.drawImage(vm.youImg, vm.youX, vm.youY, 20, 20);
        } else {
          vm.youImg.onload = function () {
            vm.context.drawImage(vm.youImg, vm.youX, vm.youY, 20, 20);
            // vm.meImg.onload = null;
          };
        };

        // 画红心
        // vm.meImg.onload = () => {
        //   vm.context.drawImage(vm.meImg, vm.meX, vm.meY, 20, 20);
        // };

        // 画黑心
        vm.youImg.onload = () => {
          vm.context.drawImage(vm.youImg, vm.youX, vm.youY, 20, 20);
        }

        // 画树
        vm.treeImg.onload = () => {
          for (let i = 0; i < vm.all.length; i++) {
            for (let j = 0; j < vm.all[i].length; j++) {
              if (vm.all[i][j] == 1) {
                vm.context.drawImage(vm.treeImg, j * 20,
                  i * 20,
                  20,
                  20);

              } else {
                vm.context.clearRect(
                  j * 20,
                  i * 20,
                  20,
                  20
                );
              }
            }
          }
        }
      });
    });

    // console.log(this.all[(this.youY - 20) / 20][this.youX / 20]);
  }
});