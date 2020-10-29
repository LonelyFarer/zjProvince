<!--  -->
<template>
  <div class="mapage">
    <div class="map" id="map"></div>
  </div>
</template>

<script>
//import AMap from "AMap"

import zhejiang from '../../public/data/json/zhejiang.json'
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
import { getCustomCityname } from '@/libs/globalProperty'
import amapcode from '@/libs/amapcode.json'
export default {
  props: {
    mapData: {
      default: []
    },
  },
  components: {},
  data () {
    return {
      data: '',
      cityNameSwitch: getCustomCityname(),
      metawidth: document.body.clientWidth,
      map: null,
      amapAreaCode: null,
      amapAreaName: null,
      authority: '', // 用户权限
      markers: [],
      markerData: new Map(),
      currentlevel: '', // 当前地图等级 province city district
      markerCenter: '',
      areaCode: '330000',
      areaName: '浙江',
    }
  },

  mounted () {
    this.MapInit()
    this.data = this.mapData
  },
  created () {
    if (this.metawidth >= 1920) {
      this.mapCenter = [120.203249, 29.154867]
      this.echartsFont = 12
    }
    if (this.areaCode === '330000') {
      this.currentlevel = 'province'
      // 省级权限
      this.authority = 'province'
    }
    if (this.parentCode === '330000') {
      this.currentlevel = 'city'
      // 市级权限
      this.authority = 'city'
    }
    if (this.parentCode !== '330000' && this.parentCode !== '0') {
      this.currentlevel = 'city'
      // 区级权限
      this.authority = 'district'
    }
    // 高德地图 浙江省数据
    let areamap = new Map()
    amapcode.children.forEach(element => {
      element.children.forEach(subel => {
        areamap.set(subel.name, subel.adcode)
      })
    })
    // 数据库 区市数据
    let databaseName = ''
    if (this.cityNameSwitch.get(this.areaName)) {
      databaseName = this.cityNameSwitch.get(this.areaName)
    } else {
      databaseName = this.areaName
    }
    this.amapAreaName = databaseName
    // 区县级编码要转换
    this.amapAreaCode = areamap.get(databaseName) || parseInt(this.areaCode)
    console.log(this.amapAreaName, this.amapAreaCode, 'jjjjjj')
  },
  methods: {
    MapInit () {
      //创建地图
      this.map = new AMap.Map("map", {
        cursor: "default",
        resizeEnable: true,
        expandZoomRange: true,
        gestureHandling: "greedy",
        // zooms: [8, 20],
        zoom: 12,
        defaultCursor: "pointer",
        mapStyle: "amap://styles/f6e3818366ba5268d50ea3f2296eb3eb",
        showLabel: true
      })
      this.initDistrictExplorer()
    },
    initDistrictExplorer () {
      // 加载行政区划组件
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        // 创建一个实例
        this.districtExplorer = window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: this.map // 关联的地图实例
        })
        // 绘制浙江省区域
        this.switch2AreaNode(this.amapAreaCode)
        console.log(this.amapAreaCode, 'this.amapAreaCode')
      })
    },
    // 切换区域
    switch2AreaNode (adcode, callback) {
      console.log(adcode, 'adcodeadcode')
      this.districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          if (callback) {
            callback(error)
          }
          console.log('switch2AreaNode-errro', error)
          return
        }
        // 记录当前选择节点
        this.currentAreaNode = window.currentAreaNode = areaNode

        // 待绘制marker次数
        this.refreshCount += 1

        // 设置当前使用的定位用节点
        this.districtExplorer.setAreaNodesForLocating([areaNode])

        // 刷新内容
        this.refreshAreaNode(areaNode)

        if (callback) {
          callback(null, areaNode)
        }
      })
    },
    // 切换区域后刷新显示内容
    refreshAreaNode (areaNode) {
      // 清空Hover状态
      this.districtExplorer.setHoverFeature(null)
      // 绘制区域
      this.renderAreaPolygons(areaNode)
    },
    // 绘制区域的边界
    renderAreaPolygons (areaNode) {
      // 清除已有的绘制内容
      this.districtExplorer.clearFeaturePolygons()
      // 清空marker标记
      this.map.remove(this.markers)

      // 边界颜色
      let strokeColor = '#ffffff'

      // 绘制子区域
      this.districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
        return {
          cursor: 'default',
          bubble: true,
          strokeColor: strokeColor, // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 0.5, // 线宽
          fillColor: '#1CF9F7', // 填充色
          fillOpacity: 0.6 // 填充透明度
        }
      })

      // 绘制父级区划, 仅绘制描边 区县权限需要填充颜色
      this.districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: strokeColor, // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 0.5, // 线宽
        fillColor: this.authority === 'district' ? '#1CF9F7' : null,
        fillOpacity: this.authority === 'district' ? 0.6 : null // 填充透明度
      })

      // 更新地图视野
      if (areaNode.getAdcode() === 330000) {
        this.map.setZoomAndCenter(this.zoom, this.mapCenter)
      } else {
        this.map.setBounds(areaNode.getBounds(), null, null, true)
      }
    },
  },
  watch: {

  }
}
</script>
<style lang='less' scoped>
.map {
  height: 67.5vh;
  width: 42.2vw;
}
.mapage {
  position: relative;
}
</style>
