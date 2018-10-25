// pages/main/main.js

import {URL,fly} from '../../url';
import { httpClient  } from '../../http';
var app = getApp();

import {foodList ,bankDetail ,classflyList ,bankNews} from '../../getData';

const { $Message} = require('../../iview/base/index');

import regeneratorRuntime from '../../regenerator-runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,

    URL:URL,
    btnList: [],
    interval: null,
    text:'',
    pace: 1.2, //滚动速度
    interval: 20, //时间间隔
    size: 24, //字体大小in px
    length: 0, //字体宽度
    offsetLeft: 0, //
    windowWidth: 0,
    items: ['基础信息完善', '证件信息完善', '基础设施','满减'] //店铺信息点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var app = getApp();
    // if(app.isMask()){
    //   return;
    // }
    var _this = this;
    this.initData();
   
  },

  async initMessage(){
    await bankNews('6',app.globalData.token).then(res => {
      if(res.code == 10000 && res.data.length != 0){
        $Message({
          content: `有${res.data.length}条提现通知，点击跳转`,
          selector:'#message',
          duration: 30
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.startMarquee();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
    this.initData();

    // $Message({
    //   content: '这是一条错误提醒',
    //   type: 'error',
    //   selector:'#message1'
    // });
    // $Message({
    //   content: '这是一条错误提醒',
    //   type: 'success',
    //   selector:'#message2'
    // });
  },

  async initData(){
    if(!app.login){
      return;
    }
    // httpClient.index({action_id:-1,token:app.globalData.token}).then(res => {
    //   if(res.data.data){

     
    //   this.setData({
    //   btnList:res.data.data
    //   })
    //   }
    // })
    
    await fly.post(URL.index,{action_id:-1,token:app.globalData.token}).then(res => {
      if(res.code == 10000){
        this.setData({
          btnList:res.data
        })
      }
    })
    this.initMessage();

    this.setData({
      loading:false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  goView(e){
    var that = this;
    var id = e.currentTarget.dataset.id+'',
    url="../order/order";
    switch (id) {
      case '1':
        url = "../order_management/order_management/order_management?actionid="+id; 
        wx.navigateTo({url: url});

      break;
      case '2': // 菜品管理相关
      foodList('2',app.globalData.token).then(res => {
          if(that.goNav(res.code) && res.data.length!=0){
            url = "../goodsmanagement/order/order?actionid="+id;
          }
          else if(that.goNav(res.code) &&  res.data.length ==0){
            url = "../goodsmanagement/goodManager/goodManager?actionid="+id;
          }else{
            url="";
          }
          wx.navigateTo({url: url});
        })
      break;
      case '3':
        url='../marktData/marktData'
        wx.navigateTo({url: url});
      break;
      case '4':
        url ="../verification/verification"
        wx.navigateTo({url: url});
      break;
      case '5':  // 预定管理
        url ='../reserve_management/reserve_management'
        wx.navigateTo({url: url});
      break;
      case '6':  // 提现
        bankDetail('6',app.globalData.token).then(res =>{
          console.log(res);
          if(that.goNav(res.code)){
            url = "../withdraw_manage/withdraw_main/withdraw_main?actionid="+id;
          }
          else{
            url = "../withdraw_manage/first_enter/first_enter?actionid=" + id;
          }
          wx.navigateTo({ url: url });
        })
        
      break;
      case '7':
        wx.navigateTo({url: '../notice/notice'});
      break;
      case '8':  // 优惠券
        fly.post(URL.countList,{action_id:'8',token:app.globalData.token}).then(res =>{
          if(that.goNav(res.code) && res.data.length != 0){
            url ="../coupon_management/coupon_list/coupon_list"
          }
          else if(that.goNav(res.code) &&  res.data.length ==0){
            url ="../coupon_management/empty_coupon/empty_coupon";
          }else{
            url="";
          }
          wx.navigateTo({url: url});
        })
       
      break;
      case '9':  // 相册
        fly.post(URL.imgsList,{action_id:'8',token:app.globalData.token}).then(res =>{
          if(that.goNav(res.code) && res.data.length>0){
            url = "../album/album/album"
          }
          else if(that.goNav(res.code) &&  res.data.length ==0){
            url = "../album/empty_album/empty_album"
          }else{
            url=""
          }
          wx.navigateTo({url: url,});
        })
       
      break;
      case '10':  // 店铺信息
        url='';
        this.open();
      break;
      case '11':
        classflyList('11',app.globalData.token).then(res =>{
          if(that.goNav(res.code) && res.data.length != 0){
            url = "../classification/classification_list/classification_list";
          }
          else if(that.goNav(res.code) &&  res.data.length ==0){
            url = "../classification/creat_classification/creat_classification";
          }
          else{
            url=""
          }
          wx.navigateTo({url: url});
        })
       
       
      break;
      case '12':  
        fly.post(URL.adminList,{action_id:'12',token:app.globalData.token}).then(res =>{
          if(that.goNav(res.code)){
            url ='../administrator/admin_list/admin_list'
          }else{
            url ='../administrator/empty_admin/empty_admin'
          }
          wx.navigateTo({url: url,});
        })
        
      break;
      case '13': //打印机
        fly.post(URL.putList,{action_id:'13',token:app.globalData.token}).then(res =>{
          if(that.goNav(res.code) &&  res.data.length !=0  ){
            url ='../printer_management/printer_list/printer_list'
          }else if(that.goNav(res.code) &&  res.data.length ==0){
            url ='../printer_management/empty_printer/empty_printer'
          }else{
            
            url="";
          }
          wx.navigateTo({url: url});
        })
       
      break;
      case '14':  // 二维码
        fly.post(URL.qrCodeList,{action_id:'14',token:app.globalData.token}).then(res =>{
          if(that.goNav(res.code) && res.data.items.length != 0  ){
            url ='../qrcode_management/qrcode_list/qrcode_list'
          }
          else if(that.goNav(res.code) &&  res.data.items.length == 0){
            url ='../qrcode_management/empty_qrcode/empty_qrcode'
          }
          else{
            
            url="";
          }
          wx.navigateTo({url: url});
        })
      break;
      case '15':
        url='../service/service'
        wx.navigateTo({url: url});
      break;
    
      default:
        break;
    }

   
  },

  goNav(code) {
    var code  = Number(code);
    var name = '';
    switch (code) {
      case 10000:
        return true;
      break;
      case 10001: 
       name ="失败";
      break;
      case 10002:
      name ="商户不存在";
      break;
      case 10003:
      name ="功能无权限";
      break;
      case 10004:
      name ="未登录,或已失效";
      break;
      case 10005:
      name ="用户添加失败";
      break;
      case 20001:
      name ="参数不全";
      break;
      case 30001:
      name ="已存在";
      break;
      case 30002:
      name ="微信code获取失败";
      break;
      case 30003:
      name ="没有token";
      break;
      case 30004:
      name ="没有搜索参数";
      break;
      case 30005:
      name ="没有订单编号";
      break;
      case 30006:
      name ="没有数据";
      break;
      case 30007:
      name ="没有标题";
      break;
      case 30008:
      name ="超出长度或大小范围";
      break;
      case 30009:
      name ="小于长度或大小范围";
      break;
      case 30010:
      name ="核销码不对";
      break;
      case 30011:
      name ="禁止登录";
      break;
    
      default:

        break;
    }
    wx.showToast({
      title: name,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    return false;
  },

  queryViewWidth: function(viewId) {
    //创建节点选择器
    return new Promise(function(resolve) {
      var query = wx.createSelectorQuery();
      //选择id
      var that = this;
      query.select('.' + viewId).boundingClientRect(function(rect) {
        resolve(rect.width);
      }).exec();
    });

  },
  //停止跑马灯
  stopMarquee: function() {
    var that = this;
    //清除旧的定时器
    if (that.data != null) {
      clearInterval(that.interval);
    }
  },
  //执行跑马灯动画
  excuseAnimation: function() {
    var that = this;
    //if (that.data.length > that.data.windowWidth) {
      //设置循环
      let interval = setInterval(function() {
        if (that.data.offsetLeft <= 0) {
          if (that.data.offsetLeft >= -that.data.length) {
            that.setData({
              offsetLeft: that.data.offsetLeft - that.data.pace,
            })
          } else {
            that.setData({
              offsetLeft: that.data.windowWidth,
            })
          }
        } else {
          that.setData({
            offsetLeft: that.data.offsetLeft - that.data.pace,
          })
        }
      }, that.data.interval);
    //}
  },
  //开始跑马灯
  startMarquee: function() {
    var that = this;
    that.stopMarquee();
    //初始化数据
    that.data.windowWidth = wx.getSystemInfoSync().windowWidth;
    that.queryViewWidth('text').then(function(resolve) {
      that.data.length = resolve;
      console.log(that.data.length + "/" + that.data.windowWidth);
      that.excuseAnimation();
    });
  },


  //id为10，店铺信息弹窗
  open: function () {
    var itemList = [];
    itemList = this.data.items;
    // console.log(itemList);
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#333333',
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          // wx.makePhoneCall({
          //   phoneNumber: itemList[res.tapIndex]
          // })
          if (res.tapIndex==0){
            wx.navigateTo({
              url: '../setting/basic_info/basic_info',
            })
          } else if (res.tapIndex == 1){
            wx.navigateTo({
              url: '../setting/certify_information/certify_information',
            })
          } else if (res.tapIndex == 2) {
            wx.navigateTo({
              url: '../setting/infrastructure/infrastructure',
            })
          } else if (res.tapIndex == 3) {
            wx.navigateTo({
              url: '../setting/full_reduction/full_reduction',
            })
          }
        }

      }
    });
  },
  gowithdraw(){
    wx.navigateTo({
      url: '../withdraw_manage/withdraw_main/withdraw_main',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})