# Retro-Snaker
贪吃蛇
想写个俄罗斯方块的小游戏，发现网上的各位大佬的代码，我看不明白。

好吧，其实我一直都看不懂别人的代码。

可是，flag已经立了，写肯定是要写的啦。

嗯……还是自力更生，自给自足。撸起袖子，说写就写。现在就说说我自己的经验；

查看效果，请点击这个地址哦~，你们可以玩一把，告诉我需要改进的地方：[http://106.14.185.143/game/tetris.html](http://106.14.185.143/game/tetris.html)

不介意的话，贪吃蛇也可以哦：[http://106.14.185.143/game/retroSnaker.html](http://106.14.185.143/game/retroSnaker.html)



俄罗斯方块显然比贪吃蛇难度大点。

但是

经过我的一步一步分析，我似乎看到了一条明朗的道路，现在我将我是如何一步一步的写出这俄罗斯方块的过程告诉你们吧。

看我正经脸。

# 第一步：俄罗斯单方块——shap【】 和 游戏界面——all【】；

1.1：我们来分析一下，俄罗斯单个方块有7种不同的样子。

1.2：其中， **上色状态为：0表示没有颜色，1表示有颜色。** 这7个类型的俄罗斯单方块，我暂且用shap数组来表示他们


所以，shap就有7种不同的值；

为什么要是一个正方形呢？这样就方便我们去旋转改变shap的方向；

1.3：接着设置一下游戏的界面，是这一个宽400 \* 高800 的canvas 画布，其中小小方格
的尺寸为20\*20；


这个 **画布是一张二维数组的表** ，shap们会在这个表堆积起来。 **我将这个**** 表 ****叫**** all[] ****。**

所以我们已经得出了，横的有20个小方格，竖的有40个小方格；

默认每个小方格都是不上色的， **例如all【1,1】=0表示 小小方格位置在【1,1】是没有上色的；**

      //初始化堆积方块

        for (let i = 0; i \&lt; 40; i++) {

          this.all[i] = newArray(0);

          for (let j = 0; j \&lt; 20; j++) {

            this.all[i][j] = 0;

          }

        }

 ![](./)

根据上色的小方格，我们就可以知道all对应的值：


1.4：现在我们开始初始化，shap的各个形状。

shap的【】每个值，也就是 **每个小方块：** **![](./)** **![](./)**​ **都存3个数值，它们分别表示x坐标，y坐标，上色状态（0或1）；**

- shap【i】【j】【0】----\&gt;x；
- shap【i】【j】【1】----\&gt;y;
- shap【i】【j】【2】----\&gt;上色状态；

我们主要改变的是shap【i】【j】【2】的值，即上色状态；

通过x和y我们就能得到小小方格在all的位置：（x/20，y/20 ）

radomID：表示随机的初始化第radomID种shap；因为shap肯定是要在整个all看不到的上面中间，所以200是默认的中间位置，y 必须设置成小于0；以下就是，shap【】的7种初始状态：都在all画布之上。

     switch (this.radomID) {

        case0:

          //长条

          let defaultX = 200;

          let defaultY = -60;

          for (var i = 0; i \&lt; 5; i++) {

            defaultX = 200;

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

        case1:

          //正方形

          this.$set(this.shap, 0, [

            [200, -40, 1],

            [220, -40, 1]

          ]);

          this.$set(this.shap, 1, [

            [200, -20, 1],

            [220, -20, 1]

          ]);

          break;

        case2:

          //正7

          this.$set(this.shap, 0, [

            [200, -60, 1],

            [220, -60, 1],

            [240, -60, 0]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 0],

            [220, -40, 1],

            [240, -40, 0]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 1],

            [240, -20, 0]

          ]);

          break;

        case3:

          //反7

          this.$set(this.shap, 0, [

            [200, -60, 0],

            [220, -60, 1],

            [240, -60, 1]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 0],

            [220, -40, 1],

            [240, -40, 0]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 1],

            [240, -20, 0]

          ]);

          break;

        case4:

          //正2

          this.$set(this.shap, 0, [

            [200, -60, 1],

            [220, -60, 1],

            [240, -60, 0]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 0],

            [220, -40, 1],

            [240, -40, 1]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 0],

            [240, -20, 0]

          ]);

          break;

        case5:

          //反2

          this.$set(this.shap, 0, [

            [200, -60, 0],

            [220, -60, 1],

            [240, -60, 1]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 1],

            [220, -40, 1],

            [240, -40, 0]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 0],

            [240, -20, 0]

          ]);

          break;

        case6:

          //土

          this.$set(this.shap, 0, [

            [200, -60, 0],

            [220, -60, 1],

            [240, -60, 0]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 1],

            [220, -40, 1],

            [240, -40, 1]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 0],

            [240, -20, 0]

          ]);

          break;

        default:

          break;

      }

 ![](./)

