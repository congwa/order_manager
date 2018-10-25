
import { actionId } from '../../../url.js';

import { baseLists, baseInfo, baseEdit } from '../../../getData.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: [],
    rulesNames: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
  init() {
    baseLists('10', app.globalData.token).then(res => {
      console.log(res);
      var rule = new Array(res.data.length);
      for (var i = 0; i < rule.length; i++) {
        rule[i] = false;
      }
      this.setData({
        rulesNames: res.data,
        rules: rule
      })
    })
    baseInfo('10', app.globalData.token).then(res => {
      console.log(res);
      for (var key in this.data.rulesNames) {
        for (var j = 0; j < res.data.length; j++) {
          if (this.data.rulesNames[key].id == res.data[j]) {
            this.data.rules[key] = true;
          }
        }
      }
      this.setData({
        rules: this.data.rules
      })
    })
  },
  setRules(e) {
    var index = e.target.dataset.idx;
    this.data.rules[index] = !this.data.rules[index];
    this.setData({
      rules: this.data.rules
    })
  },
  goEdit() {
    var arr = [];
    this.data.rules.forEach((ele, index) => {
      if (ele) {
        arr.push(this.data.rulesNames[index].id)
      }
    })
    baseEdit('10', app.globalData.token, arr.join(',')).then(res => {
      console.log(res);
    })
  }
})