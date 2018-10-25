
import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  goCreat(){
    wx.redirectTo({
      url: '../creat_coupon/creat_coupon'
    });
  }
 
})