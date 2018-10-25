// pages/order_management/order_management.js
import { httpClient } from '../../../http.js';
import regeneratorRuntime from '../../../regenerator-runtime/runtime';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,

    action_id: 1,
    //选项卡数据
    curSelect: 0,

    //搜索框
    inputShowed: false,
    inputVal: "",

    oD1 :[],
    oD2 :[],
    oD3 :[],
    oD4 :[],

    page1:1,
    page2:1,
    page3:1,
    page4:1,

    size:20,
    orderStatus: ['', '已完成', '待支付', '已取消', '等待商家处理', '已接单','拒绝接单']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //1 订桌 2：付款 3点餐 4：订餐
   
    var actionid =  options.actionid;
    this.setData({
      action_id:actionid
    })
   
    this.init();
  },

  async init(){
    this.setData({
      loading:true
    })
    var oD1,oD2,oD3,oD4;
    await httpClient.orderIndex({
      action_id:this.data.action_id,
      token:app.globalData.token,
      page:this.data.page1,
      size:20,
      type:1
    }).then(e =>{
      if(e.data.code == 10000){
        oD1= e.data.data.items;
        this.setData({
          oD1:oD1
        })
        console.log(oD1)
      }
    })

    await httpClient.orderIndex({
      action_id:this.data.action_id,
      token:app.globalData.token,
      page:this.data.page2,
      size:20,
      type:2
    }).then(e =>{
      if(e.data.code == 10000){
        if(e.data.code == 10000){
          oD2= e.data.data.items;
          this.setData({
            oD2:oD2
          })
        }
      }
    })

    await httpClient.orderIndex({
      action_id:this.data.action_id,
      token:app.globalData.token,
      page:this.data.page3,
      size:20,
      type:3
    }).then(e =>{
      if(e.data.code == 10000){
        if(e.data.code == 10000){
          oD3= e.data.data.items;
          this.setData({
            oD3:oD3
          })
        }
      }
    })



    await httpClient.orderIndex({
      action_id:this.data.action_id,
      token:app.globalData.token,
      page:this.data.page4,
      size:20,
      type:4
    }).then(e =>{
      if(e.data.code == 10000){
        if(e.data.code == 10000){
          oD4= e.data.data.items;
          this.setData({
            oD4:oD4
          })
        }
      }
   })

   this.setData({
     loading:false
   })
   
  },

  onReachBottom(){
    this.nextPage();
  },

  nextPage(){ //1 订桌 2：付款 3点餐 4：订餐
    var page,type;
    var tab = Number(this.data.curSelect);
    tab++;

    switch (tab) {
      case 1:
          page= this.data.page1;
          type= 3;
        break;
      case 2:
          page= this.data.page2;
          type= 4;
        break;
       
      case 3:
          page= this.data.page3;
          type=1;
          break;
      case 4:
          page= this.data.page4;
          type=2;
        break;
      default:
        break;
    }

    switch (type) {
      case 1:
          page= this.data.page1;
        break;
      case 2:
          page= this.data.page2;  
        break;
      case 3:
          page= this.data.page3;
          break;
      case 4:
          page= this.data.page4;
        break;
      default:
        break;
    }

    page++;
    httpClient.orderIndex({
      action_id:this.data.action_id,
      token:app.globalData.token,
      page:page,
      size:20,
      type:type
    }).then(e =>{
      if(e.data.code == 10000){
        if(e.data.code == 10000){
          switch (type) {
            case 1:
                this.setData({
                  oD1: oD1.push(...e.data.data.items),
                  page1: page
                })
              break;
            case 2:
                  this.setData({
                    oD2: oD2.push(...e.data.data.items),
                    page2: page
                  })
              break;
             
            case 3:
              this.setData({
                oD3: oD3.push(...e.data.data.items),
                page3: page
              })
                break;
            case 4:
                this.setData({
                  oD4: oD4.push(...e.data.data.items),
                  page4: page
                })
              break;
            default:
              break;
            }
        }
      }
   })

  
  },

  goDetail(e){ //1 订桌 2：付款 3点餐 4：订餐
    var type = e.currentTarget.dataset.type,
        ordernumber = e.currentTarget.dataset.ordernumber,
        url;
    switch (Number(type) )  {
      case 1:
        url="../../order_details/reserve_table/reserve_table";
        break;
      case 2:
        url="../../order_details/pay_bill/pay_bill";
        break;
      case 3:
        url="../../order_details/order_meal/order_meal";
          break;
      case 4:
       url="../../order_details/appoint_meal/appoint_meal";
        break;
      default:
        break;
    }

    wx.navigateTo({
      url: `${url}?ordernumber=${ordernumber}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //切换标签选项卡
  changeSelect(e) {
    var that = this;
    if (this.data.curSelect === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        curSelect: e.currentTarget.dataset.current
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
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  /**
  * 输入改变的回调函数
  */
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    // this.auto();
    console.log(this.data.inputVal, e);
  },
  searchOrder(e){
    console.log(e.detail.value);
    wx.navigateTo({
      url: '../../order_management/search_orders/search_orders?val='+ e.detail.value
    })
  }
})