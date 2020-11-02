<!--  -->
<template>
  <div class="home">
    <div class="homeTop">
      <span>浙江省特种设备安全风险防范预警系统</span>
    </div>
    <div class="homeMain">
      <div class="pageleft">
        <div class="highRisk">
          <p>
            <span>高风险使用单位</span>
          </p>
          <ul class="riskul">
            <li style="border-left: 6px solid #0971fa">
              <div class="lidiv">
                累计
                <div class="risknum" style="color: #0971fa">{{ cumulative }}</div>
              </div>
            </li>
            <li style="border-left: 6px solid #fe5959">
              <div class="lidiv">
                预警中
                <div class="risknum" style="color: #fe5959">{{ warnNum }}</div>
              </div>
            </li>
            <li style="border-left: 6px solid #59f7fe">
              <div class="lidiv">
                处置中
                <div class="risknum" style="color: #59f7fe">{{ disposalNum }}</div>
              </div>
            </li>
          </ul>

          <div ref="highrisk" style="width: 17.7vw; height: 15vh"></div>
        </div>
        <div class="riskWarning">风险预警</div>
        <div class="specialEquipment">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单位" name="first">
              <div class="random">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">单位总数</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ unitNum }}</span>
              </div>
              <div ref="unit" style="width: 17.7vw; height: 22vh"></div>
            </el-tab-pane>
            <el-tab-pane label="人员" name="second">
              <div class="random">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">作业人员数</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ workerNum }}</span>
              </div>
              <div class="random">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">当月新增(人)</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ monthyAdd }}</span>
              </div>
              <div ref="person" style="width: 17.7vw; height: 22vh"></div>
            </el-tab-pane>
            <el-tab-pane label="设备" name="third">
              <div class="random" style="margin-bottom: 1.3vh">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">设备总数</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ deviceNum }}</span>
              </div>
              <div class="random" style="margin-bottom: 1.3vh">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">当月新增(台)</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ dmonthyAdd }}</span>
              </div>
              <div ref="deviceType" style="width: 17.7vw; height: 14vh"></div>
              <div ref="trend" style="width: 17.7vw; height: 14vh"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="deviceStore">特设之库</div>
      </div>

      <div class="pagecenter">
        <div class="centerTop">
          <ul class="centerul">
            <li
              v-for="(item, index) in centerList"
              :key="index"
              @click="clickSum(index)"
              :class="{ active: sumIndex == index }"
            >
              <!-- <span>全省设备总数</span> -->
              <span>{{ item.name }}</span>
              <div class="sumtext" style>{{ item.sum }}</div>
            </li>
            <!-- <li @click="clickSum(index)" :class="{active:sumIndex==index}">
              <span>高风险设备数</span>
              <div class="sumtext" style="color:#FE5959">{{riskDeviceSum}}</div>
            </li>
             <li @click="clickSum(index)" :class="{active:sumIndex==index}">
              <span>使用单位总数</span>
              <div class="sumtext" style="color:#59F7FE;">{{unitSum}}</div>
            </li>
             <li @click="clickSum(index)" :class="{active:sumIndex==index}">
              <span>高风险使用单位</span>
              <div class="sumtext" style="color:#FE5959">{{riskunitSum}}</div>
            </li>-->
          </ul>
        </div>
        <div class="promap">
          <promap :mapData="mapData" @linkage="linkage"></promap>
          <!-- <promap3D :mapData="mapData" @linkage="linkage"></promap3D> -->
          <!-- <analysis-map ref="map" :mapData="mapData" @linkage="linkage" :color="mapcolor"></analysis-map> -->
        </div>
        <div class="btngroup">
          <ul class="firstline">
            <li>电梯智控</li>
            <li>锅炉智控</li>
            <li>压力容器智控</li>
            <li>压力管道智控</li>
          </ul>
          <ul class="secondline">
            <li>起重机械智控</li>
            <li>游乐设施智控</li>
            <li>客运索道智控</li>
            <li class="carsControl">场(厂)内专用机动车辆智控</li>
          </ul>
        </div>
      </div>

      <div class="pageRight">
        <div class="collaborative">
          <div class="random">
            <div class="randomtitle">
              <div class="blueline"></div>
              <span class="pspan">双随机次数</span>
              <div class="blueline"></div>
            </div>
            <span class="randomnum">{{ randomNum }}</span>
          </div>
          <div class="random">
            <div class="randomtitle">
              <div class="blueline"></div>
              <span class="pspan">双随机任务</span>
              <div class="blueline"></div>
            </div>
            <span class="randomnum">{{ randomTask }}</span>
          </div>

          <div ref="random" style="width: 18.75vw; height: 18.5vh"></div>
        </div>
        <div class="collaborativebtn">协同智治</div>
        <div class="safetyWindow">
          <el-tabs v-model="activeChose" @tab-click="handleChose">
            <el-tab-pane label="安全教育" name="tfirst">
              <ul class="safeul">
                <li>
                  <span>规范</span>
                  <div class="randomnum">{{ standardNum }}</div>
                </li>
                <li>
                  <span>法规</span>
                  <div class="randomnum">{{ ruleNum }}</div>
                </li>
                <li>
                  <span>标准</span>
                  <div class="randomnum">{{ normNum }}</div>
                </li>
                <li>
                  <span>事故案例数</span>
                  <div class="randomnum">{{ accidentsNum }}</div>
                </li>
              </ul>

              <ul class="riskul">
                <li style="border-left: 5px solid #fe5959; width: 14vw">
                  <div class="lidiv">
                    当年特种设备事故(起)
                    <div class="risknum" style="color: #fe5959">{{ deviceAlarm }}</div>
                  </div>
                </li>
                <li style="border-left: 5px solid #fec959">
                  <div class="lidiv">
                    死亡人数
                    <div class="risknum" style="color: #fec959">{{ deathToll }}</div>
                  </div>
                </li>
              </ul>
              <div ref="safeEdu" style="width: 18.75vw; height: 21vh"></div>
            </el-tab-pane>
            <el-tab-pane label="双重预防" name="tthird">
              <div class="random">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">今日处置</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ todaydisposalNum }}</span>
                <p>累计：{{ disposalSum }}</p>
              </div>
              <div class="random">
                <div class="randomtitle">
                  <div class="blueline"></div>
                  <span class="pspan">今日困人</span>
                  <div class="blueline"></div>
                </div>
                <span class="randomnum">{{ tiringNum }}</span>
                <p>累计：{{ disposalSum }}</p>
              </div>
              <div ref="alarm" style="width: 18.75vw; height: 13vh"></div>
              <div ref="disposaltime" style="width: 18.75vw; height: 13vh"></div>
            </el-tab-pane>
            <el-tab-pane label="检验检测" name="tsecond" class="analycss">
              <div class="fixedRate">
                <div ref="waterprogress" style="width:6.25vw;height:11.11vh"></div>
                <!-- <water-progress :rate="rate"></water-progress> -->
              </div>
              <div ref="testDefect" style="margin-top: 2.7vh; width: 17.7vw; height: 20vh"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="safetyWindowbtn">安全之窗</div>
      </div>
    </div>
  </div>
