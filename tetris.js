var app = new Vue({
    el: "#teris",
    data: {
        scope: 10,
        v: 10,
        radomID: null,//图像编号
        shap: [],//存放图形
        context: null,//画布
        all:[],
        defaultX:400,
        defaultY:0,
        direction:1,//方块移动方向
    },
    methods: {
        //绘制
        pain() {
            var c = document.getElementById("stage");
            this.context = c.getContext("2d");
            this.context.fillStyle = "#8A3324";
            // this.context.clearRect(0, 0, 800, 1500);
        },
        //绘制
        painShap(){
            for (var i = 0; i < this.shap.length; i++) {
                this.context.fillRect(this.shap[i][0], this.shap[i][1], 20, 20); //绘制
            }
        },
        //随机绘制图形
        radomShap() {
            this.pain();
            this.radomID = parseInt(Math.random() * 6);
            this.shap.splice(0, this.shap.length);//清空存放图形的数组
            //开始存储不同形状的数组
            switch (this.radomID) {
                case 0:
                //长条
                    this.shap.push([this.defaultX,this.defaultY]);
                    this.shap.push([this.defaultX + 20,this.defaultY]);
                    this.shap.push([this.defaultX + 40,this.defaultY]);
                    this.shap.push([this.defaultX + 60,this.defaultY]);
                    break;
                case 1:
                //正方形
                    this.shap.push([this.defaultX,this.defaultY]);
                    this.shap.push([this.defaultX, this.defaultY+20]);
                    this.shap.push([this.defaultX + 20,this.defaultY]);
                    this.shap.push([this.defaultX + 20, this.defaultY+20]);
                    break;
                case 2:
                //正7
                    this.shap.push([this.defaultX,this.defaultY]);
                    this.shap.push([this.defaultX + 20,this.defaultY]);
                    this.shap.push([this.defaultX + 20, this.defaultY+20]);
                    this.shap.push([this.defaultX + 20, 40]);
                    break;
                case 3:
                //反7
                    this.shap.push([this.defaultX,this.defaultY]);
                    this.shap.push([this.defaultX + 20,this.defaultY]);
                    this.shap.push([this.defaultX , this.defaultY+20]);
                    this.shap.push([this.defaultX , 40]);
                    break;
                case 4:
                //正2
                    this.shap.push([this.defaultX,this.defaultY]);
                    this.shap.push([this.defaultX + 20,this.defaultY]);
                    this.shap.push([this.defaultX + 20, this.defaultY+20]);
                    this.shap.push([this.defaultX + 40, this.defaultY+20]);
                    break;
                case 5:
                    this.shap.push([this.defaultX,this.defaultY]);
                    this.shap.push([this.defaultX -20, this.defaultY+20]);
                    this.shap.push([this.defaultX + 20,this.defaultY]);
                    this.shap.push([this.defaultX , this.defaultY+20]);
                    break;
                default:
                    break;
            }
            this.painShap();
        },
        down(){
            if(this.shap[3][1]>1480){
                return
            }
            for (var i = 0; i < this.shap.length; i++) {
                this.context.clearRect(this.shap[i][0],this.shap[i][1], 20, 20);
                this.shap[i][1]=this.shap[i][1]+20;
                console.log(this.shap[i][0]+"和"+this.shap[i][1])
            }
            this.painShap()
        },
        behavior(){
            switch (direction) {
                case 1:
                    
                    break;
            
                default:
                    break;
            }
        }
    },
    mounted() {
    },
})