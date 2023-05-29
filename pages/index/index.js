// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 事件处理函数
  bindViewTap() {
  
  },
  onLoad() {
    
    
  },
  onShow(){
    setTimeout(function() {
            wx.switchTab({
              url: '/pages/demo1/demo1',
            })
          }, 1500)
  },
  
})

