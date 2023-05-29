// pages/demo7/demo7.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      heartWords:[],
      nullMsg:true
  },


chancel(e){
    // console.log(e)
    let btn_index = e.currentTarget.dataset.index;
    // console.log(index)
    app.globalData.heartWords.forEach(
      (item,index) =>{
        if(item.index === btn_index){
          app.globalData.heartWords.splice(index,1);
        }
      }
    )
    this.onLoad();
},

  //查看更多单词信息
  moreMsg(e){
 
      // console.log(e)
      // console.log(e.currentTarget.dataset.index)
      let index = e.currentTarget.dataset.index;
      wx.navigateTo({
          url: `../demo6/demo6?msg=${index}`,
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        heartWords:app.globalData.heartWords
      })

      if(this.data.heartWords.length != 0){
        this.setData({
          nullMsg:false
        })
      }else if(this.data.heartWords.length == 0){
        this.setData({
          nullMsg:true
        })
      }
      console.log(this.data.heartWords)
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
    this.onLoad()
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