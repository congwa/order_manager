
import { httpClient } from '../../http.js';
import { actionId } from '../../url';
import regeneratorRuntime from '../../regenerator-runtime/runtime';
var app = getApp();

Page({
  // 预定是5
  aType:'5',
  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    windowHeight:500,
    //选项卡数据
    curSelect: 0,


    yPage:1,
    nPage:1,
    size:20,
    // yes or no
   
    yData:[],
    nData:[],
    isShow:false,
    iscancle:false,
    reason:'请选择',
    items: ['餐厅位置已满', '餐厅今日休息', '其它'] //店铺信息点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 给siper的高度
    wx.getSystemInfo({
      success:function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
        that.setData({
          windowHeight:windowHeight-80
        })
      }
    }) 
  
    this.init();


  },

  async init(){
    await httpClient.reserveList({
      action_id	:actionId[this.data.aType],
      token : app.globalData.token,
      page : this.data.yPage,
      size	: this.data.size,
      status	: this.data.curSelect+1
    }).then(e => {
      if(e.data.code == 10000){
        this.setData({
          yData:e.data.data.items
        })
      }
    })

    await httpClient.reserveList({
      action_id	:actionId[this.data.aType],
      token : app.globalData.token,
      page : this.data.nPage,
      size	: this.data.size,
      status	: this.data.curSelect+2
    }).then(e => {
      if(e.data.code == 10000){
        this.setData({
          nData:e.data.data.items
        })
      }
    })

    this.setData({
      loading:false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onReachBottom(){
    this.nextPage();
  },

  nextPage(){
    switch(this.data.curSelect){
      case 0:
        var page = this.data.yPage;
        page++;
        httpClient.reserveList({
          action_id	:actionId[aType],
          token : app.globalData.token,
          page : page,
          size	: this.data.size,
          status	: 1
        }).then(e => {
          if(e.data.code == 10000){
            this.setData({
              yData:e.data.data.items,
              yPage:page
            })
          }
        })
      break;
      case 1:
        var page = this.data.nPage;
        page++;
        httpClient.reserveList({
          action_id	:actionId[aType],
          token : app.globalData.token,
          page : page,
          size	: this.data.size,
          status	: 2
        }).then(e => {
          if(e.data.code == 10000){
            this.setData({
              nData:e.data.data.items,
              nPage:page
            })
          }
        })
      break;
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  reject(e){
    this.setData({
      iscancle:false
    })
    httpClient.operate({
      action_id: actionId[this.data.aType],
      token    : app.globalData.token,
      order_number: e.target.dataset.ordernumber,
      status	 : 2,
      bak:this.data.reason
    }).then(e => {
      if(e.data.code == 10000){
        wx.showLoading({
          title: '已经拒绝',
          mask: true,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        this.onLoad();
      }
    })
  },

  rejectMask(e){
    this.setData({
      iscancle:true
    })
  },


  resolve(e){
    httpClient.operate({
      action_id: actionId[this.data.aType],
      token    : app.globalData.token,
      order_number: e.target.dataset.ordernumber,
      status	 : 1,
      bak:''
    }).then(e => {
      if(e.data.code == 10000){
        wx.showLoading({
          title: '已经接受',
          mask: true,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        this.onLoad();
      }
    })
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
  goCreat() {
    wx.navigateTo({
      url: '../creat_coupon/creat_coupon',
    })
  },
  open: function () {
    var itemList = [];
    itemList = this.data.items;
    var that=this;
    // console.log(itemList);
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#666666',
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            that.setData({
              reason:'餐厅位置已满'
            })
          } else if (res.tapIndex == 1) {
            that.setData({
              reason: '餐厅今日休息'
            })
          } else if (res.tapIndex == 2) {
             that.setData({
               isShow:true
             })
          }
        }

      }
    });
  },
  changeReason(e){
    if(!e.detail.value){
      this.setData({
        reason: e.detail.value
      })
    }else{
      this.setData({   
        reason: 请选择
      })
    }
    
  }
})
