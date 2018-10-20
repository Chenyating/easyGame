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

document.addEventListener(
  "touchend",
  function (e) {
    if (tetris.gameState == 0) {
      return;
    }
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    clearInterval(timer);
    if (direction == 0) {
      clearInterval(timer);
    }
    if (direction == 1) {
      tetris.change();
      timer = setInterval(() => {
        tetris.down();
      }, tetris.v)

    }
    tetris.downV = 100;
    if (direction == 2) {
      timer = setInterval(() => {
        tetris.down();
      }, tetris.downV)

    }
    if (direction == 3) {
      tetris.left();
      timer = setInterval(() => {
        tetris.down();
      }, tetris.v)
    }
    if (direction == 4) {
      tetris.right();
      timer = setInterval(() => {
        tetris.down();
      }, tetris.v)
    }
  },
  false
);

var tetris = new Vue({
  el: "#tetris",
  data: {
    scope: 0,
    v: 300,
    downV: 100,
    radomID: null, //图像编号
    shap: [], //存放图形
    all: new Array(), //存放所有已经内容
    context: null, //画布
    rotateID: 0, //旋转的状态,
    allLength: null,
    gameState: 0
  },
  methods: {
    begin() {
      if (this.gameState != 0) {
        //游戏结束状态
        $("#title").html("");
        $("#title").html("游戏开始");
        this.gameState = 0;
        this.scope = 0;
        this.all.splice(0, this.all.length); //清空存放单方块的数组
        //清空整个画布
        this.context.clearRect(0, 0, 400, 800);
        clearInterval(timer);
      }
      //游戏开始状态
      else {
        //初始化堆积方块
        for (let i = 0; i < 40; i++) {
          this.all[i] = new Array(0);
          for (let j = 0; j < 20; j++) {
            this.all[i][j] = 0;
          }
        }
        this.allLength = this.all[0].length;
        //开始绘制单方块；
        //清空整个画布
        this.context.clearRect(0, 0, 400, 800);
        this.radomShap();
        this.gameState = 1;
        //游戏开始，默认自己往下移动；
        timer = setInterval(() => {
          this.down();
        }, this.v)
        $("#title").html("");
        $("#title").html("游戏结束");
      }
    },
    //绘制
    pain() {
      var c = document.getElementById("stage");
      this.context = c.getContext("2d");
      this.context.fillStyle = "#000000";
      // this.context.clearRect(0, 0, 800, 60);
    },
    //绘制图像
    painShap() {
      for (var i = 0; i < this.shap.length; i++) {
        for (var j = 0; j < this.shap[i].length; j++) {
          if (this.shap[i][j][2] == 1) {
            this.context.fillRect(
              this.shap[i][j][0],
              this.shap[i][j][1],
              20,
              20
            );
          }
        }
      }
    },
    //随机绘制单方块
    radomShap() {
      this.scope += 1;
      this.pain();
      this.radomID = parseInt(Math.random() * 7);
      // this.deleteShap();
      this.shap.splice(0, this.shap.length); //清空存放单方块的数组
      //shap数组开始存储不同单方块
      switch (this.radomID) {
        case 0:
          //长条
          let defaultX = 180;
          let defaultY = -60;
          for (var i = 0; i < 5; i++) {
            defaultX = 180;
            if (i == 2) {
              this.$set(this.shap, i, [
                [defaultX, defaultY, 1],
                [(defaultX += 20), defaultY, 1],
                [(defaultX += 20), defaultY, 1],
                [(defaultX += 20), defaultY, 1],
                [(defaultX += 20), defaultY, 0]
              ]);
            } else {
              this.$set(this.shap, i, [
                [defaultX, defaultY, 0],
                [(defaultX += 20), defaultY, 0],
                [(defaultX += 20), defaultY, 0],
                [(defaultX += 20), defaultY, 0],
                [(defaultX += 20), defaultY, 0]
              ]);
            }
            defaultY += 20;
          }
          console.log(this.shap)
          break;
        case 1:
          //正方形
          this.$set(this.shap, 0, [
            [180, -40, 1],
            [200, -40, 1]
          ]);
          this.$set(this.shap, 1, [
            [180, -20, 1],
            [200, -20, 1]
          ]);
          break;
        case 2:
          //正7
          this.$set(this.shap, 0, [
            [180, -60, 1],
            [200, -60, 1],
            [220, -60, 0]
          ]);
          this.$set(this.shap, 1, [
            [180, -40, 0],
            [200, -40, 1],
            [220, -40, 0]
          ]);
          this.$set(this.shap, 2, [
            [180, -20, 0],
            [200, -20, 1],
            [220, -20, 0]
          ]);
          break;
        case 3:
          //反7
          this.$set(this.shap, 0, [
            [180, -60, 0],
            [200, -60, 1],
            [220, -60, 1]
          ]);
          this.$set(this.shap, 1, [
            [180, -40, 0],
            [200, -40, 1],
            [220, -40, 0]
          ]);
          this.$set(this.shap, 2, [
            [180, -20, 0],
            [200, -20, 1],
            [220, -20, 0]
          ]);
          break;
        case 4:
          //正2
          this.$set(this.shap, 0, [
            [180, -60, 1],
            [200, -60, 1],
            [220, -60, 0]
          ]);
          this.$set(this.shap, 1, [
            [180, -40, 0],
            [200, -40, 1],
            [220, -40, 1]
          ]);
          this.$set(this.shap, 2, [
            [180, -20, 0],
            [200, -20, 0],
            [220, -20, 0]
          ]);
          break;
        case 5:
          //反2
          this.$set(this.shap, 0, [
            [180, -60, 0],
            [200, -60, 1],
            [220, -60, 1]
          ]);
          this.$set(this.shap, 1, [
            [180, -40, 1],
            [200, -40, 1],
            [220, -40, 0]
          ]);
          this.$set(this.shap, 2, [
            [180, -20, 0],
            [200, -20, 0],
            [220, -20, 0]
          ]);
          break;
        case 6:
          //土
          this.$set(this.shap, 0, [
            [180, -60, 0],
            [200, -60, 1],
            [220, -60, 0]
          ]);
          this.$set(this.shap, 1, [
            [180, -40, 1],
            [200, -40, 1],
            [220, -40, 1]
          ]);
          this.$set(this.shap, 2, [
            [180, -20, 0],
            [200, -20, 0],
            [220, -20, 0]
          ]);
          break;
        default:
          break;
      }
      this.rotate();
      this.painShap();
    },
    //清除单方块形状
    deleteShap() {
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          if (this.shap[i][j][2] == 1) {
            this.context.clearRect(
              this.shap[i][j][0],
              this.shap[i][j][1],
              20,
              20
            );
          }
        }
      }
    },
    //旋转90度的方法
    rotate() {
      var changge = parseInt(Math.random() * 4);
      console.log("变" + changge + "次")
      for (i = 0; i <= changge; i++) {
        let shap1 = [];
        // 深拷贝
        shap1 = JSON.parse(JSON.stringify(this.shap));
        //行变列。列变行,把结果先存在shap1里；
        for (let i = 0; i < this.shap.length; i++) {
          for (let j = this.shap[i].length - 1; j >= 0; j--) {
            shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];
          }
        }
        //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；
        for (let i = 0; i < shap1.length; i++) {
          for (let j = 0; j < shap1[i].length; j++) {
            try {
              if (
                ((shap1[i][j][0] < 0 || shap1[i][j][0] > 380||shap1[i][j][1] > 780) && shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {
                //两个同时成立退出；
                return;
              }
            } catch (error) {

            }
          }
        }
        this.deleteShap();
        //那么就把shap1的值赋给shap
        this.shap = JSON.parse(JSON.stringify(shap1));
        this.painShap();
      }
    },
    change() {
        let shap1 = [];
        // 深拷贝
        shap1 = JSON.parse(JSON.stringify(this.shap));
        //行变列。列变行,把结果先存在shap1里；
        for (let i = 0; i < this.shap.length; i++) {
          for (let j = this.shap[i].length - 1; j >= 0; j--) {
            shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];
          }
        }
        //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；
        for (let i = 0; i < shap1.length; i++) {
          for (let j = 0; j < shap1[i].length; j++) {
            try {
              if (
                ((shap1[i][j][0] < 0 || shap1[i][j][0] > 380||shap1[i][j][1] > 780) && shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {
                  //两个同时成立退出；
                return;
              }
            } catch (error) {

            }
          }
        }
        this.deleteShap();
        //那么就把shap1的值赋给shap
        this.shap = JSON.parse(JSON.stringify(shap1));
        this.painShap();
    },
    //向下
    down() {
      //到头了。就自杀了。
      for (let i = 0; i < this.all[0].length; i++) {
        if (this.all[0][i] == 1) {
          alert("游戏结束");
          clearInterval(timer);
          $("#title").html("");
        $("#title").html("游戏开始");
        this.gameState = 0;
        this.scope = 0;
        this.all.splice(0, this.all.length); //清空存放单方块的数组
        //清空整个画布
        this.context.clearRect(0, 0, 400, 800);
          return;
        }
      }
      //判断下降过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          var y = this.shap[i][j][1] / 20;
          var x = this.shap[i][j][0] / 20;
          try {
            if (
              (this.shap[i][j][1] >= 780 || this.all[y + 1][x] == 1) && this.shap[i][j][2] == 1
            ) {
              //会的话，那就就开始把shap加入this。all；
              for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                  if (this.shap[i][j][2] == 1) {
                    var y = this.shap[i][j][1] / 20;
                    var x = this.shap[i][j][0] / 20;
                    this.all[y][x] = 1;
                  }
                }
              }
              //放完以后退出
              this.radomShap();
              clearInterval(timer);
              timer = setInterval(() => {
                this.down();
              }, this.v)
              console.log(this.all)
              return;
            }
          } catch (error) {
            // console.log("y有bug")
          }
        }
      }
      //先判断是否满格了,满格就退出；
        for (let i = 0; i < this.all.length; i++) {
          var num = 0; //一整行填满的方块数量
          for (let j = 0; j < this.all[i].length; j++) {
            //如果没有
            if (this.all[i][j] != 1) {
              continue;
            } else {
              num++;
              if (num == this.allLength) {
                for (let j = 0; j < this.all[i].length; j++) {
                  this.context.clearRect(
                    j * 20,
                    i * 20,
                    20,
                    20
                  );
                  this.all[i][j] = 0;
                }
                //把满的清空以后。
                //清空现在屏幕上所有的堆积方块
                this.deletAll();
                //填满清空的区域；
                this.allDown();
                //重绘
                this.painAll();
                this.radomShap();
                this.scope += 10;
                continue;
              }
            }
          }
        }

      //经过两个判断结束以后，没有符合，继续向下移动
      {
        for (let i = 0; i < this.shap.length; i++) {
          for (let j = 0; j < this.shap[i].length; j++) {
            if (this.shap[i][j][2] == 1) {
              this.context.clearRect(
                this.shap[i][j][0],
                this.shap[i][j][1],
                20,
                20
              );
            }
            this.shap[i][j][1] += 20;
          }
        }
        this.painShap();
      }
    },
    // 向左
    left() {
      //判断左移动的过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          var y = this.shap[i][j][1] / 20;
          var x = this.shap[i][j][0] / 20;
          try {
            //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。
            if (
              (this.shap[i][j][0] < 20 || this.all[y][x - 1] == 1) && this.shap[i][j][2] == 1
            ) {
              //左边有东西||或者靠墙了。不要向左了。
              return;
            }
          } catch (error) {
            // console.log("有bug")
          }
        }
      }

      //经过两个判断结束以后，没有符合，继续向左移动
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          if (this.shap[i][j][2] == 1) {
            this.context.clearRect(
              this.shap[i][j][0],
              this.shap[i][j][1],
              20,
              20
            );
          }
          this.shap[i][j][0] -= 20;
        }
      }
      this.painShap();
    },
    // 向右
    right() {
      //判断左移动的过程中是否会与右边堆积好的方块重叠；是否会超过范围；如果会的话退出；
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          var y = this.shap[i][j][1] / 20;
          var x = this.shap[i][j][0] / 20;
          try {
            //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。
            if (
              (this.shap[i][j][0] > 360 || this.all[y][x + 1] == 1) && this.shap[i][j][2] == 1
            ) {
              return;
            }
          } catch (error) {
            // console.log("x太大")
          }

        }
      }
      //经过两个判断结束以后，没有符合，继续向右移动
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          if (this.shap[i][j][2] == 1) {
            this.context.clearRect(
              this.shap[i][j][0],
              this.shap[i][j][1],
              20,
              20
            );
          }
          this.shap[i][j][0] += 20;
        }
      }
      this.painShap();
    },
    deletAll() {
      for (let i = 0; i < this.all.length; i++) {
        for (let j = 0; j < this.all[i].length; j++) {
          if (this.all[i][j] == 1) {
            this.context.clearRect(
              j * 20,
              i * 20,
              20,
              20
            );
          }
        }
      }
    },
    //整体堆积好的方块往下；
    allDown() {
      for (let i = this.all.length - 1; i >= 0; i--) {
        var num = 0; //一整行填满的方块数量
        for (let j = 0; j < this.all[i].length; j++) {
          //如果没有
          if (this.all[i][j] == 1) {
            //只有这一行有存在1的那我就不管了。
            continue; //跳出本次循环；
          } else {
            num++;
            //假如这一行都是为空的话。那么开始，这行以上的全部集体往下移动；
            if (num == this.allLength) {
              this.allLength = this.all[0].length;
              var a5 = JSON.parse(JSON.stringify(this.all[0]));
              if (i - 1 >= 0) {
                for (let k = i - 1; k >= 0; k--) {
                  this.all[k + 1] = this.all[k];
                }
                this.all[0] = a5;
              }
            }
          }
        }
      }
    },
    //重绘堆积好的方块；
    painAll() {
      for (let i = 0; i < this.all.length; i++) {
        for (let j = 0; j < this.all[i].length; j++) {
          if (this.all[i][j] == 1) {
            this.context.fillRect(
              j * 20,
              i * 20,
              20,
              20
            );
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
  },
  mounted() {
    var c = document.getElementById("stage");
    this.context = c.getContext("2d");
  }
});