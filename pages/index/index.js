//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    time: 20,
    cateActive: 0,
    rate: 0,
    clockShow: false,
    // timeStr: '',
    // state: 'runing',
    // timer: null,
    // mTime: 0,
    // residueTime: 0,
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
    // this.setData({
    //   clockShow: true
    // })
    wx.navigateTo({
      url: '../runing/runing',
      success: (res) => {
        console.log(res)
        res.eventChannel.emit('giveTime', {time: this.data.time})
      }
    })
    // this.drawBg()
    // this.setData({
    //   // clockShow: true,
    //   mTime: this.data.time * 60 * 1000,
    //   residueTime: this.data.time * 60 * 1000,
    //   state: 'runing',
    //   timeStr: this.handleTimeZero(this.data.time) + ':00'
    // })
    // this.drawActive()
  }
})
