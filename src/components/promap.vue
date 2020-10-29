<template>
  <!-- <div ref="promap" style="width: 42.2vw;height:67.5vh;"></div> -->
  <div style="position:relative">
    <div ref="mapChart" style="width: 42.2vw; height: 67.5vh;"></div>
    <div class="goback" @click="goBack" v-show="mapLevel==='city'">
      <span>上级地图</span>
    </div>
  </div>
</template>

<script>
import amapcode from "@/libs/amapcode.json"

import echarts from "echarts"

import "echarts-gl"
import zhejiang from "../../public/data/json/zhejiang.json"
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
import { getCustomCityname } from "@/libs/globalProperty"

import xihu from "../../public/data/json/hangzhou/xihu.json"
import shangcheng from "../../public/data/json/hangzhou/shangcheng.json"
import xiacheng from "../../public/data/json/hangzhou/xiacheng.json"
import jianggan from "../../public/data/json/hangzhou/jianggan.json"
import gongshu from "../../public/data/json/hangzhou/gongshu.json"
import binjiang from "../../public/data/json/hangzhou/binjiang.json"
import xiaoshan from "../../public/data/json/hangzhou/xiaoshan.json"
import yuhang from "../../public/data/json/hangzhou/yuhang.json"
import fuyang from "../../public/data/json/hangzhou/fuyang.json"
import linan from "../../public/data/json/hangzhou/linan.json"
import tonglu from "../../public/data/json/hangzhou/tonglu.json"
import chunan from "../../public/data/json/hangzhou/chunan.json"
import jiande from "../../public/data/json/hangzhou/jiande.json"
//import qiantangxinqu from "../../public/data/json/hangzhou/qiantangxinqu.json"

import haishu from "../../public/data/json/ningbo/haishu.json"
import jiangbei from "../../public/data/json/ningbo/jiangbei.json"
import beilun from "../../public/data/json/ningbo/beilun.json"
import zhenhai from "../../public/data/json/ningbo/zhenhai.json"
import yinzhou from "../../public/data/json/ningbo/yinzhou.json"
import fenghua from "../../public/data/json/ningbo/fenghua.json"
import xiangshan from "../../public/data/json/ningbo/xiangshan.json"
import ninghai from "../../public/data/json/ningbo/ninghai.json"
import yuyao from "../../public/data/json/ningbo/yuyao.json"
import cixi from "../../public/data/json/ningbo/cixi.json"

import yuecheng from "../../public/data/json/shaoxing/yuecheng.json"
import keqiao from "../../public/data/json/shaoxing/keqiao.json"
import shangyu from "../../public/data/json/shaoxing/shangyu.json"
import xinchang from "../../public/data/json/shaoxing/xinchang.json"
import zhuji from "../../public/data/json/shaoxing/zhuji.json"
import shengzhou from "../../public/data/json/shaoxing/shengzhou.json"

import wuxing from "../../public/data/json/huzhou/wuxing.json"
import nanxun from "../../public/data/json/huzhou/nanxun.json"
import deqing from "../../public/data/json/huzhou/deqing.json"
import changxing from "../../public/data/json/huzhou/changxing.json"
import anji from "../../public/data/json/huzhou/anji.json"

import nanhu from "../../public/data/json/jiaxing/nanhu.json"
import xiuzhou from "../../public/data/json/jiaxing/xiuzhou.json"
import jiashan from "../../public/data/json/jiaxing/jiashan.json"
import haiyan from "../../public/data/json/jiaxing/haiyan.json"
import haining from "../../public/data/json/jiaxing/haining.json"
import pinghu from "../../public/data/json/jiaxing/pinghu.json"
import tongxiang from "../../public/data/json/jiaxing/tongxiang.json"

import lucheng from "../../public/data/json/wenzhou/lucheng.json"
import longwan from "../../public/data/json/wenzhou/longwan.json"
import ouhai from "../../public/data/json/wenzhou/ouhai.json"
import dongtou from "../../public/data/json/wenzhou/dongtou.json"
import yongjia from "../../public/data/json/wenzhou/yongjia.json"
import pingyang from "../../public/data/json/wenzhou/pingyang.json"
import cangnan from "../../public/data/json/wenzhou/cangnan.json"
import wencheng from "../../public/data/json/wenzhou/wencheng.json"
import taishun from "../../public/data/json/wenzhou/taishun.json"
import yueqing from "../../public/data/json/wenzhou/yueqing.json"
import ruian from "../../public/data/json/wenzhou/ruian.json"
import longgang from "../../public/data/json/wenzhou/longgang.json"