1.5：现在我们来写一个每次出现 **随机的shap的方法** 吧：radomShap（）。

 radomShap() {

      this.scope += 1;

      this.pain();

      this.radomID = parseInt(Math.random() \* 7);

      // this.deleteShap();

      this.shap.splice(0, this.shap.length); //清空存放单方块的数组

      //shap数组开始存储不同单方块

      【这里是随机的shap初始状态，上面已经展示过代码了，这里就不在复制了】

      this.rotate();

      this.painShap();

    },


**每次随机出现一个shap，就要执行这些操作；**

1. 分值就要加1分；
2. 然后开始准备画笔:pain（）
3. 随机生成一个shap编号。
4. 然后清空之前存储过的shap【】数据，
5. 开始存储新的随机shap形状。
6. 因为初始的shap形状都是固定住的，这里我们还要在出一个随机的旋转状态的shap。这里就使用rotate（）方法来旋转shap【】，这个时候shap【】的值也发生了变化；
7. 变化后的shap【】，我们就可以开始绘制shap【】。这里就使用painShap（）方法；

pain（）：设置一下要画的颜色黑色；

   //绘制

    pain() {

      var c = document.getElementById(&quot;stage&quot;);

      this.context = c.getContext(&quot;2d&quot;);

      this.context.fillStyle = &quot;#000000&quot;;

    },


rotate（）：随机0-3次shap；这里我们可以先不看这个代码，下面我再解释这个旋转的问题；

