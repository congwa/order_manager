import { httpClient ,actionId } from '../../../http.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索框
    inputShowed: false,
    inputVal: "",
    page:1,
    size:20,
    oData:[],
    type:['','订桌','付款','点餐','订餐']//1 订桌 2：付款 3点餐 4：订餐
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDate(options);
  },
  initDate(options) {
    console.log(options);
    this.setData({
      inputVal:options.val,
      inputShowed: true     
    })

    httpClient.search({
      action_id:actionId['1']	,
	    token : app.globalData.token,	
	    page	: this.data.page,
	    size	: this.data.size,
	    search: this.data.inputVal
    }).then(e => {
      if(e.data.code == 10000){
        this.setData({
          oData:e.data.data.items
        })
      }
    })
  },
  onReachBottom(){
    var page = this.data.page;
    page++;
    httpClient.search({
      action_id:actionId['1']	,
	    token : app.globalData.token,	
	    page	: this.data.page,
	    size	: this.data.size,
	    search: this.data.inputVal
    }).then(e => {
      if(e.data.code == 10000){
        this.setData({
          oData:oData.push(...e.data.data.items),
          page:page
        })
      }
    })
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
  * 输入改变的回调函数
  */
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    // this.auto();
    console.log(this.data.inputVal, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  }
})