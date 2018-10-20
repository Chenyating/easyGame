var mine = new Vue({
  el: "#mine",
  data: {
    width: 12,
    height: 25,
    all: [],
    bomb: 0,
    num: 0,
    bombNum: 20,
  },
  methods: {
    // 点击空白
    click(x, y) {
      if (this.all[x][y][0] == 1) {
        this.showBomb();
        alert("你踩到雷啦！")
        return;
      } else {
        this.ifOk();
        this.andThen(x, y);
      }
    },
    andThen(x, y) {
      this.ifOk();
      if (this.all[x][y][0] == 1 || this.all[x][y][1] > -1) {
        return;
      }
      // console.log("调用一次andThen" + x + ":" + y)
      // if(x-1<=0||x+1>=9||y-1<=0||y+1>=0){
      //   return;
      // }
      this.num = 0;
      try {
        if (this.all[x - 1][y - 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x - 1][y][0] == 1) {
          this.num += 1;
        }
        if (this.all[x - 1][y + 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x][y - 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x][y][0] == 1) {
          return;
        }
        if (this.all[x][y + 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x + 1][y - 1][0] == 1) {
          this.num += 1;
        }
        if (this.all[x + 1][y][0] == 1) {
          this.num += 1;
        }
        if (this.all[x + 1][y + 1][0] == 1) {
          this.num += 1;
        }
        this.$set(this.all, x, this.all[x])
        this.$set(this.all[x], y, this.all[x][y]);
        this.$set(this.all[x][y], 1, this.num);
        if (this.num == 0) {
          this.andThen(x - 1, y - 1);
          this.andThen(x - 1, y);
          this.andThen(x - 1, y + 1);
          this.andThen(x, y - 1);
          this.andThen(x, y + 1);
          this.andThen(x + 1, y - 1);
          this.andThen(x + 1, y);
          this.andThen(x + 1, y + 1);
        } else {
          this.ifOk();
          console.log("5")
          return;
        }
      } catch (error) {

      }
      this.ifOk();
      console.log("6")
    },
    // 开始随机游戏
    randomBegin(bombNumber) {
      this.bombNum = bombNumber;
      this.bomb = 0;
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this.$set(this.all, i, this.all[i])
          this.$set(this.all[i], j, this.all[i][j]);
          this.$set(this.all[i][j], 0, 0);
          this.$set(this.all[i][j], 1, -1);
        }
      }
      this.random();
    },
    // 随便上色
    random() {
      var a, b;
      a = parseInt(Math.random() * (this.height - 2) + 1);
      b = parseInt(Math.random() * (this.width - 2) + 1);
      if (this.bomb < this.bombNum) {
        // 如果这个数炸弹，那么重新随机
        if (this.all[a][b][0] == 1) {
          this.random();
        }
        // 否则给他设置为炸弹 
        else {
          this.bomb = this.bomb + 1;
          this.$set(this.all, a, this.all[a])
          this.$set(this.all[a], b, this.all[a][b]);
          this.$set(this.all[a][b], 0, 1);
          this.random();
        }
      } else {
        return;
      }
    },
    ifOk() {
      var lastNum = 0;
      for (var i = 1; i < this.height - 1; i++) {
        for (var j = 1; j < this.width - 1; j++) {
          if (this.all[i][j][1] == -1) {
            lastNum += 1;
          }
        }
      }
      if (lastNum == this.bombNum) {
        this.showBomb();
        alert("完全没有踩到地雷，你好棒棒哦")
      }
    },
    showBomb() {
      for (var i = 1; i < this.height - 1; i++) {
        for (var j = 1; j < this.width - 1; j++) {
          if (this.all[i][j][1] == -1 && this.all[i][j][0] == 1) {
            this.$set(this.all, i, this.all[i])
            this.$set(this.all[i], j, this.all[i][j]);
            this.$set(this.all[i][j], 0, 2);
          }
        }
      }
    }
  },
  beforeMount() {
    for (let i = 0; i < this.height; i++) {
      this.all[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.all[i][j] = [0, -1];
      }
    }
    console.log(this.all)
  },
  mounted() {

  },
})