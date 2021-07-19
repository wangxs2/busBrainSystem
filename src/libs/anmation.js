export default class Anmation {
  constructor(data) {
    Object.assign(this, this.data(data))
    this.mounted()
  }

  // 数据
  data(data) {
    return {
      center: data.center, // 圆心
      radius: 30, // 圆的大小
      level: 3, // 扩散层数
      color: data.color,
      endOpacity: 0.2, // 终止透明度
      speedOpacity: 0, // 每步的透明度
      speed: 0.2, // 终止透明度
      distance: 800, // 间隔时间 毫秒
      circles: [], // 覆盖物集合
      circleGroup: new AMap.OverlayGroup(), // 覆盖物容器
      clock: 0 // 计时器
    }
  }

  // 方法调用
  mounted() {
    // 初始化圆

    this.speedOpacity = (this.color.fillOpacity - this.endOpacity) / this.radius
    this.speed = this.radius / (this.level * this.distance)
    this.initCircle()
  }
  initCircle() {
    let circle = null
    for (let i = 0; i < this.level; i++) {
      circle = new AMap.CircleMarker({
        center: this.center,
        radius: 0,
        fillColor: this.color.fillColor,
        fillOpacity: this.color.fillOpacity,
        strokeColor: this.color.fillColor,
        strokeWeight: 1,
        strokeOpacity: this.color.fillOpacity
      })
      this.circles.push(circle)
    }
    this.circleGroup.addOverlays(this.circles)
    this.start()
  }
  start() {
    const now = Date.now()
    window.requestAnimationFrame(this.animation.bind(this, now, now))
  }
  // 动画
  animation(startTiem, everyTime) {
    const now = Date.now()
    // 每次执行时间 按60HZ 刷
    const Every = now - everyTime > 167 ? 16.7777777777 : now - everyTime
    // 每帧 步长
    const speed = this.speed * Every
    // 计算每个圆的执行间隔时间
    const time = now - startTiem
    // 半径
    let radius = 0
    // 透明度
    let colorOp = 0
    for (let [index, circle] of this.circles.entries()) {
      if (time >= index * this.distance) {
        radius = circle.getRadius() + speed
        radius = radius >= this.radius ? 0 : radius
        colorOp = (this.radius - radius) * this.speedOpacity
        circle.setOptions({
          radius,
          fillColor: this.color.fillColor,
          strokeColor: this.color.fillColor,
          strokeOpacity: colorOp,
          fillOpacity: colorOp
        })
      }
    }
    this.clock = window.requestAnimationFrame(
      this.animation.bind(this, startTiem, now)
    )
  }
  end() {
    this.circleGroup.setOptions({
      radius: 0
    })
    window.cancelAnimationFrame(this.clock)
  }
  clear() {
    this.end()
    this.circleGroup.clearOverlays()
  }
}
