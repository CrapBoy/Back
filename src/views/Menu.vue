<template>
<div>

<div>
<div id="big">
<div class="box"> 
<el-progress type="circle" :percentage="30" ></el-progress>
<el-tag type="success">cup使用率</el-tag>
</div>

<div class="box"> 
<el-progress type="circle" :percentage="55"></el-progress>
<el-tag type="success">内存使用率</el-tag>
</div>

<div class="box"> 
<el-progress type="circle" :percentage="75"></el-progress>
<el-tag type="success">虚拟机使用率</el-tag>
</div>

<div class="box"> 
<el-progress type="circle" :percentage="100" ></el-progress>
<el-tag type="success">硬盘使用率</el-tag>
</div>
</div >
</div>
    <div id="main" style="width:100%;height:800px;"></div>
</div>
</template>

<script>
export default {
  mounted() {
    this.drawPain();
  },
  methods: {
    drawPain() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      setTimeout(function() {
        var option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                    ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            grid: {top: '55%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };

        myChart.on("updateAxisPointer", function(event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)"
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        myChart.setOption(option);
      });
    }
  }
};
</script>

<style>
    .box{
    width: 120px;
    height: 180px;
    background: #67c23a;
    display: flex;
    flex-flow: column;
    padding: 20px 50px;
    justify-content: space-around;
    border-radius: 5px;
    align-items:center;
}


#big{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: space-between;
}

#big>div:nth-of-type(2){
    background:  #e6a23c; 
}
#big>div:nth-of-type(3){
    background:  #f56c6c;   
}
#big>div:nth-of-type(4){
    background:  #909399; 
}

.el-tag {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
}
</style>