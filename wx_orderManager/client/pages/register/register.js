import {
  enterRegisters,
  imgsEdit,
  getCity
} from '../../getData.js';
const util = require('../../utils/util');
import {
  URL
} from '../../url';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: true,
    latitude: '', //纬度
    longitude: '', //经度
    name: '',
    address: '',
    phone: '',
    linkman: '',
    license: '',
    licenseUp: '',
    provrice: '',
    city: '',
    county: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  this.init();
  },
  goMain() {
    if (!this.data.name){
      wx.showToast({
        title: '姓名不能为空',
      })
       return;
    } else if (!this.data.address) {
      wx.showToast({
        title: '地址不能为空',
      })
      return;
    } else if (!this.data.phone) {
      wx.showToast({
        title: '手机号不能为空',
      })
      return;
    } else if (!this.data.linkman) {
      wx.showToast({
        title: '联系人不能为空',
      })
      return;
    } else if (!this.data.linkman) {
      wx.showToast({
        title: '联系人不能为空',
      })
      return;
    } else if (!this.data.longitude || !this.data.latitude) {
      wx.showToast({
        title: '经纬度不能为空',
      })
      return;
    } else if (!this.data.provrice || !this.data.city || !this.data.county) {
      wx.showToast({
        title: '省市县不能为空',
      })
      return;
    } else if (!this.data.licenseUp) {
      wx.showToast({
        title: '执照不能为空',
      })
      return;
    }
    enterRegisters('-1', app.globalData.token, this.data.name, this.data.licenseUp, this.data.address, this.data.phone, this.data.linkman, this.data.longitude, this.data.latitude, this.data.provrice ? this.data.provrice : '110000', this.data.city ? this.data.city : '110000', this.data.county ? this.data.county :'110101').then(res => {
      console.log(res);
      if (res.code == 10000) {
        wx.redirectTo({
          url: '../waiting_audit/waiting_audit'
        })
      }
    })
  },
  init() {
    var that = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude, //纬度
          longitude: res.longitude, //经度
          address: res.address
        })
        getCity(res).then(drs => {
          console.log(drs);
          var code = drs.addressComponent.adcode;
          var provrice = parseInt(code / 10000) * 10000;
          var city = parseInt(code / 100) * 100;
          var county = code;
          console.log(provrice, city, county);
          that.setData({
            provrice: provrice,
            city: city ,
            county: county
          })
        })
      },
    })
  },
  changeName(e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  changeAddress(e) {
    this.setData({
      address: e.detail.value
    })
    console.log(this.data.address)
  },
  changePhone(e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  changeLinkman(e) {
    this.setData({
      linkman: e.detail.value
    })
    console.log(this.data.linkman)
  },
  licenseChange(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
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
  }
})