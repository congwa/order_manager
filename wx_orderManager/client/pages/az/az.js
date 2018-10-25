
var app = getApp();
import {enterList} from '../../getData';
Page({
  data: {
    show:false,
    showNum:false,
    path:'',
    loading:true
  },
  onLoad: function (options) {
    // this.setData({
    //   path:options.argu
    // })

    var _this = this;
    var app = getApp();
    this.setData({
      app:app
    })

    wx.getSetting({
      success: function (res) {
          if (res.authSetting['scope.userInfo']) {
              app.authorizeUserInfo = 2;
              // 已经授权直接进行登录
              // 进行自动登陆
              app.bindGetUserInfo().then(e => {
              
                  app.login = true;
                  _this.goBack(e);
              });
          } else { //没有进行授权那么显示让用户进行点击授权
              app.login = false;
              app.authorizeUserInfo = 1;
              _this.setData({
                show:true,
                loading:false
              })
          }

          // // 授权登陆
          // if(!app.login && app.authorizeUserInfo == 1){ //没有授权登录
          //   _this.setData({
          //     show:true,
          //     loading:false
          //   })
          // }else if(app.authorizeUserInfo == 2){ //授权了登录  让用户继续授权手机号  （授权手机号功能暂时不用）
          //   _this.setData({
          //     showNum:true,
          //     loading:false
          //   })
          //   if(app.login && !app.showNum ){
          //     _this.goBack();
          //   }
          // }
      }
    })
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权直接进行登录
    //       _this.bindGetUserInfo();
    //     }else{ //没有进行授权那么显示让用户进行点击授权
    //       _this.setData({
    //         show:false
    //       })
    //     }
    //   }
    // })

    //判断哪些东西授权了  authorizeUserInfo 1标识未授权 2表示授权了
   
  },
  /**
   * 跳转回到之前的页面
   */
  goBack(e){
    var _this = this;
    // switch(argu.type){
    //   case tabBar.on:
    //     wx.switchTab({
    //       url: '../az/az?path='+argu,
    //       success: (result)=>{
            
    //       },
    //       fail: ()=>{},
    //       complete: ()=>{}
    //     });
    //   break;
    //   case tabBar.off:
    //   break;
    // }
    // wx.navigateBack({
    //   delta: 1
    // });
    if(app.login && app.authorizeUserInfo == 2 && e != '1'){
      this.setData({
        loading:false,
        showNum:true
      })
      return;
    }
    enterList('-1',app.globalData.token).then(res => {
      console.log('查看是否入驻',res);
      var data = res.data;
      if(res.code ==10000&& data.role == 1 && data.status ==1 ){ //正常情况  //店主已经注册
        wx.redirectTo({
          url: '../main/main'
        });
      }
      else if(res.code ==10000&& res.data.role == 2){ //一定没有注册 游客
        wx.redirectTo({ url: '../before_az/before_az' });
      }
      else if(res.code ==10000 && res.data.role == 3){ // 店员已经审核 直接进入
        wx.redirectTo({
          url: '../main/main'
        });
      } // 店员
      else if(res.code ==10000 && data.role == 1 && data.status == 2){ //店长 // 已经删除
        wx.redirectTo({
          url: '../before_az/before_az'
        });
      }
      else if(res.code ==10000 && data.role == 1 && data.status == 3){ //店长 // 待审核
        wx.redirectTo({
          url: '../waiting_audit/waiting_audit'
        });
      }
      else if(res.code ==10000 && data.role == 1 && data.status == 4){ //店长  // 审核拒绝
        wx.redirectTo({
          url: '../refuse_audit/refuse_audit'
        });
      }
      else{
        wx.redirectTo({ url: '../register/register' });
      }
      // wx.redirectTo({ url: '../main/main' });
    })
  },
  
  /**
   * 触发
   */
  onMyEvent(){
    this.goBack();
    console.log(app.login,app.authorizeUserInfo,app.showNum);
  },

  onMyIphone(){
    app.authorizeUserInfo = 3;  // 手机号和用户信息都已经授权
    this.goBack();
    console.log(app.login,app.authorizeUserInfo,app.showNum);
  }
})
