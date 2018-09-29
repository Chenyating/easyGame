var tank = new Vue({
    el: "#tank",
    data: {
        context: null,
        myself: {
            sdeeps: 2000,
            x: 20,
            y: 10
        },
        message: "hello"
    },
    methods: {
        myTank() {
            this.context.shadowBlur = 5;
            this.context.shadowColor = "red";
            this.context.fillStyle = "blue";
            this.context.fillRect(this.myself.x, this.myself.y, 100, 80);
            this.context.fillStyle = "green";
            this.context.fillRect(this.myself.x, this.myself.y, 20, 20);
        },
        rightMyTank(){
            this.context.shadowBlur = 5;
            this.context.shadowColor = "red";
            this.context.fillStyle = "blue";
            this.context.fillRect(this.myself.x, this.myself.y, 80, 100);
            this.context.fillStyle = "green";
            this.context.fillRect(this.myself.y-this.myself.y, this.myself.x, 20, 20);
        },
        clearTank(){
            this.context.clearRect(this.myself.x, this.myself.y, 100, 80);
        },
        right() {
            this.clearTank();
            this.myself.x += 20;
            console.log(this.myself.x);
        },
        lefe() {
            this.myself.x -= 20;
            console.log(this.myself.x);
        }
    },
    mounted() {
        var c = document.getElementById("stage");
        this.context = c.getContext("2d");
        this.myTank();
    },
    watch: {
        myself:{
            handler(val, oldVal) {
                    this.rightMyTank();
                },
                deep: true
        }
    }
})