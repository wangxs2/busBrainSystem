export default class Map {
    constructor(data) {
        Object.assign(this, this.data(data))
        this.mounted()
    }
    data(data) {
        return {
            el: data.el, // 地图容器
            datar:{},
            linesearch:null,
            zdklMapOption : { // 站点客流 - 地图覆盖物参数
              mass: {}, // 海量点数据
              heat: '', // 热力图数据
              heatMaxCount: 10000, // 热力图密度最大值
          }
        }
    }
      // 方法调用
  mounted() {
    this.initMap()
  }
  initMap() {
    this.map = new AMap.Map(this.el, {
        zoom: 10, // 地图级别
        center: this.mapCenter, // 中心点
        // resizeEnable: true, //监控地图容器尺寸变化
        mapStyle:'amap://styles/d67717253a691e523956e9482ca38f1e',
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
      })
      this.linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: '上海',
        pageSize: 1,
        extensions: 'all'
    });

  }


    //渲染不同的海量点
     xrhld(massIndex, data, style) {
      this.zdklMapOption.mass[massIndex] = new AMap.MassMarks(data, {
          opacity: 0.8,
          zIndex: 111,
          cursor: 'pointer',
          style: style
      });
      var marker = new AMap.Marker({content: ' ', map: zdklMap});
      this.zdklMapOption.mass[massIndex].on('mouseover', function (e) {
          marker.setPosition(e.data.lnglat);
          marker.setLabel({content: e.data.name})
      });
      this.zdklMapOption.mass[massIndex].on('mouseout', function (e) {
          marker.setPosition(e.data.lnglat);
          marker.setLabel({content: null})
      });
      // this.zdklMapOption.mass[massIndex].on('click', function (e) {
      //     StopDetail.showMarker(zdklMap, e.data.id, beginDate, endDate);
      // });
      this.zdklMapOption.mass[massIndex].setMap(zdklMap);
  }

  


}