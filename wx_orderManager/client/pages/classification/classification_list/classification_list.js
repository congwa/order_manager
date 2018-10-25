
import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';

import { classflyList ,classflyDel} from '../../../getData';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    list:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   loading:true
    // })
    // classflyList(actionId['11'],app.globalData.token).then(res =>{
    //   if(res.code == 10000){
    //     this.setData({
    //       list:res.data,
    //       loading:false
    //     })
    //   }
    // })
    // .catch(res =>{
    //   this.setData({
    //     loading:false
    //   })
    // })
  },

  init(){
    httpClient.classfly({action_id:actionId['11'],token:app.globalData.token}).then(e =>{
      if(e.data.code == 10000){
        this.setData({
          list:e.data.data,
          loading:false
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
      this.init();
  },
  set(e){
    wx.navigateTo({
      url: `../creat_classification/creat_classification?title=${e.target.dataset.title}&id=${e.target.dataset.id}&num=${e.target.dataset.num}`
    })
  },

  del(e){
    classflyDel('11',app.globalData.token,e.target.dataset.id).then(res=>{
      if(res.code == 10000){
        this.init();
      }
    })
  },
  goCreat(){
    wx.navigateTo({
      url: "../creat_classification/creat_classification"
    })
  }
})