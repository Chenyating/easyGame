var myIndex = new Vue({
    el: "#myIndex",
    data: {
        name: "CHENYATING",
        introduction: "2018年3月开始参加工作，开始从事于前端开发工作。她的梦想是成为一名优秀的前端开发工程师！",
        H5url: [
            "https://actcdn.eebbk.com/wx-spread-course/same-step/index.html",
             "https://actcdn.eebbk.com/wx-spread-course/998middle/index.html",
              "https://actcdn.eebbk.com/test/wx-spread-course/model-comparison/index.html", 
              "https://actcdn.eebbk.com/wx-spread-course/spreadpages/fastsearch.html"],
        officialUrl: [
            "https://www.okii.com/html/pc/index/index.html", 
            "https://bbs.okii.com/",
             "https://www.imoo.com/en/h5/index/index.html",
              "https://www.imoo.com/id/h5/index/index.html", 
              "http://www.imoo.co.th/th/m/index/index.html"],
        gameUrl: [
            "https://github.com/Chenyating/Developed-page",
            "http://www.yating.online/game/protectBall.html",
            "http://www.yating.online/game/tetris.html",
            "http://www.yating.online/game/retroSnaker.html",
            "http://www.yating.online/game/mine.html",
            "http://www.yating.online/game/maze.html",
            "http://www.yating.online/game/fruit.html",
            "http://www.yating.online/game/brick.html",
            "https://www.yating.online/tools/artQR",
        ],
        skills: [{
                skill: "掌握前端基础HTML、CSS",
                master: "80%"
            },
            {
                skill: "熟悉javascript脚本语言：jquery库、vue",
                master: "75%"
            },
            {
                skill: "熟悉vue、vue-cli脚手架、拥有后台系统的前端开发经验",
                master: "60%"
            },
            {
                skill: "熟悉Bootstrap、iview前端样式框架",
                master: "70%"
            },
            {
                skill: "有小程序开发经验",
                master: "50%"
            },
            {
                skill: "熟练掌握PHOTOSHOP技术，拥有4年平面设计经验",
                master: "95%"
            },
        ],
        interface: 0,
    },
    methods: {
        // 个人信息页面跳转
        goLink(index) {
            if (index == 1) {
                window.location.href = "https://blog.csdn.net/lemisi";
            }
            if (index == 2) {
                window.location.href = "https://github.com/Chenyating";
            }
            if (index == 3) {
                window.location.href = "https://chenyating.zcool.com.cn/";
            }

        },
        goH5(index) {
            window.location.href = this.H5url[index];
        },
        goOfficial(index) {
            window.location.href = this.officialUrl[index];
        },
        goGame(index) {
            window.location.href = this.gameUrl[index];
        },
        changeInterface(index) {
            this.interface = index;
        }
    },
})