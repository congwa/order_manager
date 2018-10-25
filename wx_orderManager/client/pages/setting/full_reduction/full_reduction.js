import { URL, fly, actionId } from '../../../url.js';
const { $Toast } = require('../../../iview/base/index');
import { decreaseEdit, decreaseDetails, decreaseDel } from '../../../getData.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dis_data: [],
    price: 0,
    pull_price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init() {
    decreaseDetails('10', app.globalData.token).then(res => {
      console.log(res);
      this.setData({
        dis_data: res.data
      })
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
  goEdit() {
    decreaseEdit('10', app.globalData.token, this.data.price * 100, this.data.pull_price * 100).then(res => {
      console.log(res);
      if (res.code == 10000) {
        this.init();
      }
    })
  },
  //获取满多少金额
  changePrice(e) {
    this.setData({
      price: Number(e.detail.value)
    })
    // console.log(this.data.price);
  },
  //获取减多少金额
  changePullprice(e) {
    if (Number(e.detail.value) > this.data.price) {
      wx.showToast({
        title: '金额有误',
        icon: 'none'
      })
    }
    this.setData({
      pull_price: Number(e.detail.value)
    })
    console.log(this.data.pull_price);
  },
  //删除按钮
  godelete(e) {
    console.log(e.target.id);
    decreaseDel('10', app.globalData.token, e.target.id).then(res => {
      console.log(res);
      if (res.code == 10000) {
        wx.showModal({
          title: '删除成功',
          content: '',
        })
        this.init();
      }
    })
  }
})