// pages/demo6/demo6.js
let eventChannel ; 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    msgObj:{},
    heartUrl:"../../icon/heart.png"
  },
heart(){
  //判断是否点亮

  //如果未点亮
  if(this.data.heartUrl === "../../icon/heart.png"){
    app.globalData.heartWords.push(this.data.msgObj);  
        console.log( app.globalData.heartWords)
      
     this.setData({
      heartUrl:"../../icon/heart_1.png"
    })
  }else if(this.data.heartUrl === "../../icon/heart_1.png"){
    this.setData({
      heartUrl:"../../icon/heart.png"
    })

    // app.globalData.heartWords.splice(this.data.msgObj.index,1);
    app.globalData.heartWords.forEach(
      (item,index) =>{
        if(item.index === this.data.msgObj.index){
          app.globalData.heartWords.splice(index,1);
        }
      }
    )

    console.log(app.globalData.heartWords)
  }
    
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
    console.log(options)
     this.setData({
            msgObj:app.globalData.word[options.msg]
          })
          console.log(this.data.msgObj)

    app.globalData.heartWords.forEach(
      item =>{
        if(item.index == this.data.msgObj.index){
          this.setData({
            heartUrl:"../../icon/heart_1.png"
          })
        }
      }
    )
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
    // this.onLoad();
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