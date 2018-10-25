import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    httpClient.bankDetail({
      action_id:actionId['6'],
      token:app.globalData.token
    }).then(res => {
      console.log(res.data);
      if(res.data.code == 10000){
        this.setData({
          list:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  goSecondEnter(){
     wx.navigateTo({
       url: '../second_enter/second_enter',
     })
  }
})