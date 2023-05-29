// pages/demo1/demo1.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bookName:"英语四级单词",
      newWords:0,
      oldWords:10,
      show:false
 },
 showPopup() {
  this.setData({ show: true });
},

onClose() {
  this.setData({ show: false });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    });
    if(app.globalData.count >= 0){
    this.setData({
      newWords:app.globalData.count
    })
  }
    console.log(this.data.newWords)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.onLoad();
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