<template>
  <div>
    <div ref="myEchart" style="width: 42.2vw;height:67.5vh;"></div>
  </div>
</template>

<script>
import echarts from "echarts"
import "echarts/map/js/province/zhejiang.js"
import "echarts-gl"

import hangzhou from "../../public/data/json/zhejiang/hangzhou.json"
import jiaxing from "../../public/data/json/zhejiang/jiaxing.json"
import jinhua from "../../public/data/json/zhejiang/jinhua.json"
import lishui from "../../public/data/json/zhejiang/lishui.json"
import ningbo from "../../public/data/json/zhejiang/ningbo.json"
import quzhou from "../../public/data/json/zhejiang/quzhou.json"
import shaoxing from "../../public/data/json/zhejiang/shaoxing.json"
import taizhou from "../../public/data/json/zhejiang/taizhou.json"
import wenzhou from "../../public/data/json/zhejiang/wenzhou.json"
import zhoushan from "../../public/data/json/zhejiang/zhoushan.json"
import huzhou from "../../public/data/json/zhejiang/huzhou.json"

export default {
  data () {
    return {
      myChart: null,
      mapName: '浙江'
    }
  },
  mounted () {
    this.myChart = this.$echarts.init(this.$refs.myEchart)
    this.initChart()
    //echarts自适应
    window.onresize = this.myChart.resize
  },
  methods: {
    initChart () {
      var cityMap = {
        杭州市: hangzhou,
        丽水市: lishui,
        台州市: taizhou,
        嘉兴市: jiaxing,
        宁波市: ningbo,
        温州市: wenzhou,
        湖州市: huzhou,
        绍兴市: shaoxing,
        舟山市: zhoushan,
        衢州市: quzhou,
        金华市: jinhua,
      }
      var options = {
        series: [
          {
            type: 'map3D',
            name: '浙江',
            selectedMode: "single",//地图高亮单选
            boxDepth: 90,//地图倾斜度
            regionHeight: 5,//地图高度
            map: '浙江',
            viewControl: {
              //distance:150,//地图视角 控制初始大小
              rotateSensitivity: 0,//禁止旋转
              zoomSensitivity: 0,//禁止缩放
            },
            label: {
              show: true,//是否显示市
              textStyle: {
                color: "#0a1640",//文字颜色
                fontSize: 12,//文字大小
                backgroundColor: "rgba(0,0,0,0)",//透明度0清空文字背景 
                align: 'center'
              }
            },
            itemStyle: {
              color: "#81d0f1",//地图颜色
              borderWidth: 0.5,//分界线wdith    
              borderColor: "#459bca",//分界线颜色  
            },
            emphasis: {
              label: {
                show: true,//是否显示高亮
                textStyle: {
                  color: '#fff',//高亮文字颜色
                }
              },
              itemStyle: {
                color: '#0489d6',//地图高亮颜色
              }
            },
            //高亮市区  echarts  bug 不生效
            regions: [
              {
                name: "杭州市",
                itemStyle: {
                  areaColor: "#f00",
                }
              }
            ]
          }]
      }
      this.myChart.setOption(options)
      this.myChart.on("click", (params) => {
        //地图下钻
        console.log(params, 'ppp')
        if (cityMap[params.name]) {
          this.cityName = params.name
          var url = cityMap[params.name]
          this.$echarts.registerMap(params.name, url)
          this.changeView(params.data.code, "city")
          this.mapName = params.names
          // this.mapCharts_option.geo.map = params.name
          this.myCharts.setOption(this.myCharts_option, true)
        }
      })
    },
    // 注册地图 name: 省市名称； level：区分省市
    changeView (code, level) {
      if (level === "city") {
        // 记录当前选中的市信息
        this.currentCity = {
          code: code,
        }
      }
      this.mapLevel = level
      let mapJson = this.initCity(code)
      console.log(level, this.mapName, mapJson, "mapJson")
      this.$echarts.registerMap(this.mapName, mapJson)
    },
    initCity (code) {
      // 选择加载市json
      let mapJson
      switch (code) {
        case "330000":
          mapJson = zhejiang
          break
        case "330100":
          mapJson = hangzhou
          break
        case "330200":
          mapJson = ningbo
          break
        case "330300":
          mapJson = wenzhou
          break
        case "330400":
          mapJson = jiaxing
          break
        case "330500":
          mapJson = huzhou
          break
        case "330600":
          mapJson = shaoxing
          break
        case "330700":
          mapJson = jinhua
          break
        case "330800":
          mapJson = quzhou
          break
        case "330900":
          mapJson = zhoushan
          break
        case "331000":
          mapJson = taizhou
          break
        case "331100":
          mapJson = lishui
          break
      }
      return mapJson
    },
  }
}
</script>

<style lang="less" scoped>
</style>