const util = require('../../../utils/util');
import { URL } from '../../../url';
import { imgsEdit, certificateEdit, certificatesInfo } from '../../../getData.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idFront:'',
    idFrontUp:'',
    idBack:'',
    idBackUp:'',
    license:'',
    licenseUp:'',
    certify:'',
    certifyUp:''
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
  onLoad: function () {
    this.init();
  },
  init(){
    certificatesInfo("10", app.globalData.token).then(res=>{
      console.log(res);
      // if(res.data){
        this.setData({
          license: res.data.business_licenceUrl,
          licenseUp: res.data.business_licence,
          idFront: res.data.identity_frontUrl,
          idFrontUp: res.data.business_licence,
          idBack: res.data.identity_reverseUrl,
          idBackUp: res.data.identity_reverse,
          certify: res.data.catering_service_permitUrl,
          certifyUp: res.data.catering_service_permit
        })
      // }
    })
  },
  bindCerF(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var upData = {
          url: URL.upLoadImg,
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            token: app.globalData.token,
            image: tempFilePaths[0]
          }
        }
        util.upLoadImg(upData).then(res => {
          var log = JSON.parse(res.data).data.url;
          that.setData({
            idFront: log,
            idFrontUp: JSON.parse(res.data).data.path            
          })
        })
      }
    })
  },
  bindCerR(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var upData = {
          url: URL.upLoadImg,
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            token: app.globalData.token,
            image: tempFilePaths[0]
          }
        }
        util.upLoadImg(upData).then(res => {
          var log = JSON.parse(res.data).data.url;
          that.setData({
            idBack: log,
            idBackUp: JSON.parse(res.data).data.path
          })
        })
      }
    })
  },
  bindCerL(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var upData = {
          url: URL.upLoadImg,
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            token: app.globalData.token,
            image: tempFilePaths[0]
          }
        }
        util.upLoadImg(upData).then(res => {
          var log = JSON.parse(res.data).data.url;
          that.setData({
            license: log,
            licenseUp: JSON.parse(res.data).data.path
          })
        })
      }
    })
  },
  bindCerP(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var upData = {
          url: URL.upLoadImg,
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            token: app.globalData.token,
            image: tempFilePaths[0]
          }
        }
        util.upLoadImg(upData).then(res => {
          var log = JSON.parse(res.data).data.url;
          that.setData({
            certify: log,
            certifyUp: JSON.parse(res.data).data.path
          })
        })
      }
    })
  },
  goSub(){
    if (!this.data.licenseUp){
      wx.showToast({
        title: '营业执照不能为空',
      })
    }
    if (!this.data.idFrontUp) {
      wx.showToast({
        title: '身份证正面不能为空',
      })
    }
    if (!this.data.idBackUp) {
      wx.showToast({
        title: '身份证反面不能为空',
      })
    }
    if (!this.data.certifyUp) {
      wx.showToast({
        title: '食品经营许可证等不能为空',
      })
    }
    certificateEdit("10", app.globalData.token, this.data.licenseUp, this.data.idFrontUp, this.data.idBackUp, this.data.certifyUp).then(res=>{
       console.log(res);
      if (res.code == 10000){
        wx.navigateTo({
          url: '../../main/main',
        })
      }
    })
  },
  delFront(){
     this.setData({
       idFront: '',
       idFrontUp: ''
     })
  },
  delBack(){
    this.setData({
      idBack: '',
      idBackUp: ''
    })
  },
  delLis(){
    this.setData({
      license: '',
      licenseUp: ''
    })
  },
  delPermit(){
    this.setData({
      certify: '',
      certifyUp: ''
    })
  }
})