painShap（）：绘制shap【】。当shap【i】【j】【2】==1的时候，我们就给它上色；为0我们就不管它；

    painShap() {

      for (var i = 0; i \&lt; this.shap.length; i++) {

        for (var j = 0; j \&lt; this.shap[i].length; j++) {

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




# 第二步：旋转rotate（）；

现在我们就来讲旋转的这个问题；

2.1：如果要把一个shap，旋转90度，有什么变化呢？



没错，我们已经看出来，旋转90度，就是 **把行变列，列变行。我们只要把上色状态改变一下就可以了。**

  for (let i = 0; i \&lt; this.shap.length; i++) {

          for (let j = this.shap[i].length - 1; j \&gt;= 0; j--) {

            shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];

          }

        }


那现在我们就可以开始写rotate（）随机旋转的方法了：

   //旋转90度的方法

    rotate() {

      var changge = parseInt(Math.random() \* 4);

      console.log(&quot;变&quot; + changge + &quot;次&quot;)

      for (i = 0; i \&lt;= changge; i++) {

        let shap1 = [];

        // 深拷贝

        shap1 = JSON.parse(JSON.stringify(this.shap));

        //行变列。列变行,把结果先存在shap1里；

       【行变列。列变行,把结果先存在shap1里。这里上面已经展示过代码了，就不复制了。】

                                     }

        this.deleteShap();

        //那么就把shap1的值赋给shap

        this.shap = JSON.parse(JSON.stringify(shap1));

        this.painShap();

      }

    },

 ![](./)

deleteShap（）方法：将最初shap【】的上色小方块给清理掉。

因为每次变化shap【】我们就要清除原来最初的shap【】。

清理完之后，才用painShap方法绘制新的shap【】

 //清除单方块形状

    deleteShap() {

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

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


2.2：我们还得再写一个单次旋转不随机的方法：change（）。

因为玩游戏的时候，肯定不能随机旋转吧，肯定是按照顺时针一步一步来旋转改变shap【】的，所以就有了change（）。这个时候旋转是不受控制的。

**我们在旋转过程中，就要考虑到这几个问题：**

1. 旋转的时候，shap上次的部分不能超出all画布：x坐标的范围必须在0-380之间；y坐标必须小于780；为啥y可以小于0？因为我初始的时候shap的y坐标就已经小于0了哦~
2. 旋转的时候，shap不能碰到已经堆积好的方块（all【i】【j】=1）。



这个小方块的x，y表示的是左上角的坐标。所以x在all的范围是0-380；y是0-780。一下就是判断的方法；

for (let i = 0; i \&lt; shap1.length; i++) {

          for (let j = 0; j \&lt; shap1[i].length; j++) {

            try {

              if (

                ((shap1[i][j][0] \&lt; 0 || shap1[i][j][0] \&gt; 380||shap1[i][j][1] \&gt; 780) &amp;&amp; shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {

                //两个同时成立退出；

                return;

              }

            } catch (error) {

            }

          }

        }


这样我们就可以开始写change（）了。

 change() {

        let shap1 = [];

        // 深拷贝

        shap1 = JSON.parse(JSON.stringify(this.shap));

        //行变列。列变行,把结果先存在shap1里；

       【行变列。列变行,把结果先存在shap1里。这里上面已经展示过代码了，就不复制了。】

        //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；

       【改变方向以后，会不会超出墙||碰到堆积好的方块；这里上面已经展示过代码了，就不复制了。】

        this.deleteShap();

        //那么就把shap1的值赋给shap

        this.shap = JSON.parse(JSON.stringify(shap1));

        this.painShap();

      }

    }


# 第三步：移动：左移动，右移动，下移动；

3.1：左右移动 left（）和right（）：每向左右移动一次，x坐标都要+-20;

以左移动为例：每次移动都要清除原来的上色shap【】哦~

     for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

 ![](./)

但是我们要考虑的问题就有：

1. x再怎么加都不能超过380；再怎么减都不能少于0；
2. 每次左右移动的时候，如果碰到已经堆积好的方块们，就不能再左右移动了。


现在我们就可以写左移动的方法：left（）：

    // 向左

    left() {

      //判断左移动的过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

          var y = this.shap[i][j][1] / 20;

          var x = this.shap[i][j][0] / 20;

          try {

            //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。

            if (

              (this.shap[i][j][0] \&lt; 20 || this.all[y][x - 1] == 1) &amp;&amp; this.shap[i][j][2] == 1

            ) {

              //左边有东西||或者靠墙了。不要向左了。

              return;

            }

          } catch (error) {

            // console.log(&quot;有bug&quot;)

          }

        }

      }

      //经过两个判断结束以后，没有符合，继续向左移动

      【左移动，上面已经展示过代码，不在复制】

      this.painShap();

    },

 ![](./)

左右代码同理；此处就不再展示了。

3.2：下降down（）：向下，y坐标就是+20；

然而在下降的过程中，我们要考虑什么问题呢？

1. **我下降的时候，不能再下降了，还能不能继续下降？**
2. **我下降的时候，会不会超出y坐标会不会超过780？或者碰到了，已经堆积好的方块们，要怎么办？**
3. **我下降的时候，满格了要怎么办？**

现在我们就来一一解决这些问题。

解决这些问题，那么下降down（）的方法也就出来来。

**第一个问题：** 当红框要继续下降的话，这个时候，游戏就应该结束了。因为接下去新的shap的第二层就放不到all里。



所以我们我们可以看到all【0】，也就是画布的第一行橙色框框所示，只要已经存在上色的小方块。那么游戏就可以结束了。

然后我们就清空分值，清空all。清空整个400\*800上色过的画布；

  for (let i = 0; i \&lt; this.all[0].length; i++) {

        if (this.all[0][i] == 1) {

          alert(&quot;游戏结束&quot;);

        this.scope = 0;

        this.all.splice(0, this.all.length); //清空存放单方块的数组

        //清空整个画布

        this.context.clearRect(0, 0, 400, 800);

          return;

        }

      }

 ![](./)

**第二个问题** ：在下降的过程中，如果碰到已经上色过的all【】，或者y要超过780的时候，那么shap【】就要停止下降了。

然后计算  不再下降的shap的位置  得到有颜色的小方块的位置，给all里对应的小方块赋值为1；

//判断下降过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

          var y = this.shap[i][j][1] / 20;

          var x = this.shap[i][j][0] / 20;

          try {

            if (

              (this.shap[i][j][1] \&gt;= 780 || this.all[y + 1][x] == 1) &amp;&amp; this.shap[i][j][2] == 1

            ) {

              //会的话，那就就开始把shap加入this。all；

              for (let i = 0; i \&lt; this.shap.length; i++) {

                for (let j = 0; j \&lt; this.shap[i].length; j++) {

                  if (this.shap[i][j][2] == 1) {

                    var y = this.shap[i][j][1] / 20;

                    var x = this.shap[i][j][0] / 20;

                    this.all[y][x] = 1;

                  }

                }

              }

              //放完以后退出

              return;

            }

          } catch (error) {

          }

        }

      }

 ![](./)

**第三个问题** ：如果下降的过程中满行了。那么我们就要清空这一整行的小方块们；

