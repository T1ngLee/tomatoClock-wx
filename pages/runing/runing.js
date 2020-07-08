Page({
  data: {
    rate: 1,
    time: 0,
    timeStr: '',
    state: 'runing',
    timer: null,
    mTime: 0,
    residueTime: 0,
  },
  onLoad() {
    const res = wx.getSystemInfoSync()
    this.setData({
      rate: 750 / res.windowWidth
    })

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('giveTime', (data) => {
      console.log(data)
      this.setData({
        time: data.time
      })
      console.log(this.data.time)
    })
    this.start()
  },
  // onHide() {
  //   // wx.switchTab({
  //   //   url: '../index/index'
  //   // })
  //   console.log('进后台啦')
  // },
  onUnload () {
    console.log('onUnload', '进后台了啊')
    // wx.reLaunch({
    //   url: '../index/index'
    // })
    clearInterval(this.data.timer)
  },
  start: function() {
    this.drawBg()
    this.setData({
      mTime: this.data.time * 60 * 1000,
      residueTime: this.data.time * 60 * 1000,
      state: 'runing',
      timeStr: this.handleTimeZero(this.data.time) + ':00'
    })
    this.drawActive()
  },
  over: function() {
    this.setData({
      clockShow: false
    })
  },
  handleTimeZero(num) {
    // console.log('handleTimeZero', num)
    return num >= 10 ? num : '0' + num
  },
  drawBg: function() {
    const lineWidth = 12
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
    // const mTime = this.data.time * 60 * 1000
    // let residueTime = this.data.time * 60 * 1000
    // const
    const timer = setInterval(() => {
      
      const mTime = this.data.mTime
      const residueTime = this.data.residueTime
      const angle = 1.5 + 2 * (mTime - residueTime) / mTime
      this.setData({
        timer,
        residueTime: residueTime - 100
      })
      
      if (residueTime % 1000 === 0) {
        const timeStr1 = residueTime / 1000 //s
        let timeStr2 =  parseInt(timeStr1 / 60) //m
        const timeStr3 = this.handleTimeZero(timeStr1 - timeStr2 * 60)
        timeStr2 = this.handleTimeZero(timeStr2)
        this.setData({
          timeStr: timeStr2+':'+timeStr3
        })
      }
      if (angle < 3.5) {
        const lineWidth = 12
        const ctx = wx.createCanvasContext('progress-active')
        ctx.setLineWidth(lineWidth)
        ctx.setStrokeStyle('#ffffff')
        ctx.setLineCap('round')
        ctx.beginPath()
        ctx.arc(400 / this.data.rate / 2,
          400 / this.data.rate / 2,
          400 / this.data.rate / 2 - lineWidth,
          1.5 * Math.PI,
          angle * Math.PI,
          false)
        ctx.stroke()
        ctx.draw()
      } else {
        clearInterval(timer)
        this.setData({
          state: 'end'
        })
      }
    },100)
  },
  pause() {
    clearInterval(this.data.timer)
    this.setData({
      state: 'paused'
    })
  },
  run() {
    this.drawActive()
    this.setData({
      state: 'runing'
    })
  },
  again() {
    this.start()
  },
  // backHome() {
  //   this.pause()
  //   wx.switchTab({
  //     url: '',
  //   })
  // }
})