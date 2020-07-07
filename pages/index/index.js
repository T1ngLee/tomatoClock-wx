//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    time: 20,
    cateActive: 0,
    rate: 0,
    clockShow: false,
    timeStr: '',
    cateArr: [
      {icon: 'work', text: '工作'},
      {icon: 'study', text: '学习'},
      {icon: 'think', text: '思考'},
      {icon: 'write', text: '写作'},
      {icon: 'sport', text: '运动'},
      {icon: 'read', text: '阅读'}
    ]
  },
  onLoad: function () {
    const res = wx.getSystemInfoSync()
    this.setData({
      rate: 750 / res.windowWidth
    })
  },
  sliderChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  itemTap: function(e) {
    this.setData({
      cateActive: e.currentTarget.dataset.index
    })
  },
  start: function() {
    this.setData({
      clockShow: true
    })
    this.drawBg()
    this.drawActive()
    this.setData({
      timeStr: this.handleTimeZero(this.data.time) + ':00'
    })
  },
  over: function() {
    this.setData({
      clockShow: false
    })
  },
  handleTimeZero(num) {
    return num >= 10 ? num : '0' + num
  },
  drawBg: function() {
    const lineWidth = 6
    const ctx = wx.createCanvasContext('progress-bg')
    ctx.setLineWidth(lineWidth)
    ctx.setStrokeStyle('#000000')
    ctx.setLineCap('round')
    ctx.beginPath()
    ctx.arc(400 / this.data.rate / 2,
            400 / this.data.rate / 2,
            400 / this.data.rate / 2 - lineWidth,
            0,
            2 * Math.PI,
            false)
    ctx.stroke()
    ctx.draw()
  },
  drawActive: function() {
    const _this = this
    const mTime = this.data.time * 60 * 1000
    let residueTime = this.data.time * 60 * 1000
    const timer = setInterval(function(){
      const angle = 1.5 + 2 * (mTime - residueTime) / mTime
      residueTime -= 100
      if (residueTime % 1000 === 0) {
        const timeStr1 = residueTime / 1000 //s
        let timeStr2 =  parseInt(timeStr1 / 60) //m
        const timeStr3 = _this.handleTimeZero(timeStr1 - timeStr2 * 60)
        timeStr2 = _this.handleTimeZero(timeStr2)
        _this.setData({
          timeStr: timeStr2+':'+timeStr3
        })
      }
      if (angle < 3.5) {
        const lineWidth = 6
        const ctx = wx.createCanvasContext('progress-active')
        ctx.setLineWidth(lineWidth)
        ctx.setStrokeStyle('#ffffff')
        ctx.setLineCap('round')
        ctx.beginPath()
        ctx.arc(400 / _this.data.rate / 2,
          400 / _this.data.rate / 2,
          400 / _this.data.rate / 2 - lineWidth,
          1.5 * Math.PI,
          angle * Math.PI,
          false)
        ctx.stroke()
        ctx.draw()
      } else {
        clearInterval(timer)
      }
    },100)
  }
})
