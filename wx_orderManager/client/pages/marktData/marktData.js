// pages/marktData/marktData.js
var wxCharts = require('../../utils/wxcharts.js');
import {marketList ,marketMoney} from '../../getData.js';
import regeneratorRuntime from '../../regenerator-runtime/runtime';

var app = getApp();

var chart1 ,chart2;
var windowWidth = 400;

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

function Month(month) {
  var time = new Date();
  time.setDate(time.getDate());//获取Day天后的日期 
  var y = time.getFullYear();
  var m = time.getMonth() + month+1;//获取当前月份的日期 
  var d = time.getDate();
  return y + "-" + m + "-" + d;
}


var date = new Date();
var nYear = date.getFullYear();
var nMonth = date.getMonth()+1; //获取当前月份(0-11,0代表1月)
var nDay = date.getDate(); //获取当前日(1-31)
var eDate = nYear+'-'+ nMonth+'-'+nDay;
var n  = -6; //获取三个月之后的时间
var nDate = Month(n);


Page({

  /**
   * 页面的初始数据
   */
  data: {

    loading:true,

    nDate1:nDate, // 开始时间
    eDate1:eDate, // 结束时间

    nDate2:nDate, // 开始时间
    eDate2:eDate, // 结束时间

    currentTab:0,


    timeFrom1:'',  //订单
    timeto1:'',

    timeFrom2:'',  //营业额
    timeto2:'',

    time3:'',  //销售排行

    xData1:[], // x
    sData1:[], // y

    xData2:[],
    sData2:[],

    data3:[],
    money:'',

    curOrderSelect:0,
    listName:['昨天','近七天','上月','总排行']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
    } catch (e) {
        console.error('getSystemInfoSync failed!');
    }
    this.init();
  },

  async init(){

    await marketList('3', app.globalData.token,2,'').then(res =>{
      console.log(res);
      if(res.code == 10000){
        this.setData({
          xData1:Object.keys(res.data),
          sData1:Object.values(res.data)
        })
        this.setData({
          timeFrom1:this.data.xData1[0],
          timeto1:this.data.xData1[this.data.xData1.length-1]
        })
        console.log(this.data.xData1,this.data.sData1);
      }
    }).then(()=>{
      this.chart1();
    })


    await marketList('3', app.globalData.token,1,'').then(res =>{
      if(res.code == 10000){
        this.setData({
          xData2:Object.keys(res.data),
          sData2:Object.values(res.data)
        })
        this.setData({
          timeFrom2:this.data.xData2[0],
          timeto2:this.data.xData2[this.data.xData2.length-1]
        })
      }
    }).then(() =>{
      this.chart2();
    })

    //默认是昨天
    await marketList('3', app.globalData.token,3,'').then(res =>{
      if(res.code == 10000){
        this.setData({
          data3:res.data
        })
      }
    })
   

    await marketMoney('4', app.globalData.token).then(res => {
      if(res.code == 10000){
        this.setData({
          money:res.data
        })
      }
    })

    this.setData({
      loading:false
    })
  },




  chart1(){
    chart1 = new wxCharts({
      canvasId: 'lineCanvas1',
      type: 'line',
      categories: this.data.xData1,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '营销数据',
        data: this.data.sData1,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }
    ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min:0,
        max:5
      },
      width: windowWidth,
      height: 300,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

  },

  chart2(){
    chart2 = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'line',
      categories: this.data.xData2,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '订单',
        data: this.data.sData2,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }
    ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min:0,
        max:5
      },
      width: windowWidth,
      height:300,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },


  updateData1: function () {
    var series = [{
        name: '营销数据',
        data: this.data.sData1,
        format: function (val, name) {
            return val.toFixed(2) + '万';
        }
    }];
    chart1.updateData({
        categories:  this.data.xData1,
        series: series
    });
  },

  updateData2: function () {

    var series = [{
        name: '订单',
        data: this.data.sData2,
        format: function (val, name) {
            return val.toFixed(2) + '万';
        }
    }];
    chart2.updateData({
        categories: this.data.xData2,
        series: series
    });
  },

  bindDateFrom1(e){
    var fTime = e.detail.value;
    var tTime = this.data.timeto1;
    var time = [fTime,tTime].join(',');
    marketList('3', app.globalData.token,1,time).then(res =>{
      console.log(res);
      if(res.code == 10000){
        this.setData({
          xData1:Object.keys(res.data),
          sData1:Object.values(res.data)
        })
        this.setData({
          timeFrom1:this.data.xData1[0],
          timeto1:this.data.xData1[this.data.xData1.length-1]
        })
       
      }
    }).then(()=>{
      this.updateData1();
    })
    this.setData({
      timeFrom1:e.detail.value
    })
  },

  bindDateTo1(e){
    var fTime = this.data.timeFrom1;
    var tTime = e.detail.value;
    var time = [fTime,tTime].join(',');
    marketList('3', app.globalData.token,1,time).then(res =>{
      console.log(res);
      if(res.code == 10000){
        this.setData({
          xData1:Object.keys(res.data),
          sData1:Object.values(res.data)
        })
        this.setData({
          timeFrom1:this.data.xData1[0],
          timeto1:this.data.xData1[this.data.xData1.length-1]
        })
       
      }
    }).then(()=>{
      this.updateData1();
    })
    this.setData({
      timeto1:e.detail.value
    })
  },

  bindDateFrom2(e){
    var fTime = e.detail.value;
    var tTime = this.data.timeto2;
    var time = [fTime,tTime].join(',');
    marketList('3', app.globalData.token,2,time).then(res =>{
      console.log(res);
      if(res.code == 10000){
        this.setData({
          xData1:Object.keys(res.data),
          sData1:Object.values(res.data)
        })
        this.setData({
          timeFrom2:this.data.xData2[0],
          timeto2:this.data.xData2[this.data.xData2.length-1]
        })
        
      }
    }).then(()=>{
      this.updateData2();
    })
    this.setData({
      timeFrom2:e.detail.value
    })
  },

  bindDateTo2(e){
    var fTime = this.data.timeFrom2;
    var tTime = e.detail.value;
    var time = [fTime,tTime].join(',');
    marketList('3', app.globalData.token,2,time).then(res =>{
      console.log(res);
      if(res.code == 10000){
        this.setData({
          xData1:Object.keys(res.data),
          sData1:Object.values(res.data)
        })
        this.setData({
          timeFrom2:this.data.xData2[0],
          timeto2:this.data.xData2[this.data.xData2.length-1]
        })
       
      }
    }).then(()=>{
      this.updateData2();
    })
    this.setData({
      timeto2:e.detail.value
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

  reDrawChart(){
    switch (Number(this.data.currentTab)) {
      case 0:
        this.chart1();
        break;
        case 1:
        this.chart2();
        break;
    
      default:
        break;
    }
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.reDrawChart();
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if(e.target.dataset.current){
        that.setData({
          currentTab: e.target.dataset.current
        })
      }
    }
    this.reDrawChart();
  },

  // 点击切换
  clickChange: function(e){
    var that = this;
    that.setData({
      curOrderSelect: e.target.dataset.current
    })
    this.getData3(e);
  },

  getData3: function(e){
    marketList('3', app.globalData.token,3,this.data.curOrderSelect+1).then(res =>{
      if(res.code == 10000){
        this.setData({
          data3:res.data
        })
      }else{
        this.setData({
          data3:[]
        })
      }
    }).catch(res =>{
      this.setData({
        data3:[]
      })
    })
  }
})