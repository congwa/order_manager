import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
import regeneratorRuntime from '../../../regenerator-runtime/runtime';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    //选项卡数据
    curSelect: 0,
    
    yData:[], // 已经过期
    nData:[], //未过期,
    tHeight:'',
    bHeight:'',
    windowHeight:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.init();
  },
  async init(){
    this.setData({
      loading:true
    })
    await httpClient.countList({
      action_id:actionId['8'],
      token: app.globalData.token,
      type:1
    }).then(e => {
      if(e.data.code == 10000){
        this.setData({
          yData:e.data.data
        })
      }
    })

    await httpClient.countList({
      action_id:actionId['8'],
      token: app.globalData.token,
      type:2
    }).then(e => {
      if(e.data.code == 10000){
        this.setData({
          nData:e.data.data
        })
      }
    })
    this.setData({
      loading:false
    })
   
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight - (res.windowWidth / 750) * 94 -89+ "px"
        })
      }
    })
    var demo = wx.createSelectorQuery();//选择id
    demo.select('.tab_menu').boundingClientRect();
    demo.exec(function (res) {  
      // console.log('打印demo的元素的信息',res);  
      // console.log('打印高度',res[0].height); //40

      that.setData({
        tHeight:res[0].height 
      })
    })
    

    var demo1 = wx.createSelectorQuery();//选择id
    demo1.select('.add_btn').boundingClientRect();
    demo1.exec(function (res) {
      // console.log('打印demo1的元素的信息', res);
      // console.log('打印高度', res[0].height);//49
      that.setData({
        bHeight: res[0].height
      })
    })
    console.log(that.data.tHeight, that.data.bHeight, that.data.windowHeight)
  },
  del(e){
    httpClient.countDel({
      action_id:actionId['8'],
      token: app.globalData.token,
      id: e.target.dataset.id
    }).then(res =>{
      if(res.data.code == 10000){
        this.init();
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
    
  },
  //切换标签选项卡
  changeSelect(e) {
    var that = this;
    if (this.data.curSelect === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        curSelect: e.currentTarget.dataset.current,
      })
      
    }
  },
  // 滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      curSelect: e.detail.current 
    });
  },
  goCreat() {
    wx.navigateTo({
      url: '../creat_coupon/creat_coupon',
    })
  }
})