</template>

<script>
import promap from '@/components/promap'
import promap3D from '@/components/promap3D'
import waterProgress from '@/components/waterProgress'
//import analysisMap from '@/components/analysisMap'
import { on, off } from '@/libs/utils'
import {
  getDtXzCount,
  getDtFaultNum,
  getDtTop5Num,
  getDtCityNum,
  getDtDevTypeNum,
  getDtFloorFaultCount,
  getDtApplyLocationNum,
  getDtZdTop5Num
} from '@/api/analysis.js'
import echarts from "echarts"
import 'echarts-liquidfill/src/liquidFill.js' //在这里引入
import "echarts-gl"
// require('echarts/lib/chart/pie')
// require('echarts/lib/chart/bar')
// require('echarts/lib/chart/line')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/tooltip')
export default {
  components: { promap, promap3D, waterProgress },

  data () {
    return {
      cumulative: 722,
      warnNum: 722,
      disposalNum: 722,
      standardNum: 999,
      ruleNum: 388,
      normNum: 677,
      accidentsNum: 2722,
      todaydisposalNum: 2722,
      tiringNum: 2722,
      deviceAlarm: 722,
      deathToll: 722,
      disposalSum: 322722,
      tiringSum: 322722,
      deviceSum: 322722,
      riskDeviceSum: 722,
      unitSum: 2722,
      riskunitSum: 22,
      randomNum: 322722,
      randomTask: 322722,
      unitNum: 322722,
      workerNum: 322722,
      monthyAdd: 322722,
      deviceNum: 322722,
      dmonthyAdd: 322722,
      echartWater: null,
      echartHighrisk: null,
      echartRandom: null,
      echartUnit: null,
      echartPerson: null,
      echartDevicetype: null,
      echartDevicetrend: null,
      echartAlarm: null,
      echartDisposaltime: null,
      echartSafeEdu: null,
      activeName: 'first',
      activeChose: 'tfirst',
      sumIndex: 0,
      centerList: [
        { name: '全省设备总数', sum: 1483890 },
        { name: '高风险设备数', sum: 31222 },
        { name: '使用单位总数', sum: 241550 },
        { name: '高风险使用单位', sum: 3613 }
      ],
      mapData: [

      ],
      mapcolor: {
        max: ['rgba(28, 196, 255, 0.8)', 'rgba(124, 28, 255, 0.8)'],
        mid: ['rgba(28, 196, 255, 0.5)', 'rgba(124, 28, 255, 0.5)'],
        min: ['rgba(28, 196, 255, 0.2)', 'rgba(124, 28, 255, 0.2)']
      }, // 高中低
      curarea: '330000',
      rate: [0.5],
      clientWidth: document.body.clientWidth
    }
  },
  watch: {
    curarea (val) {

      console.log(this.curarea, 'valval')
      console.log(this.mapData, 'mapdata')
      this.getMapdata()
    },

  },
  created () {
    this.getMapdata()
  },
  mounted () {

    let _this = this
    this.echartWater = this.$echarts.init(this.$refs.waterprogress)
    this.echartHighrisk = this.$echarts.init(this.$refs.highrisk)
    this.echartRandom = this.$echarts.init(this.$refs.random)
    this.echartUnit = this.$echarts.init(this.$refs.unit)
    this.echartPerson = this.$echarts.init(this.$refs.person)
    this.echartDevicetype = this.$echarts.init(this.$refs.deviceType)
    this.echartDevicetrend = this.$echarts.init(this.$refs.trend)
    this.echartSafeEdu = this.$echarts.init(this.$refs.safeEdu)
    this.echartAlarm = this.$echarts.init(this.$refs.alarm)
    this.echartDisposaltime = this.$echarts.init(this.$refs.disposaltime)
    this.echartTestDefect = this.$echarts.init(this.$refs.testDefect)

    window.addEventListener("resize", function () {
      _this.clientWidth = document.body.clientWidth

      _this.echartWater.resize()
      _this.echartHighrisk.resize()
      _this.echartPerson.resize()
      _this.echartUnit.resize()
      _this.echartRandom.resize()
      _this.echartDevicetrend.resize()
      _this.echartDevicetype.resize()
      _this.echartSafeEdu.resize()
      _this.echartAlarm.resize()
      _this.echartDisposaltime.resize()
      _this.echartTestDefect.resize()
      _this.initChart()
    })
    _this.initChart()
  },
  beforeDestroy () {
    this.echartWater.clear()
    this.echartHighrisk.clear()
    this.echartRandom.clear()
    this.echartUnit.clear()
    this.echartPerson.clear()
    this.echartDevicetrend.clear()
    this.echartDevicetype.clear()
    this.echartSafeEdu.clear()
    this.echartAlarm.clear()
    this.echartDisposaltime.clear()

  },
  methods: {
    fontSize (res) { //字体自适应
      let _this = this
      // let docEl = document.documentElement,
      //   clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if (!_this.clientWidth) return
      let fontSize = _this.clientWidth / 1920

      return res * fontSize
    },
    initChart () {
      let _this = this
      _this.initChartWater()
      _this.initChartHighrisk()
      _this.initChartRandom()
      _this.initChartUnit()
      _this.initChartPerson()
      _this.initChartDevicetype()
      _this.initChartDevicetrend()
      _this.initChartSafeEdu()
      _this.initChartAlarm()
      _this.initChartDisposaltime()
      _this.initChartTestDefect()
    },
    getMapdata () {
      let _this = this
      if (this.curarea == "330000") {
        _this.mapData = [
          { name: '杭州市', code: '330100', value: 297338 },
          { name: '宁波市', code: '330200', value: 273075 },
          { name: '温州市', code: '330300', value: 154689 },
          { name: '嘉兴市', code: '330400', value: 173055 },
          { name: '湖州市', code: '330500', value: 89801 },
          { name: '绍兴市', code: '330600', value: 141649 },
          { name: '金华市', code: '330700', value: 117408 },
          { name: '衢州市', code: '330800', value: 44986 },
          { name: '舟山市', code: '330900', value: 38198 },
          { name: '台州市', code: '331000', value: 122022 },
          { name: '丽水市', code: '331100', value: 31669 },
        ]
      } else if (this.curarea == "330100") {
        _this.mapData = [

          { name: '上城区', code: '330102', value: 273 },
          { name: '下城区', code: '330103', value: 154 },
          { name: '江干区', code: '330104', value: 173 },
          { name: '拱墅区', code: '330105', value: 449 },
          { name: '西湖区', code: '330106', value: 297 },
          { name: '滨江区', code: '330108', value: 898 },
          { name: '萧山区', code: '330109', value: 141 },
          { name: '余杭区', code: '330110', value: 117 },
          { name: '桐庐县', code: '330122', value: 381 },
          { name: '淳安县', code: '330127', value: 122 },
          //{ name: '钱塘新区', code: '330155', value: 122 },
          { name: '建德市', code: '330182', value: 316 },
          { name: '富阳区', code: '330111', value: 316 },
          { name: '临安区', code: '330112', value: 316 },
        ]
      } else if (this.curarea == "330200") {
        _this.mapData = [
          { name: '海曙区', code: '330203', value: 297 },
          { name: '江北区', code: '330205', value: 273 },
          { name: '北仑区', code: '330206', value: 154 },
          { name: '镇海区', code: '330211', value: 173 },
          { name: '鄞州区', code: '330212', value: 898 },
          { name: '奉化区', code: '330213', value: 141 },
          { name: '象山县', code: '330225', value: 117 },
          { name: '宁海县', code: '330226', value: 449 },
          { name: '余姚市', code: '330281', value: 381 },
          { name: '慈溪市', code: '330282', value: 122 },
        ]
      } else if (this.curarea == "330600") {
        _this.mapData = [
          { name: '越城区', code: '330602', value: 297 },
          { name: '柯桥区', code: '330603', value: 273 },
          { name: '上虞区', code: '330604', value: 154 },
          { name: '新昌县', code: '330624', value: 174 },
          { name: '诸暨市', code: '330681', value: 898 },
          { name: '嵊州市', code: '330683', value: 141 },
        ]
      } else if (this.curarea == "330500") {
        _this.mapData = [
          { name: '吴兴区', code: '330502', value: 297 },
          { name: '南浔区', code: '330503', value: 273 },
          { name: '德清县', code: '330521', value: 154 },
          { name: '长兴县', code: '330522', value: 174 },
          { name: '安吉县', code: '330523', value: 898 },
        ]
      } else if (this.curarea == "330400") {
        _this.mapData = [
          { name: '南湖区', code: '330402', value: 297 },
          { name: '秀洲区', code: '330411', value: 273 },
          { name: '嘉善县', code: '330421', value: 154 },
          { name: '海盐县', code: '330424', value: 174 },
          { name: '海宁市', code: '330481', value: 898 },
          { name: '平湖市', code: '330482', value: 898 },
          { name: '桐乡市', code: '330483', value: 898 },
        ]
      } else if (this.curarea == "330300") {
        _this.mapData = [
          { name: '鹿城区', code: '330302', value: 297 },
          { name: '龙湾区', code: '330303', value: 273 },
          { name: '瓯海区', code: '330304', value: 154 },
          { name: '洞头区', code: '330305', value: 174 },
          { name: '永嘉县', code: '330324', value: 898 },
          { name: '平阳县', code: '330326', value: 898 },
          { name: '苍南县', code: '330327', value: 898 },
          { name: '文成县', code: '330328', value: 898 },
          { name: '泰顺县', code: '330329', value: 898 },
          { name: '瑞安市', code: '330381', value: 898 },
          { name: '乐清市', code: '330382', value: 898 },
          { name: '龙港市', code: '330383', value: 898 },
        ]
      } else if (this.curarea == "330700") {
        _this.mapData = [
          { name: '婺城区', code: '330702', value: 297 },
          { name: '金东区', code: '330703', value: 273 },
          { name: '武义县', code: '330723', value: 154 },
          { name: '浦江县', code: '330726', value: 174 },
          { name: '磐安县', code: '330727', value: 898 },
          { name: '兰溪市', code: '330781', value: 898 },
          { name: '义乌市', code: '330782', value: 898 },
          { name: '东阳市', code: '330783', value: 898 },
          { name: '永康市', code: '330784', value: 898 },
        ]
      } else if (this.curarea == "330800") {
        _this.mapData = [
          { name: '柯城区', code: '330802', value: 297 },
          { name: '衢江区', code: '330803', value: 273 },
          { name: '常山县', code: '330822', value: 154 },
          { name: '开化县', code: '330824', value: 174 },
          { name: '龙游县', code: '330825', value: 898 },
          { name: '江山市', code: '330881', value: 898 },
        ]
      } else if (this.curarea == "331000") {
        _this.mapData = [
          { name: '椒江区', code: '331002', value: 297 },
          { name: '黄岩区', code: '331003', value: 273 },
          { name: '路桥区', code: '331004', value: 154 },
          { name: '三门县', code: '331022', value: 154 },
          { name: '天台县', code: '331023', value: 154 },
          { name: '仙居县', code: '331024', value: 174 },
          { name: '温岭市', code: '331081', value: 898 },
          { name: '临海市', code: '331082', value: 898 },
          { name: '玉环市', code: '331083', value: 898 },
        ]
      } else if (this.curarea == "331100") {
        _this.mapData = [
          { name: '莲都区', code: '331102', value: 297 },
          { name: '青田县', code: '331121', value: 273 },
          { name: '缙云县', code: '331122', value: 154 },
          { name: '遂昌县', code: '331123', value: 154 },
          { name: '松阳县', code: '331124', value: 154 },
          { name: '云和县', code: '331125', value: 174 },
          { name: '庆元县', code: '331126', value: 898 },
          { name: '景宁畲族自治县', code: '331127', value: 898 },
          { name: '龙泉市', code: '331181', value: 898 },
        ]
      } else if (this.curarea == "330900") {
        _this.mapData = [
          { name: '定海区', code: '330902', value: 297 },
          { name: '普陀区', code: '330903', value: 273 },
          { name: '岱山县', code: '330921', value: 154 },
          { name: '嵊泗县', code: '330922', value: 154 },
        ]
      }
      // getDtCityNum({
      //   area_code: this.curarea
      // }).then(res => {
      //   console.log(res, 'rrrrrr')
      //   this.mapData = res.map(item => {
      //     return {
      //       name: item.AREANAME,
      //       code: item.AREA_CODE,
      //       value: item.USE_DT_NUM
      //     }
      //   })
      //   console.log(this.mapData, 'mmmmmmmmmmmmm')
      // })
    },
    initChartWater () {
      let _this = this
      let waterOption = {
        //backgroundColor: 'red',
        series: [{
          type: 'liquidFill',
          name: '定检率',
          radius: '95%',
          color: ['#1b6795'],
          center: ['50%', '50%'],
          data: this.rate,
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#59F7FE',
            color: 'transparent',
          },
          outline: {
            itemStyle: {
              borderWidth: 2,
              borderColor: '#59F7FE',
              borderType: 'dashed',
            }
          },
          label: {
            normal: { //此处没有生效，本地生效
              textStyle: {
                fontSize: this.fontSize(24),
                color: '#e6e6e6',
              },
              formatter: function (param) {
                return '{a|' + param.seriesName + '}' + '\n' + '{c|' + (param.value * 100).toFixed(0) + '%}'
              },
              rich: {
                //富文本 对字体进一步设置样式。a对应的value,b对应的healthyName
                a: {
                  fontSize: this.fontSize(14),
                  lineHeight: 10,
                  padding: [20, 0, 0, 0]
                },
                c: {
                  fontSize: this.fontSize(24),
                  padding: [-15, 0, 0, 0]
                }
              }
            },

          },
        },
        ]
      }
      this.echartWater.setOption(waterOption, true)
    },
    initChartHighrisk () {
      let _this = this
      let highriskOption = {
        title: {
          text: '高风险指标分析',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          //trigger: 'axis'
          textStyle: {
            align: 'center'
          }
        },
        grid: {
          left: '-80',
          right: '0',
          bottom: '-10',
          top: '30',
          containLabel: true
        },
        legend: {
          show: false,
          data: ['数量']
        },
        calculable: true,
        xAxis: [
          {
            show: false,
            boundaryGap: [0, 0.1],
          }
        ],
        yAxis: {

          type: 'category',
          axisLabel: {
            color: '#fff',
            align: 'left',
            margin: 90
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },

          data: ['在用未注册', '锅炉介质检验', '检验不合格在用', '超期未检']
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '8',

            data: [2118, 4121, 11800, 36944],
            label: {
              show: true, // 开启显示
              position: 'right',
              textStyle: {
                fontSize: this.fontSize(14),
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 100, 100, 0],
                //柱体的颜色
                //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(160, 89, 254, 0)"
                  },
                  {
                    offset: 1,
                    color: "#FE5959"
                  }
                ], false)
              }

            }
          },

        ]
      }
      this.echartHighrisk.setOption(highriskOption, true)
    },
    initChartTestDefect () {
      let _this = this
      let testDefectOption = {
        title: {
          text: '检验缺陷Top5',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(16)
          }
        },
        tooltip: {
          //trigger: 'axis'
          textStyle: {
            align: 'center'
          }
        },
        grid: {
          left: '-80',
          right: '0',
          bottom: '-10',
          top: '30',
          containLabel: true
        },
        legend: {
          show: false,
          data: ['数量']
        },
        calculable: true,
        xAxis: [
          {
            show: false,
            boundaryGap: [0, 0.2],
          }
        ],
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff',
            align: 'left',
            margin: 90
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },

          data: ['安全附件', '安全保护和防护', '技术资料', '检验与试验', '安全保护装置']
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '8',

            data: [546, 579, 1283, 1421, 4420],
            label: {
              show: true, // 开启显示
              position: 'right', // 在上方显示
              textStyle: {
                fontSize: this.fontSize(14),
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 100, 100, 0],
                //柱体的颜色
                //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(142, 89, 254, 0)"
                  },
                  {
                    offset: 1,
                    color: "#D959FE"
                  }
                ], false)
              }

            }
          },

        ]
      }
      this.echartTestDefect.setOption(testDefectOption, true)
    },
    initChartRandom () {
      let _this = this
      let randomOption = {
        title: {
          text: '各市协同处置情况',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          itemHeight: 8,
          itemWidth: 8,
          data: [{ name: '下发数', icon: 'circle' }, { name: '已处置数', icon: 'circle' }],
          bottom: 0,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '25',
          top: '40',
          containLabel: true
        },
        toolbox: {
          // feature: {
          //     saveAsImage: {}
          // }
        },
        xAxis: {
          type: 'category',
          //boundaryGap: false,
          data: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '台州', '丽水', '舟山'],
          axisLabel: {
            interval: 0,
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            symbol: 'none',//折线点
            name: '下发数',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410, 200, 300, 250, 340],
            areaStyle: {
              color: '#5d74bc'
            },
            itemStyle: {
              normal: {
                color: '#59f7fe', //改变折线点的颜色
                lineStyle: {
                  color: '#59f7fe'
                }
              }
            },
          },
          {
            symbol: 'none',//折线点
            name: '已处置数',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320, 530, 240, 345, 567],
            areaStyle: {
              color: '#661d94'
            },
            itemStyle: {
              normal: {
                color: '#fa09d6', //改变折线点的颜色
                lineStyle: {
                  color: '#fa09d6'
                }
              }
            },
          },
        ]
      }

      this.echartRandom.setOption(randomOption, true)
    },
    initChartUnit () {
      let unitOption = {
        title: {
          text: '各类型单位组成',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        grid: {
          left: '0',
          top: '0'
        },
        legend: [{
          orient: 'vertical',
          left: -30,
          top: 'middle',
          data: ['检验机构', '使用单位', '充装单位'],
          //align: 'left',
          icon: 'none',
          textStyle: {
            color: () => { }  // 把颜色这里做成函数就可以了
          },
          formatter: function (name) {
            var index = 0
            var clientlabels = ['检验机构', '使用单位', '充装单位']
            var clientcounts = [522, 522, 522]
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i
              }
            })
            return name + '\n' + clientcounts[index]
          }
        }, {
          orient: 'vertical',
          right: 0,
          top: 'middle',
          data: ['设计单位', '制造单位', '安改修单位'],
          align: 'right',
          icon: 'none',
          textStyle: {

            color: () => { }  // 把颜色这里做成函数就可以了
          },
          formatter: function (name) {
            var index = 0
            var clientlabels = ['设计单位', '制造单位', '安改修单位']
            var clientcounts = [522, 522, 522]
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i
              }
            })
            return name + '\n' + clientcounts[index]
          }

        }],

        series: [
          {
            name: '单位数量',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: this.fontSize(14),
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            color: ['#FA0996', '#0971FA', '#59F7FE', '#FE5959', '#FEBD59', '#59FEBA'],
            data: [
              { value: 522, name: '检验机构' },
              { value: 522, name: '使用单位' },
              { value: 522, name: '充装单位' },
              { value: 522, name: '设计单位' },
              { value: 522, name: '制造单位' },
              { value: 522, name: '安改修单位' },
            ]
          }
        ]
      }
      this.echartUnit.setOption(unitOption, true)
    },
    initChartPerson () {
      let personOption = {
        title: {
          text: '全省各类型作业人员',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: [{
          orient: 'vertical',
          left: -30,
          top: 'middle',
          data: ['检验机构', '使用单位', '充装单位'],
          //align: 'left',
          icon: 'none',
          textStyle: {
            color: () => { }  // 把颜色这里做成函数就可以了
          },
          formatter: function (name) {
            var index = 0
            var clientlabels = ['检验机构', '使用单位', '充装单位']
            var clientcounts = [522, 522, 522]
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i
              }
            })
            return name + '\n' + clientcounts[index]
          }
        }, {
          orient: 'vertical',
          right: 0,
          top: 'middle',
          data: ['设计单位', '制造单位', '安改修单位'],
          align: 'right',
          icon: 'none',
          textStyle: {

            color: () => { }  // 把颜色这里做成函数就可以了
          },
          formatter: function (name) {
            var index = 0
            var clientlabels = ['设计单位', '制造单位', '安改修单位']
            var clientcounts = [522, 522, 522]
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i
              }
            })
            return name + '\n' + clientcounts[index]
          }

        }],

        series: [
          {
            name: '人员数量',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: this.fontSize(14),
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            color: ['#FA0996', '#0971FA', '#59F7FE', '#FE5959', '#FEBD59', '#59FEBA'],
            data: [
              { value: 522, name: '检验机构' },
              { value: 522, name: '使用单位' },
              { value: 522, name: '充装单位' },
              { value: 522, name: '设计单位' },
              { value: 522, name: '制造单位' },
              { value: 522, name: '安改修单位' },
            ]
          }
        ]
      }
      this.echartPerson.setOption(personOption, true)
    },
    initChartDevicetype () {
      let deviceTypeOption = {
        title: {
          text: '设备类型分析',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '35',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['电梯', '锅炉', '压力容器', '起重器械', '游乐设施', '客运索道', '场内专用机动车辆'],
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: this.fontSize(10),
              formatter: function (params) {
                var newParamsName = "" // 最终拼接成的字符串
                var paramsNameNumber = params.length // 实际标签的个数
                var provideNumber = 2 // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + "\n"
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }
                return newParamsName
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '设备数量',
            type: 'bar',
            barWidth: '8',
            data: [100, 100, 200, 200, 100, 200, 200],
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                //柱体的颜色
                //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(90, 254, 89, 0)"
                  },
                  {
                    offset: 1,
                    color: "#FEB859"
                  }
                ], false)
              }

            }
          }
        ]
      }
      this.echartDevicetype.setOption(deviceTypeOption, true)
    },
    initChartDevicetrend () {
      let deviceTrendOption = {
        title: {
          text: '近五年设备新增趋势',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '20',
          top: '35',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          //boundaryGap: false,
          data: ['2016', '2017', '2018', '2019', '2020'],
          axisLabel: {
            interval: 0,
            color: '#fff'
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false
          },
        },
        series:
        {
          symbol: 'none',//折线点
          name: '数量',
          type: 'line',
          stack: '总量',
          data: [50, 90, 110, 190, 210],
          areaStyle: {
            color: '#59F7FE;'
          },
          itemStyle: {
            normal: {
              color: '#59feba', //改变折线点的颜色
              lineStyle: {
                color: '#1c697e'
              }
            }
          },
        },
      }
      this.echartDevicetrend.setOption(deviceTrendOption, true)
    },
    initChartSafeEdu () {
      let safeOption = {
        title: {
          text: '近五年特种设备事故期数走势(起)',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '35',
          bottom: '35',
          right: '0',
        },
        xAxis: [
          {
            type: 'category',
            data: ['2016', '2017', '2018', '2019', '2020'],
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: this.fontSize(10),
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '事故期数',
            type: 'bar',
            barWidth: '20%',
            data: [420, 380, 280, 210, 170],
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                //柱体的颜色 右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(160, 89, 254, 0)"
                  },
                  {
                    offset: 1,
                    color: "#FE5959"
                  }
                ], false)
              }

            }
          }
        ]
      }
      this.echartSafeEdu.setOption(safeOption, true)
    },
    initChartAlarm () {
      let alarmOption = {
        title: {
          text: '各市电梯故障报警数',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '35',
          bottom: '20',
          right: '0',
        },
        xAxis: [
          {
            type: 'category',
            data: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '台州', '丽水', '舟山'],
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: this.fontSize(10),
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '报警数',
            type: 'bar',
            barWidth: '20%',
            data: [100, 250, 160, 100, 210, 210, 250, 170, 210, 100, 220],
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                //柱体的颜色 右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(142, 89, 254, 0)"
                  },
                  {
                    offset: 1,
                    color: "#D959FE"
                  }
                ], false)
              }
            }
          }
        ]
      }
      this.echartAlarm.setOption(alarmOption, true)
    },
    initChartDisposaltime () {
      let disposalOption = {
        title: {
          text: '地市平均处置市场(分钟)',
          textStyle: {
            color: '#fff',
            fontSize: this.fontSize(14)
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '35',
          bottom: '20',
          right: '0',
        },
        xAxis: [
          {
            type: 'category',
            data: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '台州', '丽水', '舟山'],
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: this.fontSize(10),
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '处置时长',
            type: 'bar',
            barWidth: '20%',
            data: [100, 250, 160, 100, 210, 210, 250, 170, 210, 100, 220],
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                //柱体的颜色 右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(90, 254, 89, 0)"
                  },
                  {
                    offset: 1,
                    color: "#FEB859"
                  }
                ], false)
              }
            }
          }
        ]
      }
      this.echartDisposaltime.setOption(disposalOption, true)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChose (tab, event) {
      console.log(tab, event)
    },
    clickSum (index) { // 这里我们传入一个当前值
      console.log(index, 'index')
      this.sumIndex = index
    },
    linkage (data, level) {
      console.log(level)
      console.log(data, 'datadata')
      if (level === 'city') {
        this.curarea = data.data.code

      } else if (level === 'province') {
        this.curarea = data.data.code
        //this.$refs.map.changeView(data.code, level)
      } else {
        this.curarea = data.code
      }
    },
  },
}
</script>
<style lang="less" scoped>
@w: 1920;
@h: 1080;

