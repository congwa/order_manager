// pages/printer_management/add_printer/add_printer.js
import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
import {checkMobile } from '../../../utils/util'
const { $Toast } = require('../../../iview/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
   
    line_type:1,
    sn:'',

    number:'',
    nErr:false,

    phone:'',
    pErr:false,


    title:"",   //标题
    tErr:false,

    key:'',  // 打印机标识
    kErr:''
  },

  radioChange(e){
    this.setData({
      type:e.detail.value
    })
  },

  radioChange2(e){
    this.setData({
      line_type:e.detail.value
    })
  },

  // 手机号
  setNumber(e){
    this.setData({
      number:e.detail.value
    })
  },

  // 标题
  setTitle(e){
    this.setData({
      title:e.detail.value
    })
  },

  setKey(e){
    this.setData({
      key:e.detail.value
    })
  },

  setSn(e){
    this.setData({
      sn:e.detail.value
    })
  },

  setIphone(e){
    this.setData({
      phone:e.detail.value
    })
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

  check(){
    if(!this.data.number){
      $Toast({
        content: '请输入正确的打印份数',
        type: 'error',
        mask:true
      });
      return false;
    }
   
    if(!this.data.title){
      $Toast({
        content: '请输入标题',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.sn){
      $Toast({
        content: '请输入打印机sn',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.key){
      $Toast({
        content: '请输入打印机终端号或者编号',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!checkMobile(this.data.phone)){
      $Toast({
        content: '不是完整的11位手机号或者正确的手机号前七位',
        type: 'error',
        mask:true
      });
      return false;
    }
    return true;
  },

  goEdit(){
    if(!this.check()){
      return;
    }
    httpClient.putAdd({
      action_id: actionId['13'],
      token	   : app.globalData.token,
      title	   : this.data.title,
      key      : this.data.key,
      type	   : this.data.type,
      phone	   : this.data.phone,
      line_type: this.data.line_type,
      sn		   : this.data.sn,
      number   : this.data.number
    }).then(e =>{
      if(e.data.code == 10000){
        wx.showLoading({
          title: '添加成功',
          mask: true,
          success: (result)=>{
            wx.redirectTo({
              url: '../printer_list/printer_list',
            })
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
    })

   
  }
})