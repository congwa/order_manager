import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
var app = getApp();
const { $Toast } = require('../../../iview/base/index');

//获取下一个月的时间
function getNMonth(nYear,nMonth,nDay,n) {
  var d = new Date(nYear, nMonth, nDay);
  d.setMonth(d.getMonth() + n);
  var yy1 = d.getFullYear();
  var mm1 = d.getMonth()+1;//因为getMonth（）返回值是 0（一月） 到 11（十二月） 之间的一个整数。所以要给其加1
  var dd1 = d.getDate();
  if (mm1 < 10 ) {
      mm1 = '0' + mm1;
  }
  if (dd1 < 10) {
    dd1 = '0' + dd1;
  }
  return yy1 + '-' + mm1 + '-' + dd1;
}

var date = new Date();
var nYear = date.getFullYear();
var nMonth = date.getMonth()+1; //获取当前月份(0-11,0代表1月)
var nDay = date.getDate(); //获取当前日(1-31)
var nDate = nYear+'-'+ nMonth+'-'+nDay;
var n  = 3; //获取三个月之后的时间
var eDate = getNMonth(nYear,nMonth,nDay,n);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nDate: nDate,
    eDate: eDate,  //结束时间
    title:'',
    price:'',
    full_price:'',
    number:'',
    start_time:'',
    end_time:''
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
  setTitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  setPrice(e){
    this.setData({
      price:e.detail.value
    })
  },
  setFullPrice(e){
    this.setData({
      full_price:e.detail.value
    })
  },
  setNumber(e){
    this.setData({
      number:e.detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      start_time:e.detail.value
    })
  },
  bindDate2Change(e){
    if(!this.data.start_time){
      $Toast({
        content: '请先选择开始时间',
        type: 'error',
        mask:true
      });
      return false;
    }
    this.setData({
      end_time:e.detail.value
    })
  },

  check(){
    if(!this.data.title){
      $Toast({
        content: '请输入正确的标题',
        type: 'error',
        mask:true
      });
      return false;
    }

    if(!this.data.price){
      $Toast({
        content: '请输入正确的优惠金额',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.full_price){
      $Toast({
        content: '请输入正确的使用条件',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(Number(this.data.price) > Number(this.data.full_price)){
      $Toast({
        content: '优惠金额不能大于使用条件',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.number){
      $Toast({
        content: '请输入正确的数量',
        type: 'error',
        mask:true
      });
      return false;
    }

    

    if(!this.data.start_time){
      $Toast({
        content: '请输入正确的开始时间',
        type: 'error',
        mask:true
      });
      return false;
    }

    
    if(!this.data.end_time){
      $Toast({
        content: '请输入正确的结束时间',
        type: 'error',
        mask:true
      });
      return false;
    }
    
    return true;
  },

  goList(){
    if(!this.check()){
      return;
    }
    httpClient.countEdit({
      action_id : actionId['8'],
      token     : app.globalData.token,
      title     : this.data.title,
      price     : this.data.price*100,
      full_price: this.data.full_price*100,
      number    : this.data.number,
      start_time: this.data.start_time,
      end_time  : this.data.end_time
    }).then(e =>{
      if(e.data.code == 10000){
        console.log('添加优惠券成功');
        wx.redirectTo({
          url: '../coupon_list/coupon_list',
        })
      }
    }).catch(e =>{
      $Toast({
        content: e.msg,
        type: 'error',
        mask:true
      });
    })
   
  }
})