.wCalc(@width) {
  width: calc(@width / @w * 100vw);
}
.hCalc(@height) {
  height: calc(@height / @h * 100vh);
}
.lhCalc(@height) {
  line-height: calc(@height / @h * 100vh);
}
.pCalc(@t, @r, @b, @l) {
  box-sizing: border-box;
  padding: calc(@t / @h * 100vh) calc(@r / @w * 100vw) calc(@b / @h * 100vh)
    calc(@l / @w * 100vw);
}
.mCalc(@t, @r, @b, @l) {
  margin: calc(@t / @h * 100vh) calc(@r / @w * 100vw) calc(@b / @h * 100vh)
    calc(@l / @w * 100vw);
}
.fCalc(@s) {
  font-size: calc(@s / @w * 100vw);
}
.home {
  background: url('../assets/img/background.png') no-repeat;
  height: 100vh;
  color: #fff;
  .homeTop {
    //height:8vh;
    .hCalc(90);
    .fCalc(28);
    .pCalc(15,0,25,0);
    .lhCalc(40);
    background: url('../assets/img/pagetop.png') no-repeat;
    background-size: 100% 100%;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 6px;
  }
  .homeMain {
    display: flex;
    .pCalc(0,20,0,20);
    .pageleft {
      .wCalc(402);
      .fCalc(16);
      font-weight: 600;
      .highRisk {
        position: relative;
        .hCalc(353);
        .wCalc(400);
        .pCalc(31,31,31,31);
        text-align: left;
        background: url('../assets/img/rect.png') no-repeat;

        background-size: 100% 100%;
      }
      .riskWarning {
        position: absolute;
        .hCalc(46);
        .wCalc(282);
        .lhCalc(46);
        .mCalc(0,60,0,60);
        background: url('../assets/img/button.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .specialEquipment {
        position: relative;
        .wCalc(400);
        .hCalc(456);
        .mCalc(78,0,0,0);
        .pCalc(30,30,30,30);
        font-weight: 600;
        background: url('../assets/img/rect2.png') no-repeat;
        background-size: 100% 100%;

        .randomtitle {
          .mCalc(0,0,5,0);
        }
        .random {
          width: 50%;
          .hCalc(56);
          .mCalc(0,0,40,0);
          display: inline-block;
        }
        .randomnum {
          .fCalc(24);
          color: #59f7fe;
        }
      }
      .deviceStore {
        position: absolute;
        .hCalc(46);
        .wCalc(282);
        .lhCalc(46);
        .mCalc(0,60,0,60);
        background: url('../assets/img/button.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .pagecenter {
      //width:48vw;
      .wCalc(1080);
      .centerTop {
        .wCalc(768);
        .hCalc(114);
        margin: auto;
        margin-top: 2vh;
        background: url('../assets/img/rect2.png') no-repeat;
        background-size: 100% 100%;
        .centerul {
          display: flex;
          li:nth-of-type(odd) {
            .sumtext {
              color: #59f7fe;
            }
          }
          li:nth-of-type(even) {
            .sumtext {
              color: #fe5959;
            }
          }
          li {
            .wCalc(221);
            .hCalc(114);
            .pCalc(20,20,20,20);
            .fCalc(18);
            .lhCalc(25);
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            .sumtext {
              .mCalc(10,0,0,0);
              .fCalc(32);
              .lhCalc(39);
              font-family: FuturaBT-Medium, FuturaBT;
              font-weight: 500;
              //color: #59F7FE;
              z-index: 2;
            }
          }
          li + li {
            background: url('../assets/img/straight.png') no-repeat;
            background-position: left;
          }
          li:hover {
            background: linear-gradient(
              180deg,
              rgba(89, 247, 254, 0) 0%,
              #59f7fe 51%,
              rgba(89, 247, 254, 0) 100%
            );
            opacity: 0.5;
            cursor: pointer;
          }
          .active {
            background: linear-gradient(
              180deg,
              rgba(89, 247, 254, 0) 0%,
              #59f7fe 51%,
              rgba(89, 247, 254, 0) 100%
            );
            opacity: 0.5;
          }
        }
      }
      .promap {
        .hCalc(730);
        .wCalc(810);
        margin: auto;
        //background: url('../assets/img/promap.png') no-repeat;
        background-size: 100% 100%;
      }
      .btngroup {
        .wCalc(810);
        margin: auto;
        .firstline {
          .hCalc(45);
          li {
            .hCalc(45);
            .wCalc(187);
            .lhCalc(45);
            background: url('../assets/img/firstlinebtn.png') no-repeat;
            background-size: 100% 100%;
            float: left;
            cursor: pointer;
          }
        }
        .secondline {
          .hCalc(45);
          .mCalc(20,0,0,0);
          li {
            .hCalc(45);
            .wCalc(146);
            .lhCalc(45);
            background: url('../assets/img/secondlinebtn.png') no-repeat;
            background-size: 100% 100%;
            float: left;
            cursor: pointer;
          }
          .carsControl {
            .hCalc(45);
            .wCalc(312);
            .lhCalc(45);
            background: url('../assets/img/carsControl.png') no-repeat;
            background-size: 100% 100%;
            float: left;
            cursor: pointer;
          }
        }
        li + li {
          .mCalc(0,0,0,20);
        }
      }
    }

    .pageRight {
      .wCalc(400);
      .fCalc(16);
      .collaborative {
        position: relative;
        .hCalc(325);
        .wCalc(400);
        .pCalc(34,20,20,20);
        background: url('../assets/img/rect2.png') no-repeat;
        background-size: 100% 100%;
        .randomtitle {
          .mCalc(0,0,5,0);
        }
        .random {
          width: 50%;
          .hCalc(56);
          .mCalc(0,0,20,0);
          display: inline-block;
        }
        .randomnum {
          .fCalc(24);
          color: #59f7fe;
        }
      }
      .collaborativebtn {
        position: absolute;
        .hCalc(46);
        .wCalc(282);
        .lhCalc(46);
        .mCalc(0,60,0,60);
        background: url('../assets/img/button.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .safetyWindow {
        position: relative;
        .wCalc(400);
        .hCalc(482);
        .pCalc(20,20,20,20);
        .mCalc(79,0,0,0);
        background: url('../assets/img/rect2.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        .fixedRate {
          .wCalc(120);
          .hCalc(120);
          margin: auto;
        }
        .analycss {
          text-align: left;
        }
        .safeul {
          display: inline-block;
          li {
            float: left;
            //min-width:4.68vw;
          }
          li + li {
            margin-left: 2.1vw;
          }
          /deep/ .el-tabs__header {
            .mCalc(0,0,20,0);
          }
        }
        .randomtitle {
          .mCalc(0,0,5,0);
        }
        .random {
          width: 50%;
          .hCalc(80);
          .mCalc(0,0,20,0);
          display: inline-block;
        }
        .randomnum {
          .fCalc(24);
          color: #59f7fe;
        }
      }
      .safetyWindowbtn {
        position: absolute;
        .hCalc(46);
        .wCalc(282);
        .lhCalc(46);
        .mCalc(0,60,0,60);
        background: url('../assets/img/button.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }

    .riskul {
      display: flex;
      .mCalc(20,0,30,0);
      li {
        //width:7vw;
        //height:5.1vh;
        .wCalc(139);
        .hCalc(56);

        .lidiv {
          height: 100%;
          margin-left: 1vh;

          text-align: left;
          .fCalc(16);
          .risknum {
            //.mCalc(2,0,0,0);
            .fCalc(32);
            font-weight: 500;
          }
        }
      }
    }
    /deep/ .el-tabs__nav {
      float: right;
    }
    /deep/ .el-tabs__nav-wrap::after {
      content: none;
    }
    /deep/ .el-tabs__nav {
      .hCalc(34);
      .lhCalc(34);
    }
    /deep/ .el-tabs__item {
      color: #fff;
      .hCalc(34);
      .lhCalc(34);
      .fCalc(18);
    }
    /deep/ .el-tabs__header {
      .mCalc(0,0,30,0);
    }
    /deep/ .el-tabs__item.is-active {
      color: #59f7fe;
    }
    /deep/ .el-tabs__active-bar {
      .hCalc(4);
      background: #59f7fe;
    }
    .blueline {
      display: inline-block;
      .hCalc(8);
      .wCalc(15);
      background: url('../assets/img/blueyaxis.png') no-repeat;
      background-size: 100% 100%;
    }
    .pspan {
      .mCalc(0,10,0,10);
    }
  }
}
</style>
