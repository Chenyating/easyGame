var app = new Vue({
  el: "#teris",
  data: {
    scope: 0,
    v: 300,
    radomID: null, //图像编号
    shap: [], //存放图形
    all: new Array(), //存放所有已经内容
    context: null, //画布
    direction: 1, //方块移动方向
    pushAll: 0,
    rotateID: 0, //旋转的状态,
    shapName: null,
    stopStatus: false,
    allLength: null
  },
  methods: {
    //绘制
    pain() {
      var c = document.getElementById("stage");
      this.context = c.getContext("2d");
      this.context.fillStyle = "#8A3324";
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
            ); //绘制
            // console.log("[" + i + "," + j + "]" + ":" + "[" + this.shap[i][j][0] + "," + this.shap[i][j][1] + "," + this.shap[i][j][2] + "]")
          }
        }
      }
      // console.log("--------------")
    },
    //随机绘制单方块
    radomShap() {
      // console.log("------------------");
      this.pain();
      // this.radomID = parseInt(Math.random() * 7);
      this.radomID = 0;

      // this.deleteShap();
      this.shap.splice(0, this.shap.length); //清空存放图形的数组
      //开始存储不同形状的数组
      switch (this.radomID) {
        case 0:
          //长条
          let defaultX = 400;
          let defaultY = 0;
          for (var i = 0; i < 4; i++) {
            defaultX = 400;
            if (i == 0) {
              this.$set(this.shap, i, [
                [defaultX, defaultY, 1],
                [(defaultX += 20), defaultY, 1],
                [(defaultX += 20), defaultY, 1],
                [(defaultX += 20), defaultY, 1]
              ]);
            } else {
              this.$set(this.shap, i, [
                [defaultX, defaultY, 0],
                [(defaultX += 20), defaultY, 0],
                [(defaultX += 20), defaultY, 0],
                [(defaultX += 20), defaultY, 0]
              ]);
            }
            defaultY += 20;
          }
          this.shapName = "长条";
          break;
        case 1:
          //正方形
          this.$set(this.shap, 0, [
            [400, 0, 1],
            [400, 20, 1]
          ]);
          this.$set(this.shap, 1, [
            [420, 0, 1],
            [420, 20, 1]
          ]);
          this.shapName = "正方形";
          break;
        case 2:
          //正7
          this.$set(this.shap, 0, [
            [400, 0, 1],
            [420, 0, 1],
            [440, 0, 0]
          ]);
          this.$set(this.shap, 1, [
            [400, 20, 0],
            [420, 20, 1],
            [440, 20, 0]
          ]);
          this.$set(this.shap, 2, [
            [400, 40, 0],
            [420, 40, 1],
            [440, 40, 0]
          ]);
          this.shapName = "正7";
          break;
        case 3:
          //反7
          this.$set(this.shap, 0, [
            [400, 0, 0],
            [420, 0, 1],
            [440, 0, 1]
          ]);
          this.$set(this.shap, 1, [
            [400, 20, 0],
            [420, 20, 1],
            [440, 20, 0]
          ]);
          this.$set(this.shap, 2, [
            [400, 40, 0],
            [420, 40, 1],
            [440, 40, 0]
          ]);
          this.shapName = "反7";
          break;
        case 4:
          //正2
          this.$set(this.shap, 0, [
            [400, 0, 1],
            [420, 0, 1],
            [440, 0, 0]
          ]);
          this.$set(this.shap, 1, [
            [400, 20, 0],
            [420, 20, 1],
            [440, 20, 1]
          ]);
          this.$set(this.shap, 2, [
            [400, 40, 0],
            [420, 40, 0],
            [440, 40, 0]
          ]);
          this.shapName = "正2";
          break;
        case 5:
          //反2
          this.$set(this.shap, 0, [
            [400, 0, 0],
            [420, 0, 1],
            [440, 0, 1]
          ]);
          this.$set(this.shap, 1, [
            [400, 20, 1],
            [420, 20, 1],
            [440, 20, 0]
          ]);
          this.$set(this.shap, 2, [
            [400, 40, 0],
            [420, 40, 0],
            [440, 40, 0]
          ]);
          this.shapName = "反2";
          break;
        case 6:
          //土
          this.$set(this.shap, 0, [
            [400, 0, 0],
            [420, 0, 1],
            [440, 0, 0]
          ]);
          this.$set(this.shap, 1, [
            [400, 20, 1],
            [420, 20, 1],
            [440, 20, 1]
          ]);
          this.$set(this.shap, 2, [
            [400, 40, 0],
            [420, 40, 0],
            [440, 40, 0]
          ]);
          this.shapName = "土";
          break;
        default:
          break;
      }
      // console.log("this ramdomID is" + this.shapName);
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
          if (
            ((shap1[i][j][0] < 0 || shap1[i][j][0] > 780) && shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {
            // console.log("会碰到墙壁或者碰到已经堆积好的方块！！！");
            //两个同时成立退出；
            return;
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
      //判断下降过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；
      for (let i = 0; i < this.shap.length; i++) {
        for (let j = 0; j < this.shap[i].length; j++) {
          var y = this.shap[i][j][1] / 20;
          var x = this.shap[i][j][0] / 20;
          if (
            (this.shap[i][j][1] >= 1480 || this.all[y + 1][x] == 1) && this.shap[i][j][2] == 1
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
            // console.log(this.all)
            this.radomShap();
            return;
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
              // console.log("满格了啊！！！！")
              for (let j = 0; j < this.all[i].length; j++) {
                this.context.clearRect(
                  j * 20,
                  i * 20,
                  20,
                  20
                );
                this.all[i][j] = 0;
              }
              //然后全体往下移动；
              this.deletAll();
              this.allDown();
              //重绘
              this.painAll();
              this.radomShap();
              return;
            }
          }
        }
      }


      //经过两个判断结束以后，没有符合，继续向下移动
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
              console.log("左边有东西||或者靠墙了。不要向左了。")
              //左边有东西||或者靠墙了。不要向左了。
              return;
            }
          } catch (error) {
            // console.log("有bug")
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
              // console.log("满格了啊！！！！")
              this.context.clearRect(0, i * 20, 800, 20);
              //清除以后all值为1的数，改成0；
              for (let j = 0; j < this.all[i].length; j++) {
                this.all[i][j] = 0;
              }
              //清空原来的堆积好的方块
              this.deletAll();
              //然后全体往下移动；
              this.allDown();
              //重绘
              this.painAll();
              return;
            }
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
              (this.shap[i][j][0] > 760 || this.all[y][x + 1] == 1) && this.shap[i][j][2] == 1
            ) {
              // console.log("右边有障碍")
              return;
            }
          } catch (error) {
            // console.log("x太大l")
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
              // console.log("满格了啊！！！！")
              this.context.clearRect(0, i * 20, 800, 20);
              //清除以后all值为1的数，改成0；
              for (let j = 0; j < this.all[i].length; j++) {
                this.all[i][j] = 0;
              }
              //清空原来的堆积好的方块
              this.deletAll();
              //然后全体往下移动；
              this.allDown();
              //重绘
              this.painAll();
              return;
            }
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
    deletAll(){
      for (let i = 0; i < this.all.length; i++) {
        for (let j = 0; j < this.all[i].length; j++) {
          if (this.all[i][j]== 1) {
            this.context.clearRect(
              j*20,
              i*20,
              20,
              20
            );
          }
        }
      }
    },
    //整体堆积好的方块往下；
    allDown() {
      //整体往下移动
      this.allLength = this.all[0].length;
      var a5 = JSON.parse(JSON.stringify(this.all[this.all.length - 1]));
      for (let i = this.all.length - 2; i >= 0; i--) {
        this.all[i + 1] = this.all[i];
      }
      this.all[0] = a5;
      // console.log("交换位置拉");
      // console.log(this.all);
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
          }
        }
      }
    }
  },
  mounted() {
    //初始化堆积方块
    for (let i = 0; i < 75; i++) {
      this.all[i] = new Array(0);
      for (let j = 0; j < 40; j++) {
        this.all[i][j] = 0;
      }
    }
    this.allLength = this.all[0].length;
  }
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
      app.rotate();
      timer = setInterval(() => {
        app.down();
      }, 400)
    }
    if (direction == 2) {
      timer = setInterval(() => {
        app.down();
      }, 100)
    }
    if (direction == 3) {
      app.left();
      timer = setInterval(() => {
        app.down();
      }, 400)
    }
    if (direction == 4) {
      app.right();
      timer = setInterval(() => {
        app.down();
      }, 400)
    }
    if (direction == 0) {
      clearInterval(timer);
    }

  },
  false
);