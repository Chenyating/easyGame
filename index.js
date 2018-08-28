var app = new Vue({
    el: "#app",
    data: {
        radomX: null,
        radomY: null,
        foodX: null,
        foodY: null,
        headX: null,
        headY: null,
        footX: null,
        footY: null,

    },
    methods: {
        radomx: function () {
            this.radomX = parseInt(Math.random() * 10);
        },
        radomx: function () {
            this.radomX = parseInt(Math.random() * 10);
        },

    },
    mounted() {
            for (var k = 0; k < 100; k++) {
                $(".stage").append("<div id='div" + k + "' class='block' >" + "</div>");
            }
    }
})
var startx, starty;

//获得角度
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }

    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }

    return result;
}
//手指接触屏幕
document.addEventListener("touchstart", function (e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
}, false);
//手指离开屏幕
document.addEventListener("touchend", function (e) {
    if (app.one == 0) {
        return;
    }
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
        case 0:
            break;
        case 1:
            app.goUp();
            break;
        case 2:
            app.goDown();
            break;
        case 3:
            app.goLeft();
            break;
        case 4:
            app.goRigt();
            break;
        default:
    }
}, false);