import wucheng from "../../public/data/json/jinhua/wucheng.json"
import jindong from "../../public/data/json/jinhua/jindong.json"
import wuyi from "../../public/data/json/jinhua/wuyi.json"
import pujiang from "../../public/data/json/jinhua/pujiang.json"
import panan from "../../public/data/json/jinhua/panan.json"
import lanxi from "../../public/data/json/jinhua/lanxi.json"
import yiwu from "../../public/data/json/jinhua/yiwu.json"
import dongyang from "../../public/data/json/jinhua/dongyang.json"
import yongkang from "../../public/data/json/jinhua/yongkang.json"

import kecheng from "../../public/data/json/quzhou/kecheng.json"
import qujiang from "../../public/data/json/quzhou/qujiang.json"
import changshan from "../../public/data/json/quzhou/changshan.json"
import kaihua from "../../public/data/json/quzhou/kaihua.json"
import longyou from "../../public/data/json/quzhou/longyou.json"
import jiangshan from "../../public/data/json/quzhou/jiangshan.json"

import jiaojiang from "../../public/data/json/taizhou/jiaojiang.json"
import huangyan from "../../public/data/json/taizhou/huangyan.json"
import luqiao from "../../public/data/json/taizhou/luqiao.json"
import sanmen from "../../public/data/json/taizhou/sanmen.json"
import tiantai from "../../public/data/json/taizhou/tiantai.json"
import xianju from "../../public/data/json/taizhou/xianju.json"
import wenling from "../../public/data/json/taizhou/wenling.json"
import linhai from "../../public/data/json/taizhou/linhai.json"
import yuhuan from "../../public/data/json/taizhou/yuhuan.json"

import liandu from "../../public/data/json/lishui/liandu.json"
import qingtian from "../../public/data/json/lishui/qingtian.json"
import jinyun from "../../public/data/json/lishui/jinyun.json"
import suichang from "../../public/data/json/lishui/suichang.json"
import songyang from "../../public/data/json/lishui/songyang.json"
import yunhe from "../../public/data/json/lishui/yunhe.json"
import qingyuan from "../../public/data/json/lishui/qingyuan.json"
import jingning from "../../public/data/json/lishui/jingning.json"
import longquan from "../../public/data/json/lishui/longquan.json"

import dinghai from "../../public/data/json/zhoushan/dinghai.json"
import putuo from "../../public/data/json/zhoushan/putuo.json"
import daishan from "../../public/data/json/zhoushan/daishan.json"
import shengsi from "../../public/data/json/zhoushan/shengsi.json"
import { pca, pcaa } from 'area-data'

