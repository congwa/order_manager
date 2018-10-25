// pages/qrcode_management/qrcode_list/qrcode_list.js
import {
  URL,
  fly
} from '../../../url';
import drawQrcode from '../../../qrcode/weapp.qrcode.esm.js';
var app = getApp();
import {
  qrCodeList
} from '../../../getData';
import regeneratorRuntime from '../../../regenerator-runtime/runtime';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    // 二维码列表和桌号
    list: [],

    windowHeight: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();

  },
  async init() {
    // var _this =  this;
    // var _wx = wx;
    // fly.post(URL.qrCodeList,{action_id:'14',token:app.globalData.token}).then(res =>{
    //   this.setData({
    //     list:res.data.items
    //   })
    // })
    this.setData({
      loading: true
    })

    await qrCodeList('14', app.globalData.token).then(res => {
      this.setData({
        list: res.data.items
      })
    })

    await app.getWindowHeight().then(res => {
      this.setData({
        windowHeight: res
      })
    })

    this.setData({
      loading: false
    })


    // for(let i =0; i<= res.data.items.length; i++){
    //   drawQrcode({
    //     width: 200,
    //     height: 200,
    //     canvasId: 'myCanvas' +i,
    //     text: 'www.baidu.com',
    //     callback: () =>{
    //       _wx.canvasToTempFilePath({
    //         x: 0,
    //         y: 0,
    //         width: 200,
    //         height: 200,  
    //         destWidth: 200,
    //         destHeight: 200,
    //         canvasId: 'myCanvas'+i,
    //         success: function(res) {
    //           _this.draw(i,res.tempFilePath);
    //         } 
    //       })
    //     }
    //   })
    // }

  },
  goCreat() {
    wx.navigateTo({
      url: '../add_qrcode/add_qrcode',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },

  // var tW = 1913;
  // var tH = 1346;
  // draw(index,path){
  //   var ctx = wx.createCanvasContext('myCanvas'+index);
  //   ctx.drawImage('../../../img/code_back.png', 0, 0, 1913, 1346);
  //   ctx.drawImage(path,84,22,200,200);
  //   ctx.setFontSize(12);
  //   ctx.setFillStyle('#FFFFFF')
  //   ctx.fillText('08', 20, 80);
  //   ctx.draw();
  // },

  // draw1(){
  //   var ctx = wx.createCanvasContext('myCanvas1');
  //   ctx.drawImage('../../../img/code_back.png', 0, 0, 1500  ,1500);
  //   ctx.drawImage('../../../img/code.png',840,220,520,520);
  //   ctx.setFontSize(120);
  //   ctx.setFillStyle('#FFFFFF')
  //   ctx.fillText('08', 200, 800);
  //   ctx.draw();
  // },
  setDown(e) {
    var id = e.target.dataset.id,
      templateid = e.target.dataset.templetid,
      number = e.target.dataset.number,
      img = e.target.dataset.img,
      index = e.target.dataset.index;

    wx.downloadFile({
      url: img,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            console.log(result)

            wx.showToast({
              title: '已保存',
            })

          }
        })
      }
    })
    //  qrCodeDown('14',app.globalData.token,id).then(res =>{
    //  if(res.code == 10000){
    // }
    //       })
    //    }
    //  }).catch(err =>{
    //    wx.showToast({
    //      title: err.msg,
    //      icon: 'none',
    //      image: '',
    //      duration: 1500,
    //      mask: true,
    //    });
    //  })


    //  fly.post(URL.qrCodeDown,{action_id:'14',token:app.globalData.token,id:id}).then(res =>{
    //    console.log('下载');
    // })
    // wx.canvasToTempFilePath({
    //   x: 0,
    //   y: 0,
    //   width: 1913,
    //   height: 1346,  
    //   destWidth: 300,
    //   destHeight: 200,
    //   canvasId: 'myCanvas'+index,
    //   success: function(res) {
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath, //需要保存的文件的临时路径,
    //       success: res => {
    //         console.log(res);
    //       }
    //     });
    //   } 
    // })
  },


  setDel(e) {
    var id = e.target.dataset.id,
      templateid = e.target.dataset.templetid,
      number = e.target.dataset.number;
    fly.post(URL.qrCodeDel, {
      action_id: '14',
      token: app.globalData.token,
      id: id
    }).then(res => {
      console.log('删除成功');
      if (res.code == 10000) {
        this.init();
      }
    })
  }
})