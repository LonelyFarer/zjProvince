<template>
<div>
  <canvas id="c">当前浏览器不支持canvas 请升级！</canvas>
  <!-- <input type="range" name="range" min="0" max="100" step="1"> -->
</div>
</template>

<script>
export default {
    props: {
        rate: {
            
        },
    },
    data(){
        return {

        }
    },
    mounted(){
        var canvas = document.getElementById("c");
        var ctx  = canvas.getContext("2d");
        //var oRange = document.getElementsByName("range")[0];
        var M = Math;
        var Sin = M.sin;
        var Cos = M.cos;
        var Sqrt = M.sqrt;
        var Pow = M.pow;
        var PI = M.PI;
        var Round = M.round;

        var oW = canvas.width = 120;
        var oH = canvas.height = 120;

        // 线宽
        var lineWidth = 2

        // 大半径
        var r = (oW / 2);
        var cR = r - 8*lineWidth;

        ctx.beginPath();

        ctx.lineWidth = lineWidth;

        // 水波动画初始参数
        var axisLength = 2*r - 14*lineWidth;  // Sin 图形长度
        var unit = axisLength / 8; // 波浪宽
        var range = .4 // 浪幅
        var nowrange = range;  
        var xoffset = 7*lineWidth; // x 轴偏移量
        //var data = ~~(oRange.value) / 100;   // 数据量
        var data = this.rate/100;
        var sp = 0; // 周期偏移量
        var nowdata = 0;
        var waveupsp = 0.002; // 水波上涨速度

        // 圆动画初始参数
        var arcStack = [];  // 圆栈
        var bR = r-8*lineWidth;
        var soffset = -(PI/2); // 圆动画起始位置
        var circleLock = true; // 起始动画锁

        // 获取圆动画轨迹点集
        for(var i = soffset; i< soffset + 2*PI; i+=1/(8*PI)) {
            arcStack.push([
                r + bR * Cos(i),
                r + bR * Sin(i)
            ])
        }

        var cStartPoint = arcStack.shift();  // 圆起始点

        ctx.strokeStyle = "#59F7FE";
        ctx.moveTo(cStartPoint[0],cStartPoint[1])

        
        //drawCircle();
        render();  // 开始渲染
        function drawCircle(){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#59F7FE';
            ctx.setLineDash([5, 5]);
            ctx.arc(r, r, r-lineWidth, 0, 2*PI,1);
            
            ctx.stroke();
            ctx.restore();
            ctx.setLineDash([]);
        }
        function drawinsideCircle(){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#59F7FE';
            ctx.arc(r, r, r-6*lineWidth, 0, 2*PI);
            ctx.stroke();
            ctx.restore();
            ctx.beginPath();
        }
        function drawSine () {
            ctx.beginPath();
            ctx.save();
            var Stack = []; // 记录起始点和终点坐标
            for (var i = xoffset; i<=xoffset + axisLength; i+=20/axisLength) {
                var x = sp + (xoffset + i) / unit;
                var y = Sin(x) * nowrange;

                var dx = i;

                var dy = 2*cR*(1-nowdata) + (r - cR) - (unit * y);
                
                ctx.lineTo(dx, dy);
                Stack.push([dx,dy])
            }

            // 获取初始点和结束点
            var startP = Stack[0]
            var endP = Stack[Stack.length - 1]

            ctx.lineTo(xoffset + axisLength,oW);
            ctx.lineTo(xoffset,oW);
            ctx.lineTo(startP[0], startP[1])
            ctx.fillStyle = "#59F7FE";
            ctx.fill()
            ctx.restore();
        }

        function drawText () {
            ctx.globalCompositeOperation = 'source-over';
            //var size = 0.4*cR;
            var size = 14;
            //ctx.font = 'bold ' + size + 'px Microsoft Yahei';
            var txt = (nowdata.toFixed(2)*100).toFixed(0) + '%';

            var fonty = r + size/2;
            var fontx = r - size * 0.8;
            ctx.fillStyle = "#fff";
            ctx.font = 14 + 'px PingFangSC-Semibold';
            ctx.fillText('定检率', 40, 50)
            ctx.font='bold ' + 24 + 'px PingFangSC-Semibold';

            ctx.fillText(txt, 45, 90)
            // ctx.fillText(txt, fontx, fonty)
        }

        function render () {   
            ctx.clearRect(0,0,oW,oH);
            drawCircle()
            drawinsideCircle()
            if (circleLock) {
                if (arcStack.length) {
                var temp = arcStack.shift();
                ctx.lineTo(temp[0],temp[1])
                ctx.stroke();
                } else {
                    circleLock = false;
                    ctx.beginPath();  
                    ctx.save();
                    ctx.arc(r,r, r-5*lineWidth, 0, 2*PI, 1);
                    ctx.restore()
                    ctx.clip();
                    ctx.fillStyle = "#59F7FE";
                }
            }else{
            if (data >= 0.85) {
                if (nowrange > range/4) {
                    var t = range * 0.01;
                    nowrange -= t;   
                }
            } else if (data <= 0.1) {
                if (nowrange < range*1.5) {
                    var t = range * 0.01;
                    nowrange += t;   
                }
            } else {
                if (nowrange <= range) {
                    var t = range * 0.01;
                    nowrange += t;   
                }      
            if (nowrange >= range) {
                var t = range * 0.01;
                nowrange -= t;
            }
            }
            if((data - nowdata) > 0) {
                nowdata += waveupsp;      
            }
            if((data - nowdata) < 0){
                nowdata -= waveupsp
            }
            sp += 0.07;
            drawSine();
            drawText();  
            }
            requestAnimationFrame(render)
        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
    body {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
    }

    #c {
      width:6.25vw;
      height:11.11vh;     
    }
  
    input[type=range]::before {content: attr(min);  color: #000; padding-right: 5px;}
    input[type=range]::after { content: attr(max); color: #000; padding-left: 5px;}
</style>
