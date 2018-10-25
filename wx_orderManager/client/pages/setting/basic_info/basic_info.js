//获取应用实例
import { actionId } from '../../../url.js';
import regeneratorRuntime from '../../../regenerator-runtime/runtime';
const { $Toast } = require('../../../iview/base/index');

import { baseinfoEdit, baseinfoInfo, merchantsClassify, imgsEdit ,getCity } from '../../../getData.js';
var app = getApp();
const util = require('../../../utils/util');
import { URL } from '../../../url';
var tcity = require("../../../utils/citys.js");
var sortList = ['地方菜系', '地方菜系', '地方菜系', '地方菜系', '地方菜系', '地方菜系'];
var timeList = [];
for (var i = 0; i < 24; i++) {
  timeList.push(i + ':00');
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // root: root,
    sortList: sortList,
    index: 0,
    timeList: timeList,
    timeFrom: 0,
    timeTo: 0,

    pics: [],
    previewSrcs: [],

    // 城市三联选择
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    // 变量
    admin_id: '',
    sName: '',
    sort: '',
    time: [0,0],
    price: '',
    fName: '',
    address: '',
    dAddress: '',
    iphone: ['', '', ''],
    logo: '',
    logoUp:'',
    door: '',
    doorUp:'',
    is_reimburse:'',
    is_bespeak:'',
    details: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   admin_id: options.admin_id == undefined ? '' : options.admin_id
    // })
    // this.arguLoad();
    // this.cityLoad();
    this.init();
  },
  async init() {
    this.setData({
      loading:true
    })

    await merchantsClassify('10', app.globalData.token).then(res => {
      console.log('商户分类', res);
      this.setData({
        sortList: res.data,
        sort: res.data[this.data.index].id
      })
    })

    await baseinfoInfo('10', app.globalData.token).then(res => {
      console.log(res);
      if(res.data.logo &&res.data.mobile &&  res.data.nav_id){
        var timeFrom = parseInt(res.data.open_time?(res.data.open_time[0].split(':')[0] >= 10 ? res.data.open_time[0].split(':')[0]: res.data.open_time[0].split(':')[0].split('0')[1]):'0');
        var timeTo =  parseInt(res.data.open_time?(res.data.open_time[1].split(':')[0]):'0');
        this.setData({
          details: res.data,
          logo: res.data.logoUrl,
          door: res.data.bannerUrl,
          logoUp:res.data.logo,
          doorUp:res.data.banner,
          price:res.data.price,
          sort:res.data.nav_id,
          iphone: res.data.mobile?res.data.mobile:[],
          is_reimburse: res.data.is_reimburse,
          is_bespeak: res.data.is_bespeak,
          timeFrom:timeFrom?timeFrom:'0',  //详情读取到的起始时间
          timeTo:timeTo?timeTo:'0' //详情读取到的截止时间
        })
        console.log(this.data.open_time)
        this.data.sortList.forEach((ele,index)=>{
          if(ele.id == this.data.sort){
            this.setData({  
              index:index
            })
          }
        })
      }
     
    })

   

 
    this.setData({
      loading:false
    })
  },
  // arguLoad() {
  //   httpClient.getNavIndex().then(res => {
  //     this.setData({
  //       sortList: res,
  //       sort: res[0].id
  //     })
  //   })
  // },

  goCertificate(e) {
    var time = [];
    // time.push(this.data.timeList[this.data.timeFrom]);
    time[0]=this.data.timeList[this.data.timeFrom];
    // time.push(this.data.timeList[this.data.timeTo]);
    time[1]=this.data.timeList[this.data.timeTo];
    this.setData({
      time: time
    })

    // var values = this.data.values;
    // var cityData = this.data.cityData;
    // var province = cityData[this.data.values[0]].code;
    // var city = cityData[values[0]].sub[values[1]].code;
    // var county = cityData[values[0]].sub[values[1]].sub[values[2]].code;
    // console.log(province, city, county);
    if (!app.globalData.token){
      $Toast({
        content: '您未登录哦',
        type: 'error',
        mask:true
      });
      return;
    } else if (!this.data.time[0]){
      $Toast({
        content: '开始时间不能为空',
        type: 'error',
        mask:true
      });
      return;
    } else if (!this.data.time[1]){
      $Toast({
        content: '结束时间不能为空',
        type: 'error',
        mask:true
      });
      return;
    } else if (!this.data.price){
      $Toast({
        content: '人均价不能为空',
        type: 'error',
        mask:true
      });
      return;
    } else if (!this.data.sort){
      $Toast({
        content: '请选择店铺分类',
        type: 'error',
        mask:true
      });
      return;
    } else if (!this.data.logoUp){
      $Toast({
        content: '请上传店铺logo',
        type: 'error',
        mask:true
      });
      return;
    } else if (!this.data.doorUp) {
      $Toast({
        content: '请上传banner',
        type: 'error',
        mask:true
      });
      return;
    } 
    else if (this.data.is_reimburse === '') {
      $Toast({
        content: '是否支持退款',
        type: 'error',
        mask:true
      });
      return;
    } 
    else if (this.data.is_bespeak === '') {
      $Toast({
        content: '是否支持预定',
        type: 'error',
        mask:true
      });
      return;
    } 
    else if (!this.data.iphone[0]&&!this.data.iphone[1] && !this.data.iphone[2]) {
      $Toast({
        content: '必填手机号不能为空',
        type: 'error',
        mask:true
      });
      return;
    }
    
    baseinfoEdit('10', app.globalData.token, this.data.time[0], this.data.time[1], this.data.price*100, this.data.sort, 
    // province ? province : this.data.values[0], city ? city : this.data.values[1], county ? county : this.data.values[2], 
    this.data.logoUp, this.data.doorUp, this.data.is_reimburse, this.data.is_bespeak, this.data.iphone[0], this.data.iphone[1], this.data.iphone[2]).then(res => {
      console.log('提交', res);
      if (res.code == 10000) {
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateTo({
          url: '../../main/main'
        })
      } else {
        wx.showToast({
          title: res.msg
        })
      }
    })

  },

  sNameChange(e) {
    this.setData({
      sName: e.detail.value
    })
  },
  //店铺分类
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      sort: this.data.sortList[e.detail.value].id
    })
    console.log(this.data.sort)
  },
  //营业时间起始
  bindPickerTimeFrom(e) {
    this.setData({
      timeFrom: e.detail.value
    })
  },
  //营业时间截止
  bindPickerTimeTo(e) {
    this.setData({
      timeTo: e.detail.value
    })
  },
  //价格改变
  priceChange(e) {
    this.setData({
      price: e.detail.value
    })
  },
  //退款与预定
  radioChange1(e) {
   this.setData({
     is_bespeak :e.detail.value
   })
    console.log(this.data.is_bespeak)
  },
  radioChange2(e) {
    this.setData({
      is_reimburse: e.detail.value
    })
    console.log(this.data.is_reimburse)
  },
  fNameChange(e) {
    this.setData({
      fName: e.detail.value
    })
  },
  dAddressChange(e) {
    this.setData({
      dAddress: e.detail.value
    })
  },
  iphoneChange(e) {
    switch (e.target.dataset.type) {
      case '0':
        this.data.iphone[0] = e.detail.value;
        break;
      case '1':
        this.data.iphone[1] = e.detail.value;
        break;
      case '2':
        this.data.iphone[2] = e.detail.value;
        break;
    }
    this.setData({
      iphone: this.data.iphone
    })
  },
  //logo
  logoChange(e) {
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
            logo: log,
            logoUp: JSON.parse(res.data).data.path
          })
        })
      }
    })
  },
  //banner
  doorChange(e) {
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
            door: log,
            doorUp: JSON.parse(res.data).data.path
          })
        })
      }
    })
  },

  //   /**
  //  * 多张图片图片上传调用
  //  */
  //   uploadimgs: function () { //这里触发图片上传的方法
  //     var pics = this.data.pics;
  //     this.uploadimg({
  //       url: URL.league_uploads, //上传的接口
  //       path: pics //这里是选取的图片的地址数组
  //     });
  //   },
  //   /**
  //    * 图片上传专用方法
  //    * @param data
  //    */
  //   uploadimg: function (data) {
  //     var that = this,
  //       i = data.i ? data.i : 0, //当前上传的哪张图片
  //       success = data.success ? data.success : 0, //上传成功的个数
  //       fail = data.fail ? data.fail : 0; //上传失败的个数
  //     wx.uploadFile({
  //       url: data.url,
  //       filePath: data.path[i],
  //       name: 'image', //这里根据自己的实际情况改
  //       formData: {
  //         token: app.globalData.token,
  //         image: data.path[i]
  //       }, //这里是上传图片时一起上传的数据
  //       success: (resp) => {
  //         success++; //图片上传成功，图片上传成功的变量+1
  //         console.log(JSON.parse(resp.data))
  //         console.log(i);
  //         if (JSON.parse(resp.data).code != 200) {
  //           wx.showToast({
  //             title: '上传失败'
  //           });
  //         } else {
  //           var srcArray = JSON.parse(resp.data);
  //           that.data.previewSrcs.push(srcArray.data.uploadedPathArr);
  //           that.setData({
  //             previewSrcs: that.data.previewSrcs,
  //             door: that.data.previewSrcs
  //           })
  //           //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
  //         }

  //       },
  //       fail: (res) => {
  //         fail++; //图片上传失败，图片上传失败的变量+1
  //         console.log('fail:' + i + "fail:" + fail);
  //       },
  //       complete: () => {
  //         console.log(i);
  //         i++; //这个图片执行完上传后，开始上传下一张
  //         if (i == data.path.length) { //当图片传完时，停止调用
  //           that.data.pics.length = 0; //图片上传完成清空队列
  //           console.log('执行完毕');
  //           console.log('成功：' + success + " 失败：" + fail);
  //         } else { //若图片还没有传完，则继续调用函数
  //           console.log(i);
  //           data.i = i;
  //           data.success = success;
  //           data.fail = fail;
  //           that.uploadimg(data);
  //         }
  //       }
  //     });
  //   },


  // bindChange: function (e) {
  //   //console.log(e);
  //   var val = e.detail.value
  //   var t = this.data.values;
  //   var cityData = this.data.cityData;

  //   if (val[0] != t[0]) {
  //     console.log('province no ');
  //     const citys = [];
  //     const countys = [];

  //     for (let i = 0; i < cityData[val[0]].sub.length; i++) {
  //       citys.push(cityData[val[0]].sub[i].name)
  //     }
  //     for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
  //       countys.push(cityData[val[0]].sub[0].sub[i].name)
  //     }

  //     this.setData({
  //       province: this.data.provinces[val[0]],
  //       city: cityData[val[0]].sub[0].name,
  //       citys: citys,
  //       county: cityData[val[0]].sub[0].sub[0].name,
  //       countys: countys,
  //       values: val,
  //       value: [val[0], 0, 0]
  //     })

  //     return;
  //   }
  //   if (val[1] != t[1]) {
  //     console.log('city no');
  //     const countys = [];

  //     for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
  //       countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
  //     }

  //     this.setData({
  //       city: this.data.citys[val[1]],
  //       county: cityData[val[0]].sub[val[1]].sub[0].name,
  //       countys: countys,
  //       values: val,
  //       value: [val[0], val[1], 0]
  //     })
  //     return;
  //   }
  //   if (val[2] != t[2]) {
  //     console.log('county no', val, cityData);
  //     this.setData({
  //       county: this.data.countys[val[2]],
  //       values: val
  //     })
  //     return;
  //   }


  // },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  cityLoad: function () {
    console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
  }
})