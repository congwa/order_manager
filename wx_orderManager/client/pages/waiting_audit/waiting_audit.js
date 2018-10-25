
import {enterList} from '../../getData';
var app = getApp();
var types = ['default', 'primary', 'warn']

var pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  onPullDownRefresh() {

    wx.showNavigationBarLoading(); //在标题栏中显示加载
    enterList('-1',app.globalData.token).then(res => {
      console.log('查看是否入驻',res);
      var data = res.data;
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading(); //完成停止加载
      if(res.code ==10000 && data.role == 1 && data.status == 4){ //店长  // 审核拒绝
        wx.redirectTo({
          url: '../refuse_audit/refuse_audit'
        });
      }
      if(res.code ==10000&& data.role == 1 && data.status ==1 ){ //正常情况  //店主已经注册
        wx.redirectTo({
          url: '../main/main'
        });
      }
    })
    
  },
  onShow(){
    enterList('-1',app.globalData.token).then(res => {
      console.log('查看是否入驻',res);
      var data = res.data;
      
      if(res.code ==10000 && data.role == 1 && data.status == 4){ //店长  // 审核拒绝
        wx.redirectTo({
          url: '../refuse_audit/refuse_audit'
        });
      }
      if(res.code ==10000&& data.role == 1 && data.status ==1 ){ //正常情况  //店主已经注册
        wx.redirectTo({
          url: '../main/main'
        });
      }
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
}

for (var i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function (e) {
      var key = type + 'Size'
      var changedData = {}
      changedData[key] =
        this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  })(types[i])
}

Page(pageObject)