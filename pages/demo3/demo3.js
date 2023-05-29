// pages/demo3/demo3.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    i:0,
    num:10,//单词数量
    progress:0,//进度条
    datas:[],//接收单词数据
    learnStatus1 :"今日还需学习",
    learnStatus2 :"个单词"
  },
  //点击”我会“调用
  countUp(){
   if(this.data.num != 0){ 
  this.setData({
    progress:this.data.progress + 10,
   i:this.data.i + 1,
   num:this.data.num - 1
   
  }) 
  app.globalData.count --;
  app.globalData.index ++;
  app.globalData.progress = app.globalData.progress + 10;
  console.log(app.globalData.count)
}else if(this.data.num == 0){

  this.setData({
    i:this.data.i + 1,
    learnStatus1:"今日学习任务已完成！",
    num:"",
    learnStatus2:""
   }) 
   app.globalData.index ++;
}
 console.log(this.data.num )
    // console.log(this.data.count)
 },
    
//点击“我不会”调用
 message(){
   let index = this.data.i;
   wx.navigateTo({
     url: `../demo6/demo6?msg=${index}`,
    //  success:function(res){
    //   res.eventChannel.emit("getParam",{msg : index})
    //  }
   })
 },
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.count == 0){
      this.setData({
        i:app.globalData.index,
        learnStatus1:"今日学习任务已完成！",
        num:"",
        datas:app.globalData.word,
        learnStatus2:"",
        progress:app.globalData.progress
      })
    }else{
      this.setData({
      i:app.globalData.index,
      datas:app.globalData.word,
      num:app.globalData.count,
      progress:app.globalData.progress
    })
    }
    
    // console.log(app.globalData.word)
    // console.log(this.data.datas)
    // console.log(this.data.i)
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
   
    // wx.stopPullDownRefresh();
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