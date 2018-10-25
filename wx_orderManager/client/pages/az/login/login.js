// pages/component/login/login.js

import {httpClient} from '../../../http';
import { setPhone } from '../../../getData';
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    showNum:{
      type:Boolean,
      value:false,
      observer: '_propertyChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _propertyChange(){
      wx.showToast({
        title: '验证中',
      });
 
    },
    bindGetUserInfo(e){
      app.bindGetUserInfo(e).then((res)=>{
        this.setData({
          show:true
        })
        this.triggerEvent('myevent', {})
      })
    },
    getPhoneNumber(e){
      var _this =  this;
      console.log(e);
      app.showNum = true;
      this.setData({
        showNum:true
      })
      wx.login({
        success: res =>{
          var code = res.code;//登录凭证
          setPhone(app.globalData.token,'-1',code,e.detail.iv,e.detail.encryptedData).then(res =>{
            _this.triggerEvent('myiphone',{});
          })
        }})
    }
  },

  
})
