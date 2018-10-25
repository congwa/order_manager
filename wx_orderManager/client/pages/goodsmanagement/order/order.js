// pages/order/order.js
const { $Toast } = require('../../../iview/base/index');
import { httpClient } from '../../../http.js';
import { actionId } from '../../../url';
import regeneratorRuntime, { async } from '../../../regenerator-runtime/runtime';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    windowHeight:500,
    aType:'2',
    page:1,
    size:20,
    data:'',
    curOrderSelect:'',
    curSelect:'',
    leftShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success:function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
        that.setData({
          windowHeight:windowHeight-200
        })
      }
    }) 
    this.init();
  },

  async init(){
    this.setData({
      loading:true
    })
    await httpClient.food({
      action_id:actionId['2'],
      token:app.globalData.token,
      page:this.data.page,
      size:this.data.size
    }).then(e =>{
      if(e.data.code == 10000){
        var one = this.data.curOrderSelect;
        for(var i in e.data.data){
          if(!one){
            one = i;
          }
          for(let j=0;j<e.data.data[i].length;j++){
            e.data.data[i][j].expand?e.data.data[i][j]['expandespc'] = e.data.data[i][j].expand.join(','):'';
            e.data.data[i][j]['select'] = false;
          }
        }
        this.setData({
          data:e.data.data,
          curOrderSelect:one,
          curSelect:one
        })
      }
    })
    this.setData({
      loading:false
    })
  },

  bindScroll(e){
    var _this = this;
    var height;
    wx.createSelectorQuery().select('.des_type').fields({size:true},(res)=>{
      height = res.height;
      console.log(height)
    }).exec();
    wx.createSelectorQuery().selectAll('.right_tab').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'],
      computedStyle: ['margin', 'backgroundColor']
    },function(res){
      res.reduce((value,curValue,i)=>{
        var sum = value + curValue.height;
        var curTop = height?e.detail.scrollTop+height+5:e.detail.scrollTop+25;
        if(curTop<sum  &&curTop>value){
          if(res[i]){
            // if(_this.data.curOrderSelect !=res[i].dataset.cid ){
              _this.setData({
                curSelect:res[i].dataset.cid
              })
            // }
       
            console.log(res[i].dataset.cid);
          }
        }
        return sum;
      },0)
    }).exec()
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

  clickTab(e){
    this.setData({
      curOrderSelect:e.target.dataset.cname,
      curSelect:e.target.dataset.cname
    })
  },

  /**
   * 管理按钮
   */
  btnManager: function(e) {
    this.setData({
      leftShow:!this.data.leftShow
    })
  },

  //  单个选择
  handleAnimalChange(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var cName = e.currentTarget.dataset.cname;
    var data = this.data.data;
    data[cName][index].select = !data[cName][index].select;
    this.setData({
      data:this.data.data
    })
  },
  
  // 全选按钮
  btnAll(e){
    var data = this.data.data;
    for(var i in data){
      var food = data[i];
      for(let j=0;j<food.length;j++){
        food[j].select = true;
      }
    }
    this.setData({
      data:this.data.data
    })
  },

  // 删除按钮
  btnDel(e){
    var delArray = [];
    var data = this.data.data;
    for(var i in data){
      var food = data[i];
      for(let j=0;j<food.length;j++){
        if(food[j].select){
          delArray.push(food[j].id);
          //food.splice(j,1);
        }
      }
    }
    httpClient.foodDel({
      action_id:this.data.aType,
      token:app.globalData.token,
      id:delArray.join(',')
    }).then(e => {
      if(e.data.code == 10000){
        for(var i in data){
          var food = data[i];
          for(let j=0;j<food.length;j++){
            if(food[j].select){
              food.splice(j,1);
            }
          }
        }
        this.setData({
          data:this.data.data
        })
      }
    })
  },

  // select(e){
  //   var id = e.target.dataset.id;
  //   console.log('选中了:', id);
  //   var food = this.search(id);
  //   if(food){
  //     food.select = !food.select;
  //     this.setData({
  //       data:this.data.data
  //     })
  //   }
  // },

  // search(id){
  //   var data = this.data.data;
  //   for(var i in data){
  //     var food = data[i];
  //     for(let j=0;j<food.length;j++){
  //       if(food[j].id == id){
  //         return food[j];
  //       }
  //     }
  //   }
  //   return false;
  // },

  btnEdit(e){

  },

  addFooter(e){

  },
  goCreat(){
    wx.navigateTo({
      url: '../creatfood/creatfood'
    })
  },
  goCreatbyId(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../creatfood/creatfood?id='+id
    })
  }
})