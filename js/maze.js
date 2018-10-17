var maze = new Vue({
    el: "#maze",
    data: {
      scope: 0,
      you:"../img/maze/you.png",
      me:"../img/maze/me.png",
      youX:20,
      youY:20,
      meX:360,
      meY:760,
    },
    methods: {
      //随机生成x坐标
      up() {
        console.log("ddd")
      },
  
    },
    mounted() {

    },
    watch: {}
  });