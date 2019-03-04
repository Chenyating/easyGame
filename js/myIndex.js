var myIndex=new Vue({
    el:"#myIndex",
    data:{
        name:"陈雅婷",
        introduction:"陈雅婷，女，毕业于天津工业大学，籍贯福建，2018年3月开始参加工作，开始从事于前端开发工作。她的梦想是成为一名优秀的前端开发工程师！"
    },
    methods: {
        // 个人信息页面跳转
        goLink(index){
            if(index==1){
                window.location.href="https://blog.csdn.net/lemisi";
            }
            if(index==2){
                window.location.href="https://github.com/Chenyating";
            }
            if(index==3){
                window.location.href="https://chenyating.zcool.com.cn/";
            }

        }
    },
})