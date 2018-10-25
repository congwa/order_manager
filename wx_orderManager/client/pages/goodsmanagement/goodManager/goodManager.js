// pages/goodManager/goodManager.js
import {classflyList } from '../../../getData.js';
const { $Toast } = require('../../../iview/base/index');
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
    classflyList('2',app.globalData.token).then(res => {
      if(res.code == 10000 && res.data.length!=0){
        wx.redirectTo({
          url: '../creatfood/creatfood',
        })
      }else{
        $Toast({
          content: '您还没添加菜品分类，请先去添加菜品分类，再进行下一步操作！',
          type: 'error',
          mask:true
        });
      }
    })
  
  }
})