

import {qrCodeEdit,qrCodeTemplet} from '../../../getData';
import drawQrcode from '../../../qrcode/weapp.qrcode.esm.js';
const { $Toast } = require('../../../iview/base/index');
var app = getApp();

Page({


  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    sortList: ['橘色温暖', '绿色清新', '小橘简洁', '橘色温暖', '绿色清新', '小橘简洁'],
    list:[],
    sort:"",
    tabNumber:'', // 桌号
    templet_id:'', // 模板id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init(){
    qrCodeTemplet('14',app.globalData.token).then(res =>{
      let sortList = [];
      res.data.forEach(element => {
        sortList.push(element.title);
      });
      this.setData({
        list:res.data,
        sortList:sortList,
        templet_id:res.data[0].id
      })
      console.log('sortList',sortList);
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      sort: this.data.list[e.detail.value].id,
      templet_id: this.data.list[e.detail.value].id
    })
  },
  setNumber(e) {
    var str = e.detail.value;
    if (escape(str).indexOf( "%u" )<0){
      this.setData({
        tabNumber:e.detail.value
      })
    } else {
      $Toast({
        content: '亲，桌号中不能有中文！',
        type: 'warning',
        mask:true
      });   
    }
  },

  check(){
    if(!this.data.tabNumber){
      $Toast({
        content: '请输入桌号',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.templet_id){
      $Toast({
        content: '请选择模板',
        type: 'error',
        mask:true
      });
      return false;
    }
    return true;
  },

  submit(){
    if(!this.check()){
      return false;
    }
    qrCodeEdit('14',app.globalData.token,this.data.tabNumber,this.data.templet_id).then(res =>{
      if(res.code == 10000){
        // $Toast({
        //   content: '成功',
        //   type: 'success',
        //   mask: true
        // });
        wx.redirectTo({
          url: '../qrcode_list/qrcode_list',
        })
      }else{
        $Toast({
          content: res.msg,
          type: 'error',
          mask:true
        });
      }
    }).catch(e => {
      $Toast({
        content: e.msg,
        type: 'error',
        mask:true
      });
    })
    // 现在接口还没通
    // wx.navigateTo({
    //   url: '../qrcode_list/qrcode_list',
    // })
  }


  // draw(){
  //   var ctx = wx.createCanvasContext('code');
  //   ctx.drawImage('../../../img/code_back.png', 0, 0, 1913,1346);
  //   ctx.drawImage(this.data.qrCode,84,22,200,200);
  //   ctx.setFontSize(120);
  //   ctx.setFillStyle('#FFFFFF')
  //   ctx.fillText('08', 20, 80);
  //   ctx.draw();
  // },

  // // 生成预览二维码
  // goEdit() {
  //   var _wx = wx,_this = this;
  //   drawQrcode({
  //     width: 200,
  //     height: 200,
  //     canvasId: 'myQrcode',
  //     text: 'www.baidu.com',
  //     callback: () =>{
  //       _wx.canvasToTempFilePath({
  //         x: 0,
  //         y: 0,
  //         width: 200,
  //         height: 200,  
  //         destWidth: 200,
  //         destHeight: 200,
  //         canvasId: 'myQrcode',
  //         success: function(res) {
  //           res.tempFilePath
  //           _this.setData({
  //             qrCode: res.tempFilePath
  //           })
  //         } 
  //       })
  //     }
  //   }) 
  // },
  // go(){
  //   var _wx = wx,_this = this;
  //   drawQrcode({
  //     width: 200,
  //     height: 200,
  //     canvasId: 'myQrcode',
  //     text: 'www.baidu.com',
  //     callback: () =>{
  //       _wx.canvasToTempFilePath({
  //         x: 0,
  //         y: 0,
  //         width: 200,
  //         height: 200,  
  //         destWidth: 200,
  //         destHeight: 200,
  //         canvasId: 'myQrcode',
  //         success: function(res) {
  //           _this.draw(i,res.tempFilePath);
  //         } 
  //       })
  //     }
  //   })
  // },
  
  // submit(){
  //   var action_id = '14',
  //   index=this.data.index,
  //   token = app.globalData.token,
  //   number = this.data.number,
  //   templet_id = this.data.list[index].id,
  //   img = this.data.list[index].demo,
  //   view_img = this.data.list[index].resource;
  //   qrCodeEdit(action_id,token,number,templet_id,img,view_img).then(res =>{
  //     if(res.code == 10000){
  //       wx.navigateTo({
  //         url: '../qrcode_list/qrcode_list',
  //       })
  //     }
  //   }) 
  // }



})
