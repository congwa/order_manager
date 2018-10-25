const { $Toast } = require('../../../iview/base/index');
const  util  = require('../../../utils/util');
import { URL} from '../../../url';
import { imgsEdit } from '../../../getData.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    number:'',
    logo:'',
    logoUp:''
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
  onShow: function () {
    
  },
  setTitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  setNumber(e){
    this.setData({
      number:e.detail.value
    })
  },

  selectImage(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var upData = {
          url:URL.upLoadImg,
          filePath:tempFilePaths[0],
          name:'image',
          formData:{
            token:app.globalData.token,
            image:tempFilePaths[0]
          }
        }
        util.upLoadImg(upData).then(res =>{
          var log = JSON.parse(res.data).data.url;
          that.setData({
            logo:log,
            logoUp: JSON.parse(res.data).data.path
          })
        })
      }
    })
  },

  check(){
    if(!this.data.title){
      $Toast({
        content: '请输入正确的标题',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.number){
      $Toast({
        content: '请输入正确的排序号',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.logo){
      $Toast({
        content: '请输上传图片',
        type: 'error',
        mask:true
      });
      return false;
    }
    return true;
  },

  goalbum(){
    if(!this.check()){
      return false;
    }
    imgsEdit('9', app.globalData.token, this.data.title, this.data.logoUp,this.data.number).then(res => {
      wx.showToast({
        title: res.msg,
      })
      if(res.code == 10000){
        wx.redirectTo({
          url: '../album/album',
        })
      }
    })
  }
})