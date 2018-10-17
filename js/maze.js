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
    all: [], //地图
  },
  methods: {
    //随机生成x坐标
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
    ifMeet() {
      if (this.youX == this.meX && this.youY == this.meY) {
        alert("成功！")
      }
    }

  },
  mounted() {
    var c = document.getElementById("stage");
    this.context = c.getContext("2d");
    // this.meImg.addEventListener('load', function () {
    //   this.context.drawImage(this.meImg, this.meX, this.meY, 20, 20);
    // }, false);
    this.meImg.src = "../img/maze/me.png";
    this.youImg.src = "../img/maze/you.png";
    this.treeImg.src = "../img/maze/tree.png"
    this.meImg.onload = () => {
      this.context.drawImage(this.meImg, this.meX, this.meY, 20, 20);
    };
    this.youImg.onload = () => {
      this.context.drawImage(this.youImg, this.youX, this.youY, 20, 20);
    }
    this.all = [
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
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
    console.log(this.all[(this.youY - 20) / 20][this.youX / 20]);
  }
});