- 把满行的小方块的清空以后，再清空现在屏幕上所有的堆积方块。this.deletAll();

  deletAll() {

      for (let i = 0; i \&lt; this.all.length; i++) {

        for (let j = 0; j \&lt; this.all[i].length; j++) {

          if (this.all[i][j] == 1) {

            this.context.clearRect(

              j \* 20,

              i \* 20,

              20,

              20

            );

          }

        }

      }

    },

 ![](./)

- 这个时候整个all的值就长成这个样子了。被清空的我用黄色框框起来了。

 ![](./) ![](./)
​

- 被清空的部分，需要被清空行上面的集体往下移动，达到这个效果：这个方法就为allDown();代码如下：

我们从最底层往上遍历，只要有一层有一个上色的小方块，我就continue；

直到这一行都是为空，那么这行的上面所有行集体往下移动；依次类推；

最后，要记得最顶层all【0】要默认值全为0；

    allDown() {

      for (let i = this.all.length - 1; i \&gt;= 0; i--) {

        var num = 0; //一整行填满的方块数量

        for (let j = 0; j \&lt; this.all[i].length; j++) {

          //如果没有

          if (this.all[i][j] == 1) {

            //只有这一行有存在1的那我就不管了。

            continue; //跳出本次循环；

          } else {

            num++;

            //假如这一行都是为空的话。那么开始，这行以上的全部集体往下移动；

            if (num == this.allLength) {

              this.allLength = this.all[0].length;

              var a0 = JSON.parse(JSON.stringify(this.all[0]));

              if (i - 1 \&gt;= 0) {

                for (let k = i - 1; k \&gt;= 0; k--) {

                  this.all[k + 1] = this.all[k];

                }

                this.all[0] = a0;

              }

            }

          }

        }

      }

    },

 ![](./)

- 集体往下移动以后，那就在重绘堆积的方块——painAll()：

   //重绘堆积好的方块；

    painAll() {

      for (let i = 0; i \&lt; this.all.length; i++) {

        for (let j = 0; j \&lt; this.all[i].length; j++) {

          if (this.all[i][j] == 1) {

            this.context.fillRect(

              j \* 20,

              i \* 20,

              20,

              20

            );

          } else {

            this.context.clearRect(

              j \* 20,

              i \* 20,

              20,

              20

            );

          }

        }

      }

    }

 ![](./)

- 最后我们就可以完整的写出满格的方法了：满格了那分数就加10分吧。恭喜恭喜~得了10分；

