
import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pData:[],
    typeName:['','飞鹅','易联云'],
    liType:['','WIFI','GPRS']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init(){
    httpClient.putList({action_id:actionId['13'],token:app.globalData.token}).then(e=>{
      if(e.data.code == 10000){
        this.setData({
          pData:e.data.data
        })
      }
    })

  },
  del(e){
    httpClient.putDel({
      action_id:actionId['13'],
      token:app.globalData.token,
      id:e.target.dataset.id
    }).then(e =>{
      if(e.data.code == 10000){
        this.init();
      }
    })
  },

  goCreat(){
    wx.navigateTo({
      url: '../add_printer/add_printer',
    })
  }
})
