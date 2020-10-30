<template>
  <div>
    <div id="pro-map" style="width: 42.2vw; height: 67.5vh;"></div>
  </div>
</template>

<script>
import AMap from "AMap"
export default {
  data () {
    return {
      map: null,
      districtExplorer: null,
      adcode: '330000',
      currentlevel: 'province',
      currentAreaNode: null,
      zoom: 7
    }
  },


  watch: {},

  created () { },

  mounted () {
    this.initDistrictExplorer()

  },

  methods: {
    initDistrictExplorer () {
      let _this = this
      // 加载行政区划组件
      AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
        //启动页面
        _this.init(DistrictExplorer)
      })
    },

    init (DistrictExplorer) {
      let _this = this
      this.map = new AMap.Map('pro-map', {
        pitch: 30, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: '3D', // 地图模式
        pitch: 45, // 俯视角度
        mapStyle: 'amap://styles/ffcbb809ccbef341a4b581074ee94be4', // 设置地图的显示样式
        zoom: this.zoom, //设置地图的缩放级别
        zooms: [this.zoom, 20], // 缩放级别限制
        center: [119.758303, 29.327422],
      })

      this.map.on('click', e => {
        if (this.currentlevel !== 'district') {
          this.districtExplorer.locatePosition(e.lnglat, (error, features) => {
            if (
              features.length > 2 &&
              features[1].properties.adcode === 330000
            ) {
              if (this.currentlevel === 'province') {
                // 省级 切换至 市级
                this.featureClick(features[2])
              } else if (this.currentlevel === 'city') {
                // 市级 切换至 区级
                console.log(this.currentAreaNode.getAdcode(), features[2].properties.adcode, features[3], 'ii')
                if (
                  features[2].properties.adcode ===
                  this.currentAreaNode.getAdcode()
                ) {
                  this.featureClick(features[3])
                }
              } else {
                // district级别 暂不做处理
              }
            }
          })
        }
      })

      _this.districtExplorer = new DistrictExplorer({
        eventSupport: true, // 打开事件支持
        map: this.map //关联的地图实例
      })
      // AMap.plugin('AMap.DistrictSearch', function () {
      //   var opts = {
      //     subdistrict: 1, // 获取边界不需要返回下级行政区
      //     extensions: "all", // 返回行政区边界坐标组等具体信息
      //     level: "province" // 查询行政级别为 市
      //   }
      //   var district = new AMap.DistrictSearch(opts)

      //   district.search('浙江省', function (status, result) {
      // 查询成功时，result即为对应的行政区信息

      //var bounds = result.districtList[0].boundaries
      //var bounds = result.districtList[0].districtList

      //for (var i = 0, l = bounds.length; i < l; i++) {

      this.switch2AreaNode(this.adcode)
      //   var polygonbox = new AMap.Polygon({
      //     strokeWeight: 1,
      //     path: bounds[i],
      //     fillOpacity: 0.9,
      //     fillColor: "blue",
      //     strokeColor: "#fff",
      //     // extData: {
      //     //   IDname: bounds[i].name,
      //     // }
      //   })
      //   map.add(polygonbox)
      //}

      //   })
      // })
    },
    switch2AreaNode (adcode, callback) {
      let _this = this
      this.districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
        if (error) {
          if (callback) {
            callback(error)
          }
          return
        }
        // 记录当前选择节点
        _this.currentAreaNode = areaNode
        // 待绘制marker次数
        //this.refreshCount += 1

        // 设置当前使用的定位用节点
        _this.districtExplorer.setAreaNodesForLocating([areaNode])

        // 刷新内容
        _this.refreshAreaNode(areaNode)


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
      //this.map.remove(this.markers)

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
    featureClick (feature) {
      let props = feature.properties
      // 如果存在子节点
      if (props.childrenNum > 0) {
        // 切换到子区域
        this.$emit('searchData', [props.adcode, props.level, props.name])
        this.switch2AreaNode(props.adcode)
      } else {
        this.districtExplorer.clearFeaturePolygons()
        // 清空marker
        //this.map.remove(this.markers)
        // 设置地图中心、缩放级别
        this.map.setZoomAndCenter(15, props.center)
        // 显示全部地图元素
        this.map.setFeatures(['bg', 'point', 'road', 'building'])
        // 监听地图缩放
        this.map.on('zoomchange', this.zoomChange)
        // 地图移动后触发
        this.map.on('moveend', this.logMapBounds)
      }
      // 切换省/市/区等级
      if (this.currentlevel === 'province') {
        this.currentlevel = 'city'
      } else if (this.currentlevel === 'city') {
        this.currentlevel = 'district'
      }
    },
  }
};
</script>

<style scoped>
</style>