​//先判断是否满格了,满格就退出；

        for (let i = 0; i \&lt; this.all.length; i++) {

          var num = 0; //一整行填满的方块数量

          for (let j = 0; j \&lt; this.all[i].length; j++) {

            //如果没有

            if (this.all[i][j] != 1) {

              continue;

            } else {

              num++;

              if (num == this.allLength) {

                for (let j = 0; j \&lt; this.all[i].length; j++) {

                  this.context.clearRect(

                    j \* 20,

                    i \* 20,

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

​

 ![](./)

好了，亲爱的朋友们，写到这里我已经心力交瘁了，很快，我们马上就要迎来最终down方法了。

 ![](data:image/*;base64,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) ![](./)
​

在下降之前，我们只要判断一下是否存在刚才的那3个问题。如果不存在的话，ok。咱们可以往下移动了~

  //向下

    down() {

      【判断第一个问题是否存在的代码：存在，那咱们return吧】

      【判断第二个问题是否存在代码：存在，那咱们return吧】

      【判断第三个问题是否存在代码：存在，那咱们return吧】

      //经过3个问题的判断以后，没有符合，那么我们继续向下移动

      {

        for (let i = 0; i \&lt; this.shap.length; i++) {

          for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

 ![](./)

开森，终于写完了耶~~

 ![](data:image/*;base64,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) ![](./)
​

# **最后还是说一下：**

 ![](data:image/*;base64,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) ![](./)
​这个俄罗斯方块，确实还是存在一些bug。（好吧，不是一些，是很多。）

比如：当下降的时候，我一直让shap旋转，于是……我的shap直接就超过all这个画布了。然后就拜拜了。。。。 **这个问题我也不知道是什么问题。没解决好。如果你们发现了。可以跟我说下哦~**

其他的我还没发现|||

还有就是……我的代码，用了不知道多少个for循环。。这肯定不是一个好的方法。尴尬了。。。。。

 ![](data:image/*;base64,/9j/4QCcRXhpZgAASUkqAAgAAAAHADIBAgAUAAAAYgAAAAEBAwABAAAASAAAABIBAwABAAAAAAAAAAABAwABAAAASwAAAAiSAwABAAAAAAAAAAeSAwABAAAA/////2mHBAABAAAAdgAAAAAAAAAyMDE2OjA0OjE0IDIxOjA3OjI4AAIAAQIEAAEAAACUAAAAAgIEAAEAAAAAAAAAAAAAAP/bAEMACgcHCAcGCggICAsKCgsOGBAODQ0OHRUWERgjHyUkIh8iISYrNy8mKTQpISIwQTE0OTs+Pj4lLkRJQzxINz0+O//bAEMBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAEgASwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APYaO1FYGqTTXd8uk2MskLsvmXM6DmGPOAB/tsQQPQAnstSSiS41yR7iSx0y1F/cRnEpD7IoT6O+Dz7AE+wqJtM1+9wZ/EAtF7pYWy/+hSb8/kK07DT7fT7aO3toliijGAq/zPqfertAGAuh6nGD5fim/Jz/AMtYoW/9kFG3xJaJlXstUiA+6Q0Eh/HLqfyFbtFBNzF07xLa3dybK5jl0697W90ArSe6EEhx9Ca3KztT0iy1e1ktr2Dzo2ORngoexU9QfcVkWN/d6JfRaVrFw1xBO22yv36ue0Uno/oe/wBaCjqKKQd6WgCGSVYYnlkYKiAsWPQAd6x/C8Razm1OVCs+pyfaCD1VMYjT8EA/EmmeMLlIdDe3eZIft0iW29m2hVY/Oc+yBj+FbcSqqBUACAAKB6UE9CO7u4bK1nuriQRxQoXdz/CoGSasA5zXJ6rfvqtjeWLxL5M+prYIAeZEBXzM/kw+laemXMlpcNpN4zGRQWtpWP8Ax8Rj3/vLwD+B70gsbdFFVb65FnZT3LIXEKlyq9cDrj8KZRYFUtS0621Wzls7yISwSjayt/MehHrVqORXQOrAqRkEdMVzviLUNUFk507Slv7Ka2YvLDc7JeQeUGOeMEHPekSh3h28nguJ9D1CdpruzAaKdutxAThXP+0Put78966OuQ+Hmj21p4ds9RFhHDeXMA82XdvaQZ4O7J4IwcCuvpg2YfibwxY+J7RLW9MgWMs0ZQ4wxUrnHfGc1X8HW72q6rA9zPcCG+ZFeZ9zYEcf5c54HFdCWKqSASfQVzOl6mtnc+IMLmNL4sXOflJijPzDGQPf2NTexUU5aIz7a8trTWzBdypEunX15eSsx4UELtJ/C7/SugvorDVrM5nT5VE8M8bjdH6SKf69DyDxXG3mlC58bXQF1LYw63aPCXwrCRvlBA7YKgEEHOeK2NW8IpZ3A1TRzLBPFgOgy6GPJL4jyMk55GR6jmjcdrOzI9J8dwT3VxYX0qpLbOAL1B+4nQgFXyCQmQR1498/JXVm6t5IjtdJFKbiFO7Knv7iuPXwHaR+H4JNJuFXUIgkqXMOdkxAHBXJyrAD6nBo0vQ5tStYbyNRbpdIswlgYpkNgnjJww9DkehFJtrZGkIU5K7lY6PwpcLN4etMP5hhQwk5z90lf6U/w9IraZ5H/PrNJbgegR2Vf0ArG8F6Y0Vgt4bySRvtE6ZHAdRK4+YdCc5OcA84qzp1xPbnXxFG0jQX5IRe+6ONvc/x54BPoCfkDTvuZzUU7Rd0L4UItJ9W0ZsgWV0WhB/55P8AOuPYEkfhXSVzM7my8X6ZdlWRdUtmtJVbHyun7xM44zguK6fNUQA71haaiQeJNbjI+aXybnOOzIU/9oVuisYhYfFCkNxdWjKfqjgj/wBHn8qBxKHiDTos2kq2LS2kQeGaOBcSRoxVg6Ac5VogeOepFWfDusLe6feM9wlwljK0P2hf+WyhQ24+hw2D7g1b1vUhpWmTzxx+dOSI4Yj/AMtJGOFX8yPwrNvNO/snwZeWzSmSaeJ1klP/AC0lkJBb8Wf8qB77jfh9M0nh0RtIJPJlKgg56gMR+Bc1S8LeKIF0K1tILK+vZYN0JFvbMUBDEYLnCDjHetPwbHDb6A00UaxxzzzXCIowAhdtuB/ugVzkSz6D4StNYs0Jjlsgb6MDHmbl+WUf7QJGfUfRKQdTqfA+4+EtPkYYM0Zlx/vMW/rTfD5zrvibH/P5H/6IjrQ0S0Flomn2p4NtbRx/koFZnhAiZNWvRyLzUZZEPqq4iH/oqmMj8dEW2kW+pd9NvoLn/gO8K36Ma6TevrWH42iEvg3WVxnFo7fkM/0rQ0e4+06JY3HmA+bbxv8AmoNSIv1ia/L9jfTdQJAWC8RHJ/uv+7/m4P4UUVQIrX7JceK9It5mxDHHLcxA9JJRtUfiFkJ/H2qn8QdSFvpH2KNS87ETbQeQFIKn6F9ifjRRSBdDoNP0yOz0a300fdhgWE7eOAuKw7q1F9oU2k6bC9zFZolrh3CpMAQGTd6hRgnGMnHJDpRRQBQ0u28VSWUenLqkCrG5tppFX95ahMYKn+MsuOo75rW8O6jo1jYrpVtqQl+wxHfI4IEgU/O4Y8HnOcE4oopCMzXPEN1rFpeWfh7SG1e1lt3hmuUlCBHYYAXd94jOSBW/4egksfDunWl5Ai3EFrHHIMjghQOwoooBH//Z) ![](./)
​然而我只会用最土的方法。

写到这里，咱们俄罗斯方块的各种方法已经完全结束了。就可以看着去运用这些方法啦~

如果你想看完整的代码请点击这里：[https://github.com/Chenyating/Retro-Snaker](https://github.com/Chenyating/Retro-Snaker)

感谢您的来访。谢谢。

 ![](data:image/*;base64,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) ![](./)
​

**第一次如此热诚的写下技术分析贴。语言稍有不通，如果你哪里没有看明白，请你留言，看到留言后，我会马上回复。**

再次最后：

我的代码主要有一下这些方法。

 ![](./) ![](./)
​

以下是完整js代码：

var startx, starty;//获得角度function getAngle(angx, angy) {

  return (Math.atan2(angy, angx) \* 180) / Math.PI;

}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动function getDirection(startx, starty, endx, endy) {

  var angx = endx - startx;

  var angy = endy - starty;

  var result = 0;

  //如果滑动距离太短

  if (Math.abs(angx) \&lt; 2 &amp;&amp; Math.abs(angy) \&lt; 2) {

    return result;

  }

  var angle = getAngle(angx, angy);

  if (angle \&gt;= -135 &amp;&amp; angle \&lt;= -45) {

    result = 1;

  } elseif (angle \&gt; 45 &amp;&amp; angle \&lt; 135) {

    result = 2;

  } elseif (

    (angle \&gt;= 135 &amp;&amp; angle \&lt;= 180) ||

    (angle \&gt;= -180 &amp;&amp; angle \&lt; -135)

  ) {

    result = 3;

  } elseif (angle \&gt;= -45 &amp;&amp; angle \&lt;= 45) {

    result = 4;

  } else {

    result = 0;

  }

  return result;

}//手指接触屏幕document.addEventListener(

  &quot;touchstart&quot;,

  function (e) {

    startx = e.touches[0].pageX;

    starty = e.touches[0].pageY;

  },

  false

);

//手指离开屏幕let timer = null;//速度控制

document.addEventListener(

  &quot;touchend&quot;,

  function (e) {

    if (app.gameState == 0) {

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

      app.change();

      timer = setInterval(() =\&gt; {

        app.down();

      }, app.v)

    }

    app.downV = 100;

    if (direction == 2) {

      timer = setInterval(() =\&gt; {

        app.down();

      }, app.downV)

    }

    if (direction == 3) {

      app.left();

      timer = setInterval(() =\&gt; {

        app.down();

      }, app.v)

    }

    if (direction == 4) {

      app.right();

      timer = setInterval(() =\&gt; {

        app.down();

      }, app.v)

    }

  },

  false

);

var app = new Vue({

  el: &quot;#teris&quot;,

  data: {

    scope: 0,

    v: 300,

    downV: 100,

    radomID: null, //图像编号

    shap: [], //存放图形

    all: newArray(), //存放所有已经内容

    context: null, //画布

    rotateID: 0, //旋转的状态,

    allLength: null,

    gameState: 0

  },

  methods: {

    begin() {

      if (this.gameState != 0) {

        //游戏结束状态

        $(&quot;#title&quot;).html(&quot;&quot;);

        $(&quot;#title&quot;).html(&quot;游戏开始&quot;);

        this.gameState = 0;

        this.scope = 0;

        this.all.splice(0, this.all.length); //清空存放单方块的数组

        //清空整个画布

        this.context.clearRect(0, 0, 400, 800);

      }

      //游戏开始状态

      else {

        //初始化堆积方块

        for (let i = 0; i \&lt; 40; i++) {

          this.all[i] = newArray(0);

          for (let j = 0; j \&lt; 20; j++) {

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

        timer = setInterval(() =\&gt; {

          this.down();

        }, this.v)

        $(&quot;#title&quot;).html(&quot;&quot;);

        $(&quot;#title&quot;).html(&quot;游戏结束&quot;);

      }

    },

    //绘制

    pain() {

      var c = document.getElementById(&quot;stage&quot;);

      this.context = c.getContext(&quot;2d&quot;);

      this.context.fillStyle = &quot;#000000&quot;;

    },

    //绘制图像

    painShap() {

      for (var i = 0; i \&lt; this.shap.length; i++) {

        for (var j = 0; j \&lt; this.shap[i].length; j++) {

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

      this.radomID = parseInt(Math.random() \* 7);

      // this.deleteShap();

      this.shap.splice(0, this.shap.length); //清空存放单方块的数组

      //shap数组开始存储不同单方块

      switch (this.radomID) {

        case0:

          //长条

          let defaultX = 200;

          let defaultY = -60;

          for (var i = 0; i \&lt; 5; i++) {

            defaultX = 200;

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

        case1:

          //正方形

          this.$set(this.shap, 0, [

            [200, -40, 1],

            [220, -40, 1]

          ]);

          this.$set(this.shap, 1, [

            [200, -20, 1],

            [220, -20, 1]

          ]);

          break;

        case2:

          //正7

          this.$set(this.shap, 0, [

            [200, -60, 1],

            [220, -60, 1],

            [240, -60, 0]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 0],

            [220, -40, 1],

            [240, -40, 0]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 1],

            [240, -20, 0]

          ]);

          break;

        case3:

          //反7

          this.$set(this.shap, 0, [

            [200, -60, 0],

            [220, -60, 1],

            [240, -60, 1]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 0],

            [220, -40, 1],

            [240, -40, 0]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 1],

            [240, -20, 0]

          ]);

          break;

        case4:

          //正2

          this.$set(this.shap, 0, [

            [200, -60, 1],

            [220, -60, 1],

            [240, -60, 0]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 0],

            [220, -40, 1],

            [240, -40, 1]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 0],

            [240, -20, 0]

          ]);

          break;

        case5:

          //反2

          this.$set(this.shap, 0, [

            [200, -60, 0],

            [220, -60, 1],

            [240, -60, 1]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 1],

            [220, -40, 1],

            [240, -40, 0]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 0],

            [240, -20, 0]

          ]);

          break;

        case6:

          //土

          this.$set(this.shap, 0, [

            [200, -60, 0],

            [220, -60, 1],

            [240, -60, 0]

          ]);

          this.$set(this.shap, 1, [

            [200, -40, 1],

            [220, -40, 1],

            [240, -40, 1]

          ]);

          this.$set(this.shap, 2, [

            [200, -20, 0],

            [220, -20, 0],

            [240, -20, 0]

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

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

      var changge = parseInt(Math.random() \* 4);

      console.log(&quot;变&quot; + changge + &quot;次&quot;)

      for (i = 0; i \&lt;= changge; i++) {

        let shap1 = [];

        // 深拷贝

        shap1 = JSON.parse(JSON.stringify(this.shap));

        //行变列。列变行,把结果先存在shap1里；

        for (let i = 0; i \&lt; this.shap.length; i++) {

          for (let j = this.shap[i].length - 1; j \&gt;= 0; j--) {

            shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];

          }

        }

        // //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；

        // for (let i = 0; i \&lt; shap1.length; i++) {

        //   for (let j = 0; j \&lt; shap1[i].length; j++) {

        //     try {

        //       if (

        //         ((shap1[i][j][0] \&lt; 0 || shap1[i][j][0] \&gt; 380||shap1[i][j][1] \&gt; 780) &amp;&amp; shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {

        //         //两个同时成立退出；

        //         return;

        //       }

        //     } catch (error) {

        //     }

        //   }

        // }

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

        for (let i = 0; i \&lt; this.shap.length; i++) {

          for (let j = this.shap[i].length - 1; j \&gt;= 0; j--) {

            shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];

          }

        }

        //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；

        for (let i = 0; i \&lt; shap1.length; i++) {

          for (let j = 0; j \&lt; shap1[i].length; j++) {

            try {

              if (

                ((shap1[i][j][0] \&lt; 0 || shap1[i][j][0] \&gt; 380||shap1[i][j][1] \&gt; 780) &amp;&amp; shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {

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

      for (let i = 0; i \&lt; this.all[0].length; i++) {

        if (this.all[0][i] == 1) {

          alert(&quot;游戏结束&quot;);

          clearInterval(timer);

          $(&quot;#title&quot;).html(&quot;&quot;);

        $(&quot;#title&quot;).html(&quot;游戏开始&quot;);

        this.gameState = 0;

        this.scope = 0;

        this.all.splice(0, this.all.length); //清空存放单方块的数组

        //清空整个画布

        this.context.clearRect(0, 0, 400, 800);

          return;

        }

      }

      //判断下降过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

          var y = this.shap[i][j][1] / 20;

          var x = this.shap[i][j][0] / 20;

          try {

            if (

              (this.shap[i][j][1] \&gt;= 780 || this.all[y + 1][x] == 1) &amp;&amp; this.shap[i][j][2] == 1

            ) {

              //会的话，那就就开始把shap加入this。all；

              for (let i = 0; i \&lt; this.shap.length; i++) {

                for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

              timer = setInterval(() =\&gt; {

                this.down();

              }, this.v)

              console.log(this.all)

              return;

            }

          } catch (error) {

            // console.log(&quot;y有bug&quot;)

          }

        }

      }

      //先判断是否满格了,满格就退出；

        for (let i = 0; i \&lt; this.all.length; i++) {

          var num = 0; //一整行填满的方块数量

          for (let j = 0; j \&lt; this.all[i].length; j++) {

            //如果没有

            if (this.all[i][j] != 1) {

              continue;

            } else {

              num++;

              if (num == this.allLength) {

                for (let j = 0; j \&lt; this.all[i].length; j++) {

                  this.context.clearRect(

                    j \* 20,

                    i \* 20,

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

        for (let i = 0; i \&lt; this.shap.length; i++) {

          for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

          var y = this.shap[i][j][1] / 20;

          var x = this.shap[i][j][0] / 20;

          try {

            //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。

            if (

              (this.shap[i][j][0] \&lt; 20 || this.all[y][x - 1] == 1) &amp;&amp; this.shap[i][j][2] == 1

            ) {

              //左边有东西||或者靠墙了。不要向左了。

              return;

            }

          } catch (error) {

            // console.log(&quot;有bug&quot;)

          }

        }

      }

      //经过两个判断结束以后，没有符合，继续向左移动

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

          var y = this.shap[i][j][1] / 20;

          var x = this.shap[i][j][0] / 20;

          try {

            //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。

            if (

              (this.shap[i][j][0] \&gt; 360 || this.all[y][x + 1] == 1) &amp;&amp; this.shap[i][j][2] == 1

            ) {

              return;

            }

          } catch (error) {

            // console.log(&quot;x太大&quot;)

          }

        }

      }

      //经过两个判断结束以后，没有符合，继续向右移动

      for (let i = 0; i \&lt; this.shap.length; i++) {

        for (let j = 0; j \&lt; this.shap[i].length; j++) {

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

      for (let i = 0; i \&lt; this.all.length; i++) {

        for (let j = 0; j \&lt; this.all[i].length; j++) {

          if (this.all[i][j] == 1) {

            this.context.clearRect(

              j \* 20,

              i \* 20,

              20,

              20

            );

          }

        }

      }

    },

    //整体堆积好的方块往下；

    allDown() {

      for (let i = this.all.length - 1; i \&gt;= 0; i--) {

        var num = 0; //一整行填满的方块数量

        for (let j = 0; j \&lt; this.all[i].length; j++) {

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

              if (i - 1 \&gt;= 0) {

                for (let k = i - 1; k \&gt;= 0; k--) {

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

      for (let i = 0; i \&lt; this.all.length; i++) {

        for (let j = 0; j \&lt; this.all[i].length; j++) {

          if (this.all[i][j] == 1) {

            this.context.fillRect(

              j \* 20,

              i \* 20,

              20,

              20

            );

          } else {

            this.context.clearRect(

              j \* 20,

              i \* 20,

              20,

              20

            );

          }

        }

      }

    }

  },

  mounted() {

    var c = document.getElementById(&quot;stage&quot;);

    this.context = c.getContext(&quot;2d&quot;);

  }

});

 ![](./)
