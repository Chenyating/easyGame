var fruit = new Vue({
  el: "#fruit",
  data: {
    ctx: null,
    shu: [],
    shuzu:[],
    str:null,
  },
  methods: {
    giveImg(){
        var reads= new FileReader();
        f=document.getElementById('youImg').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            document.getElementById('show').src=this.result;
        };
    },
    getImgData(){

    }
  },
  mounted() {
    var c1 = document.getElementById("haha");
    var ctx = c1.getContext("2d");
    var img = document.getElementById("show");
    console.log(img)
    ctx.drawImage(img, 0, 0, 300, 100);

    // 获得图片像素点
    var imgData = ctx.getImageData(0, 0, 300, 100);
    var q=0,w=0;
    this.shu[0]=null;
    for (var i = 3; i < imgData.data.length; i+=4) {
        if(imgData.data[i]==0){
            this.shu[q]=[0]
        }
        else{
            this.shu[q]=[1]
        }
        q=q+1;
    }
    console.log("欢迎报考小天才科技有限公司")
    // 给点设置东西
    var a=0;
    for (let i = 0; i < 100; i++) {
        this.shuzu[i]=[];
        for (let j = 0; j < 300; j++) {
            if(this.shu[a]==1){
                this.shuzu[i][j]="#"
            }else{
                this.shuzu[i][j]=" "
            }
            a=a+1;
        }
        
    }
    // 打印
    this.str = '';
    var q=0;
    var b=0;
          for (let i = 0; i < 100; i+=5) {
             for (let j = 0; j <300; j+=5) {
                this.str += this.shuzu[i][j]    
            }
            this.str += " \n";
          }
          console.log(this.str);
   }
});
