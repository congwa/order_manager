
import { httpClient } from '../../http.js';
import {actionId} from '../../url';
import { confirmList ,confirmTo } from '../../getData';
const { $Toast } = require('../../iview/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索框
    inputVal:'',
    inputShowed: false,
    sState:false, //是否为搜寻状态
    page:1,
    size:20,
    cData:[],
    sData:[], // 搜寻的状态的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.init();
  },

  init(){
    httpClient.confirmList({
      action_id: actionId['4'],
      token: app.globalData.token,
      page: this.data.page,
      size:  this.data.size
    }).then(e =>{
      if(e.data.code == 10000){
        this.setData({
          cData:e.data.data.items
        })
      }
    })
  },
  onReachBottom(){
    this.nextPage();
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

  nextPage(e){
    var page = this.data.page;
    page++;
    confirmList(actionId['4'],app.globalData.token,page,size).then(res => {
      if(res.code == 10000){
        this.setData({
          cData:cData.push(...res.data.items),
          page:page
        })
      }
    })
  },

  searchOrder: function(){
    confirmTo(actionId['4'],app.globalData.token,this.data.inputVal).then(res => {
      if(res.code == 10000){
        // this.setData({
        //  //sData: res.data.items,
        //  // sState:true
        // })
        $Toast({
          content: '核销成功',
          type: 'success',
          mask:true
        });
       
        this.init();
      }
    })
  },

  inputTyping: function(e){
    this.setData({
      inputVal: e.detail.value
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
      inputShowed: false,
     // sState:false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  }
})