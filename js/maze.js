var maze = new Vue({
  el: "#maze",
  data: {
    scope: 0,
    meImg: new Image(),
    meX: 360,
    meY: 760,
    youImg: new Image(),
    youX: 20,
    youY: 20,
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
      if (this.youX == this.meX && this.youY == this.meY) {
        alert("成功！")
      }
    },
    // 下一关
    Point() {
      console.log("刚才是"+this.checkPoint+"关");
      if (this.checkPoint + 1 < this.list.length) {
        this.checkPoint += 1;
        this.downloadMap();
      } else {
        alert("请期待下一关吧")
      }
    },
    // 下载地图
    downloadMap() {
      this.context.clearRect(0, 0, 400, 800);
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
        vm.all = vm.list[0].map;
        console.log(vm.all);
        // 准备画地图；
        var c = document.getElementById("stage");
        vm.context = c.getContext("2d");
        // 准备图片
        vm.youImg.src = "../img/maze/you.png?d=" + +new Date();
        vm.treeImg.src = "../img/maze/tree.png?d=" + +new Date();
        vm.meImg.src = "../img/maze/me.png?d=" + +new Date();


        if (vm.meImg.complete) {
          console.log("断点1")
          vm.context.drawImage(vm.meImg, vm.meX, vm.meY, 20, 20);
        } else {
          vm.meImg.onload = function () {
            console.log("断点2")
            vm.context.drawImage(vm.meImg, vm.meX, vm.meY, 20, 20);
            // vm.meImg.onload = null;
          };
        };
        if (vm.youImg.complete) {
          console.log("断点1")
          vm.context.drawImage(vm.youImg, vm.youX, vm.youY, 20, 20);
        } else {
          vm.youImg.onload = function () {
            console.log("断点2")
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