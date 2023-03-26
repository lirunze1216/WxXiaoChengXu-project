// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    country: 'china',
    name: 'ZS',
    token: '',
    postData: {
      username: '',
      password: ''
    }
  },
  addCount() {
    this.setData({
      count: this.data.count + 1
    })
  },
  getCount(e) {
    // console.log(e.detail);
    this.setData({
      count: e.detail
    })
  },

  login() {
    wx.request({
      url: 'http://127.0.0.1:3007/api/login',
      method: 'POST',
      data: this.data.postData,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: ({
        data: res
      }) => {
        if (res.status !== 0) {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })

        } else {
          this.setData({
            token: res.token
          })
        }
      },
      complete: () => {
        this.setData({
          ['postData.username']: '',
          ['postData.password']: ''
        })
        console.log(this.data.postData);
      }
    })
  },
  outLogin() {
    this.setData({
      token: ''
    })
  },
  getUsername(e) {
    this.setData({
      ['postData.username']: e.detail.value.trim()
    })
    console.log(this.data.postData);
  },
  getPassword(e) {
    this.setData({
      ['postData.password']: e.detail.value.trim()
    })
    console.log(this.data.postData);
  },
  getChild() {
    const child = this.selectComponent('.my_test')
    // console.log(child);
   child.addCount3()
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      count: 0
    })
    // 数据处理完关闭下拉刷新
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})