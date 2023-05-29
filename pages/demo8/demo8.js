// pages/demo8/demo8.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
// console.log(111)
    appKey : 'xxxxx',
    key : 'xxxx',//注意：暴露appSecret，有被盗用造成损失的风险
    salt : '',
    curtime : '',
    query : 'public',
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    from : 'auto',
    to : 'zh-CHS',
    signType :'v3',
    str1 : '',
    vocabId :  'xxxxxx',
    sign : '',
    msgObj:{},//接收服务器返回数据对象
    inputText:'',
    msg:false,//英文页面数据显示布尔量
    chs:false,//中文页面数据显示布尔量
    undefind:false,//无法找到
    index:0,//语言版本索引
    toLanguageArray:['中文','英文'],  //picker显示文字
    toLanguageValue:['zh-CHS','en'],   //api接受字符
    navBarHeight: "",
    translationtext:[],
},
  //获取目标语言
   bindPickerChange: function(e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)
     this.setData({
     index: e.detail.value
     })
     console.log('index更改为:', this.data.index)
     },

  // onChange(event) {
  //   this.setData({
  //     radio: event.detail,
  //   });
  //   console.log(this.data.radio)
  // },

 
/**
   * 输入框实时回调
   * @param {*} options 
   */
  translateInputAction: function (options) {
    //获取输入框输入的内容
    let value = options.detail.value
    this.setData({
      inputText:options.detail.value,
      chs:false,
      msg:false,
      undefind:false
    }),
    console.log("输入框输入的内容是 " + value)
  },
  submit:function(){
    this.setData({
      msgObj:{}
    })
    console.log("点击了提交")
    var in_text = this.data.inputText.trim()  //获取输入的字符串
    console.log("输入内容是："+in_text);
    this.setData({
      query:in_text,
      to:this.data.toLanguageValue[this.data.index]
    })
    console.log("当前to："+this.data.to)
     this.setData({
       salt:(new Date).getTime(),
       curtime : Math.round(new Date().getTime()/1000).toString(),
     })
     this.setData({
       str1 : this.data.appKey + this.truncate(this.data.query) + this.data.salt + this.data.curtime + this.data.key,
     })
     this.setData({
      sign : this.SHA256(this.data.str1)
     })
   wx.request({
       url: `https://openapi.youdao.com/api?q=${this.data.query}&from=${this.data.from}&to=${this.data.to}&appKey=64d3e308494e581b&salt=${this.data.salt}&sign=${this.data.sign}&signType=v3&curtime=${this.data.curtime}`,
       method:"POST",
       header: {
         'content-type': 'application/json' // 默认值
       },
       dataType: 'jsonp',
       success:(data) =>{
         console.log(data)
           console.log(JSON.parse(data.data).basic);

           this.setData({
             msgObj:JSON.parse(data.data).basic
           })

           console.log(this.data.msgObj)
           if(JSON.parse(data.data).basic){
             if(this.data.index == 0){
             this.setData({
             msg:true
           })
           }else if(this.data.index == 1){
             this.setData({
               chs:true
             })
           }
           }else{
             this.setData({
              undefind:true
             })
           }
           
           
     }
     })
    //  console.log(`query:${this.data.query}\nappKey:${this.data.appKey}\nsalt:${this.data.salt}\nfrom:${this.data.from}\nto:${this.data.to}\nsignType:${this.data.signType}\ncurtime:${this.data.curtime}\nsign:${this.data.sign}`)
    //  console.log(this.SHA256('123456'))
  },

  truncate(q){
    var len = q.length;
    if(len<=20) {return q;}
    return q.substring(0, 10) + len + q.substring(len-10, len);
},
//sha256加密
SHA256(s){
  var chrsz = 8;var hexcase = 0;function safe_add (x, y) {var lsw = (x & 0xFFFF) + (y & 0xFFFF);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return (msw << 16) | (lsw & 0xFFFF);}function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }function R (X, n) { return ( X >>> n ); }function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }function core_sha256 (m, l) {var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);var W = new Array(64);var a, b, c, d, e, f, g, h, i, j;var T1, T2;m[l >> 5] |= 0x80 << (24 - l % 32);m[((l + 64 >> 9) << 4) + 15] = l;for ( var i = 0; i<m.length; i+=16 ) {a = HASH[0];b = HASH[1];c = HASH[2];d = HASH[3];e = HASH[4];f = HASH[5];g = HASH[6];h = HASH[7];for ( var j = 0; j<64; j++) {if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);T2 = safe_add(Sigma0256(a), Maj(a, b, c));h = g;g = f;f = e;e = safe_add(d, T1);d = c;c = b;b = a;a = safe_add(T1, T2);}HASH[0] = safe_add(a, HASH[0]);HASH[1] = safe_add(b, HASH[1]);HASH[2] = safe_add(c, HASH[2]);HASH[3] = safe_add(d, HASH[3]);HASH[4] = safe_add(e, HASH[4]);HASH[5] = safe_add(f, HASH[5]);HASH[6] = safe_add(g, HASH[6]);HASH[7] = safe_add(h, HASH[7]);}return HASH;}function str2binb (str) {var bin = Array();var mask = (1 << chrsz) - 1;for(var i = 0; i < str.length * chrsz; i += chrsz) {bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);}return bin;}function Utf8Encode(string) {string = string.replace(/\r\n/g,"\n");var utftext = "";for (var n = 0; n < string.length; n++) {var c = string.charCodeAt(n);if (c < 128) {utftext += String.fromCharCode(c);}else if((c > 127) && (c < 2048)) {utftext += String.fromCharCode((c >> 6) | 192);utftext += String.fromCharCode((c & 63) | 128);}else {utftext += String.fromCharCode((c >> 12) | 224);utftext += String.fromCharCode(((c >> 6) & 63) | 128);utftext += String.fromCharCode((c & 63) | 128);}}return utftext;}function binb2hex (binarray) {var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";var str = "";for(var i = 0; i < binarray.length * 4; i++) {str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8 )) & 0xF);}return str;}s = Utf8Encode(s);return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    });
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