export default {
  props: {
    mapData: {
      default: [],
    },
    // openClick: {
    // default: true
    // },
    // color: {}
  },
  data () {
    return {
      lastcode: '330000',
      mapLevel: 'province',
      mapCharts: null,
      mapCharts_option: {},
      cityData: {
        杭州市: "330100",
        宁波市: "330200",
        温州市: "330300",
        嘉兴市: "330400",
        湖州市: "330500",
        绍兴市: "330600",
        金华市: "330700",
        衢州市: "330800",
        舟山市: "330900",
        台州市: "331000",
        丽水市: "331100",
      },
      selectCode: '',
      mapName: "浙江",
      //cityNameSwitch: getCustomCityname(),
      cityName: ["西湖区", "拱墅区", "下城区", "上城区", "滨江区", "江干区"],
      cityMap: {
        浙江: zhejiang,
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

        西湖区: xihu,
        上城区: shangcheng,
        下城区: xiacheng,
        江干区: jianggan,
        拱墅区: gongshu,
        滨江区: binjiang,
        萧山区: xiaoshan,
        余杭区: yuhang,
        富阳区: fuyang,
        临安区: linan,
        桐庐县: tonglu,
        淳安县: chunan,
        建德市: jiande,
        //钱塘新区: qiantangxinqu,

        海曙区: haishu,
        江北区: jiangbei,
        北仑区: beilun,
        镇海区: zhenhai,
        鄞州区: yinzhou,
        奉化区: fenghua,
        象山县: xiangshan,
        宁海县: ninghai,
        余姚市: yuyao,
        慈溪市: cixi,

        越城区: yuecheng,
        柯桥区: keqiao,
        上虞区: shangyu,
        新昌县: xinchang,
        诸暨市: zhuji,
        嵊州市: shengzhou,

        吴兴区: wuxing,
        南浔区: nanxun,
        德清县: deqing,
        长兴县: changxing,
        安吉县: anji,

        南湖区: nanhu,
        秀洲区: xiuzhou,
        嘉善县: jiashan,
        海盐县: haiyan,
        海宁市: haining,
        平湖市: pinghu,
        桐乡市: tongxiang,

        鹿城区: lucheng,
        龙湾区: longwan,
        瓯海区: ouhai,
        洞头区: dongtou,
        永嘉县: yongjia,
        平阳县: pingyang,
        苍南县: cangnan,
        文成县: wencheng,
        泰顺县: taishun,
        乐清市: yueqing,
        瑞安市: ruian,
        龙港市: longgang,

        婺城区: wucheng,
        金东区: jindong,
        武义县: wuyi,
        浦江县: pujiang,
        磐安县: panan,
        兰溪市: lanxi,
        义乌市: yiwu,
        东阳市: dongyang,
        永康市: yongkang,

        柯城区: kecheng,
        衢江区: qujiang,
        常山县: changshan,
        开化县: kaihua,
        龙游县: longyou,
        江山市: jiangshan,

        椒江区: jiaojiang,
        黄岩区: huangyan,
        路桥区: luqiao,
        三门县: sanmen,
        天台县: tiantai,
        仙居县: xianju,
        温岭市: wenling,
        临海市: linhai,
        玉环市: yuhuan,

        莲都区: liandu,
        青田县: qingtian,
        缙云县: jinyun,
        遂昌县: suichang,
        松阳县: songyang,
        云和县: yunhe,
        庆元县: qingyuan,
        景宁畲族自治县: jingning,
        龙泉市: longquan,

        定海区: dinghai,
        普陀区: putuo,
        岱山县: daishan,
        嵊泗县: shengsi
      }
    }
  },
  watch: {
    mapData: {
      handler (newVal, oldVal) {
        console.log(newVal, 'nnnn')
        this.mapData = newVal
        if (newVal.length > 0) {
          this.zjdata = []
          // 过滤市辖区
          let temp = newVal.filter((item) => {
            return item.name !== "市辖区"
          })
          // 正则 提取汉字
          let reg = /[\u4e00-\u9fa5]/g
          let datas = temp.map((item) => {
            let newObj = this.cloneObj(item)
            let regName = newObj["name"].match(reg).join("")
            //newObj["name"] = this.cityNameSwitch.get(regName) || regName
            // 个别需要单独列出的区市
            // if (this.cityName.indexOf(newObj["name"]) > -1) {
            //   this.zjdata.push(item)
            // }
            return newObj
          })
          //this.mapCharts_option.series[0].data = datas;
          this.mapCharts_option.series[0].data = newVal
          this.mapCharts_option.series[0].map = this.mapName
          this.mapCharts_option.series[0].name = this.mapName
          //this.computeRange(datas)
          // 初次加载数据为空 需要绘制地图
          if (oldVal.length === 0) {
            this.initMap()
          } else {
            console.log(this.mapCharts_option, 'this.mapCharts_option')

            var url = this.cityMap[this.mapName]
            echarts.registerMap(this.mapName, url)
            this.mapCharts.setOption(this.mapCharts_option, true)

          }
        }
      },
      deep: true,
    },
  },
  created () {

  },
  mounted () {

    this.initMap()
    this.selectCode = amapcode
    //this.$echarts.registerMap("浙江", zhejiang)
    window.addEventListener("resize", function () {
      this.mapCharts.resize()
    })
  },

  methods: {
    initMap () {
      let _this = this

      //var name = [cityName]
      var idx = 0
      var pos = {
        leftPlus: 115,
        leftCur: 150,
        left: 198,
        top: 50,
      }

      var line = [
        [0, 0],
        [8, 11],
        [0, 22],
      ]
      // style
      var style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: "#fff",
        lineColor: "rgba(147, 235, 248, .8)",
      }
      this.mapCharts = this.$echarts.init(this.$refs.mapChart)
      this.mapCharts_option = {
        // graphic: [
        //   {
        //     type: "group",
        //     //left: pos.left,
        //     //top: pos.top - 4,
        //     left: 18,
        //     top: 10,
        //     children: [
        //       {
        //         type: "line",
        //         left: 0,
        //         top: -20,
        //         shape: {
        //           x1: 0,
        //           y1: 0,
        //           x2: 60,
        //           y2: 0,
        //         },
        //         style: {
        //           stroke: style.lineColor,
        //         },
        //       },
        //       {
        //         type: "line",
        //         left: 0,
        //         top: 20,
        //         shape: {
        //           x1: 0,
        //           y1: 0,
        //           x2: 60,
        //           y2: 0,
        //         },
        //         style: {
        //           stroke: style.lineColor,
        //         },
        //       },
        //     ],
        //   },
        //   {
        //     id: "",
        //     type: "group",
        //     //left: pos.left+2,
        //     //top: pos.top,
        //     left: 20,
        //     top: 14,
        //     children: [
        //       {
        //         type: "polyline",
        //         left: 90,
        //         top: -12,
        //         shape: {
        //           points: line,
        //         },
        //         style: {
        //           stroke: "transparent",
        //           //key: name[0],
        //           key: this.mapName
        //         },
        //         onclick: function () { },
        //       },
        //       {
        //         //返回
        //         type: "text",
        //         left: 0,
        //         top: "middle",
        //         style: {
        //           text: "浙江",
        //           //text:'返回上级地图',
        //           textAlign: "center",
        //           fill: style.textColor,
        //           font: style.font,
        //         },
        //         onclick: () => {
        //           this.mapCharts.clear()
        //           echarts.registerMap("浙江", zhejiang)

        //           this.mapName = "浙江"
        //           this.mapCharts_option.series[0].name = "浙江"
        //           this.mapCharts_option.series[0].map = "浙江"
        //           var params = {
        //             data: {
        //               name: '浙江',
        //               code: 330000
        //             }
        //           }
        //           this.$emit('linkage', params, 'province')
        //           this.mapCharts.setOption(this.mapCharts_option, true)
        //         },
        //       },
        //       {
        //         type: "text",
        //         left: 0,
        //         top: 10,
        //         style: {
        //           text: "zhejiang",
        //           textAlign: "center",
        //           fill: style.textColor,
        //           font: '12px "Microsoft YaHei", sans-serif',
        //         },
        //         onclick: function () { },
        //       },
        //     ],
        //   },
        // ],

        // 3D
        // series: [
        //   {
        //     type: 'map3D',
        //     name: _this.mapName,
        //     selectedMode: "single",//地图高亮单选
        //     boxDepth: 110,//地图倾斜度
        //     regionHeight: 4,//地图高度
        //     top: -40,
        //     //right:-30,
        //     map: _this.mapName,
        //     data: _this.mapData,
        //     viewControl: {
        //       distance: 120,//地图视角 控制初始大小
        //       //rotateSensitivity:0,//禁止旋转
        //       //zoomSensitivity:0,//禁止缩放

        //     },
        //     label: {
        //       show: true,//是否显示市
        //       textStyle: {
        //         color: "#fff",//文字颜色
        //         fontSize: 14,//文字大小
        //         backgroundColor: "rgba(0,0,0,0)",//透明度0清空文字背景 
        //       },
        //       formatter: params => {
        //         return params.name + "\n"
        //         //+ params.value
        //       },
        //     },
        //     itemStyle: {
        //       color: "#0f54a5",//地图颜色
        //       borderWidth: 1,//分界线wdith    
        //       borderColor: "#fff",//分界线颜色  
        //     },
        //     emphasis: {
        //       label: {
        //         show: true,//是否显示高亮
        //         textStyle: {
        //           //color: '#fff',//高亮文字颜色
        //           color: '#FF8686',
        //           fontSize: 16
        //         },

        //       },
        //       itemStyle: {
        //         color: '#0489d6',//地图高亮颜色
        //       }
        //     },
        //     //高亮市区  echarts  bug 不生效
        //     //regions: []
        //   },
        // ]

        // 2D
        series: [
          {
            type: "map",
            mapType: this.mapName,
            name: "浙江省",
            data: this.mapData,
            roam: true, // 是否开启鼠标缩放和平移漫游
            // left: 0,
            // bottom: 0,
            // right: 0,
            // top: 0,
            //aspectScale: 1.5, // 地图长宽比 宽度 / 高度 * aspectScale 默认0.75
            zoom: 1.2, // 地图缩放比例
            scaleLimit: {
              //滚轮缩放控制
              min: 1,
              max: 30,
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                },
                formatter: function (val) {
                  if (val.value.toString().indexOf(".") !== -1) {
                    return ("{a|" + val.name + "}" + "\n" + "{b|" + val.value + "}" + "%")
                  } else {
                    return ("{a|" + val.name + "}" + "\n" + "{b|" + val.value + "}")
                  }
                },
                rich: {
                  a: {
                    color: "#fff",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 14,
                    lineHeight: 50,
                  },
                  b: {
                    color: "#FF8686",
                    fontSize: 20,
                  },
                }, //富文本样式,就是上面的formatter中'{a|'和'{b|'
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(128, 217, 248, 1)",
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: "#389BB7",
                borderWidth: 0,
              },
            },
          },
        ],
      }
      this.mapCharts.clear()
      this.mapCharts.setOption(this.mapCharts_option, true)

      this.mapCharts.resize()
      this.mapCharts.on('click', params => {
        _this.mapClick(params)
      })
    },
    //地图下钻 
    mapClick (params) {
      //this.mapCharts.on("click", (params) => {
      //地图下钻
      let _this = this
      if (this.cityMap[params.name]) {
        this.$emit('linkage', params, 'city')
        //this.cityName = params.name;
        var url = this.cityMap[params.name]
        echarts.registerMap(params.name, url)
        var code = params.data.code
        this.lastcode = Object.assign(params.data.code)
        console.log(params, 'paramsparams')
        this.changeView(Number(code), "city")
        this.mapName = params.name

        this.mapCharts_option.series[0].name = params.name
        this.mapCharts_option.series[0].map = params.name

        this.mapCharts.setOption(this.mapCharts_option, true)
      }
      //});
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
      echarts.registerMap(this.mapName, mapJson)
    },
    initCity (code) {
      // 选择加载市json
      let mapJson

      // var name = this.cityData[code]
      // console.log(name, 'nnnnnnn')
      // if (this.cityMap[name]) {
      //   mapJson = this.cityMap[name];
      // }

      switch (JSON.stringify(code)) {
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

        case "330102":
          mapJson = shangcheng
          break
        case "330103":
          mapJson = xiacheng
          break
        case "330104":
          mapJson = jianggan
          break
        case "330105":
          mapJson = gongshu
          break
        case "330106":
          mapJson = xihu
          break
        case "330108":
          mapJson = binjiang
          break
        case "330109":
          mapJson = xiaoshan
          break
        case "330110":
          mapJson = yuhang
          break
        case "330111":
          mapJson = fuyang
          break
        case "330112":
          mapJson = linan
          break
        case "330122":
          mapJson = tonglu
          break
        case "330127":
          mapJson = chunan
          break
        case "330182":
          mapJson = jiande
          break
        // case "330155":
        //   mapJson = qiantangxinqu
        //   break
        //宁波
        case "330203":
          mapJson = haishu
          break
        case "330205":
          mapJson = jiangbei
          break
        case "330206":
          mapJson = beilun
          break
        case "330211":
          mapJson = zhenhai
          break
        case "330212":
          mapJson = yinzhou
          break
        case "330213":
          mapJson = fenghua
          break
        case "330225":
          mapJson = xiangshan
          break
        case "330226":
          mapJson = ninghai
          break
        case "330281":
          mapJson = yuyao
          break
        case "330282":
          mapJson = cixi
          break
        // 温州
        case "330302":
          mapJson = lucheng
          break
        case "330303":
          mapJson = longwan
          break
        case "330304":
          mapJson = ouhai
          break
        case "330305":
          mapJson = dongtou
          break
        case "330324":
          mapJson = yongjia
          break
        case "330326":
          mapJson = pingyang
          break
        case "330327":
          mapJson = cangnan
          break
        case "330328":
          mapJson = wencheng
          break
        case "330329":
          mapJson = taishun
          break
        case "330382":
          mapJson = yueqing
          break
        case "330381":
          mapJson = ruian
          break
        case "330383":
          mapJson = longgang
          break
        // 嘉兴
        case "330402":
          mapJson = nanhu
          break
        case "330411":
          mapJson = xiuzhou
          break
        case "330421":
          mapJson = jiashan
          break
        case "330424":
          mapJson = haiyan
          break
        case "330481":
          mapJson = haining
          break
        case "330482":
          mapJson = pinghu
          break
        case "330483":
          mapJson = tongxiang
          break
        // 湖州
        case "330502":
          mapJson = wuxing
          break
        case "330503":
          mapJson = nanxun
          break
        case "330521":
          mapJson = deqing
          break
        case "330522":
          mapJson = changxing
          break
        case "330523":
          mapJson = anji
          break
        // 绍兴市
        case "330602":
          mapJson = yuecheng
          break
        case "330603":
          mapJson = keqiao
          break
        case "330604":
          mapJson = shangyu
          break
        case "330624":
          mapJson = xinchang
          break
        case "330681":
          mapJson = zhuji
          break
        case "330683":
          mapJson = shengzhou
          break
        // 金华
        case "330702":
          mapJson = wucheng
          break
        case "330703":
          mapJson = jindong
          break
        case "330723":
          mapJson = wuyi
          break
        case "330726":
          mapJson = pujiang
          break
        case "330727":
          mapJson = panan
          break
        case "330781":
          mapJson = lanxi
          break
        case "330782":
          mapJson = yiwu
          break
        case "330783":
          mapJson = dongyang
          break
        case "330784":
          mapJson = yongkang
          break
        // 衢州
        case "330802":
          mapJson = kecheng
          break
        case "330803":
          mapJson = qujiang
          break
        case "330822":
          mapJson = changshan
          break
        case "330824":
          mapJson = kaihua
          break
        case "330825":
          mapJson = longyou
          break
        case "330881":
          mapJson = jiangshan
          break
        // 舟山
        case "330902":
          mapJson = dinghai
          break
        case "330903":
          mapJson = putuo
          break
        case "330921":
          mapJson = daishan
          break
        case "330922":
          mapJson = shengsi
          break
        // 台州
        case "331002":
          mapJson = jiaojiang
          break
        case "331003":
          mapJson = huangyan
          break
        case "331004":
          mapJson = luqiao
          break
        case "331022":
          mapJson = sanmen
          break
        case "331023":
          mapJson = tiantai
          break
        case "331024":
          mapJson = xianju
          break
        case "331081":
          mapJson = wenling
          break
        case "331082":
          mapJson = linhai
          break
        case "331083":
          mapJson = yuhuan
          break
        // 丽水
        case "331102":
          mapJson = liandu
          break
        case "331121":
          mapJson = qingtian
          break
        case "331122":
          mapJson = jinyun
          break
        case "331123":
          mapJson = suichang
          break
        case "331124":
          mapJson = songyang
          break
        case "331125":
          mapJson = yunhe
          break
        case "331126":
          mapJson = qingyuan
          break
        case "331127":
          mapJson = jingning
          break
        case "331181":
          mapJson = longquan
          break
      }
      return mapJson
    },
    goBack () {
      var code = ''
      console.log(this.lastcode, 'this.lastcode')
      if (this.lastcode.includes('00')) {
        code = '330000'
        this.mapName = '浙江'
        this.lastcode = code
        this.mapLevel = 'province'
      } else {
        code = this.lastcode.slice(0, 4) + '00'
        this.mapName = this.cityData[code]
        for (var i = 0; i < Object.keys(this.cityData).length; i++) {
          if (Object.values(this.cityData)[i] == code) {
            this.mapName = Object.keys(this.cityData)[i]
          }
        }
        this.lastcode = code
        this.mapLevel = 'city'
      }
      console.log(code, this.mapName, 'this.lastcode')
      let data = {
        code: code
      }
      this.$emit('linkage', data)
    },
    // 深度复制对象
    cloneObj (obj) {
      let newObj = {}
      if (obj instanceof Array) {
        newObj = []
      }
      for (let key in obj) {
        let val = obj[key]
        newObj[key] = typeof val === "object" ? this.cloneObj(val) : val
      }
      return newObj
    },
  },
};
</script>
<style lang="less" scoped>
.goback {
  position: absolute;
  top: 4%;
  left: 15px;
  z-index: 1;
  background: rgba(28, 130, 249, 0.8);
  border-radius: 4px;
  font-size: 0.14rem;
  color: #ffffff;
  cursor: pointer;
  span {
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>