import {
  URL,
  fly
} from './url.js';

// 管理员相关

//新款首页（供设置管理员权限使用）
export const index = (token) => fly.post(URL.index, {
  action_id: -1,
  token: token
})
// 管理员搜寻
export const adminSearch = (action_id, token, phone) => fly.post(URL.adminSearch, {
  action_id: action_id,
  token: token,
  phone: phone
})

// 管理员添加或者编辑
export const adminEdit = (action_id, token, uid, name, job, rules) => fly.post(URL.adminEdit, {
  action_id: action_id,
  token: token,
  uid: uid,
  name: name,
  job: job,
  rules: rules,
  editLoading:true
})

// 管理员列表
export const adminList = (action_id, token) => fly.post(URL.adminList, {
  action_id: action_id,
  token: token
})

// 管理员详情
export const adminDetail = (action_id, token, id) => fly.post(URL.adminDetail, {
  action_id: action_id,
  token: token,
  id: id
})

// 管理员删除
export const adminDel = (action_id, token, id) => fly.post(URL.adminDel, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})

// 客服相关

//  客服 - 二维码与电话
export const serviceIndex = (action_id) => fly.post(URL.serviceIndex, {
  action_id: action_id
})

// 入驻相关
export const enterIndex = (action_id, token) => fly.post(URL.enterIndex, {
  action_id: action_id,
  token: token
})

//相册相关

// 相册列表
export const imgsList = (action_id, token) => fly.post(URL.imgsList, {
  action_id: action_id,
  token: token
})
// 相册编辑
export const imgsEdit = (action_id, token, title, img, sort) => fly.post(URL.imgsEdit, {
  action_id: action_id,
  token: token,
  title: title,
  img: img,
  sort: sort,
  editLoading:true
})

//相册删除
export const imgsDel = (action_id, token, id) => fly.post(URL.imgsDel, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})

//优惠券相关

export const countList = (action_id, token) => fly.post(URL.countList, {
  action_id: action_id,
  token: token
})

//二维码相关

// 二维码生成
export const qrCodeEdit = (action_id, token, number, templet_id) => fly.post(URL.qrCodeEdit, {
  action_id: action_id,
  token: token,
  number: number,
  templet_id: templet_id,
  editLoading:true
})

export const qrCodeList = (action_id, token) => fly.post(URL.qrCodeList, {
  action_id: action_id,
  token: token,

})


//  二维码模板
export const qrCodeTemplet = (action_id, token) => fly.post(URL.qrCodeTemplet, {
  action_id: action_id,
  token: token
})

// 二维码下载
export const qrCodeDown = (action_id, token, id) => fly.post(URL.qrCodeDown, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})

// 二维码删除
export const qrCodeDel = (action_id, token, id) => fly.post(URL.qrCodeDel, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})





//菜品分类相关

// 菜品分类列表
export const classflyList = (action_id, token) => fly.post(URL.classfly, {
  action_id: action_id,
  token: token
})

//菜品分类添加或者编辑
export const classflyEdit = (action_id, token, title, sort, classfly, price, img, summary, expand, recommend, id) => fly.post(URL.edit, {
  action_id: action_id,
  token: token,
  title: title,
  sort: sort,
  classfly: classfly,
  price: price,
  img: img,
  summary: summary,
  expand: expand,
  recommend: recommend,
  id: id,
  editLoading:true
})

//菜品分类删除
export const classflyDel = (action_id, token, id) => fly.post(URL.del, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})


//满减-添加
export const decreaseEdit = (action_id, token, price, pull_price) => fly.post(URL.decreaseEdit, {
  action_id: action_id,
  token: token,
  price: price,
  pull_price: pull_price,
  editLoading:true
})

//满减-列表
export const decreaseDetails = (action_id, token) => fly.post(URL.decreaseDetails, {
  action_id: action_id,
  token: token
})


//满减-删除
export const decreaseDel = (action_id, token, id) => fly.post(URL.decreaseDel, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})

//基础设施 - 列表
export const baseLists = (action_id, token) => fly.post(URL.baseLists, {
  action_id: action_id,
  token: token
})

//基础设施 - 选中的详情
export const baseInfo = (action_id, token) => fly.post(URL.baseInfo, {
  action_id: action_id,
  token: token
})
//基础设施 - 编辑
export const baseEdit = (action_id, token, id) => fly.post(URL.baseEdit, {
  action_id: action_id,
  token: token,
  id: id,
  editLoading:true
})

//基础信息完善 - 编辑
export const baseinfoEdit = (action_id, token, start_time, end_time, price, nav_id, logo, banner, is_reimburse, is_bespeak, mobile1, mobile2, mobile3) => fly.post(URL.baseinfoEdit, {
  action_id: action_id,
  token: token,
  start_time: start_time,
  end_time: end_time,
  price: price,
  nav_id: nav_id,
  logo: logo,
  banner: banner,
  is_reimburse: is_reimburse,
  is_bespeak: is_bespeak,
  mobile1: mobile1,
  mobile2: mobile2,
  mobile3: mobile3,
  editLoading:true
})
//基础信息完善 - 详情
export const baseinfoInfo = (action_id, token) => fly.post(URL.baseinfoInfo, {
  action_id: action_id,
  token: token
})
//商户分类
export const merchantsClassify = (action_id, token) => fly.post(URL.merchantsClassify, {
  action_id: action_id,
  token: token
})

// 核销相关
// 核销列表
export const confirmList = (action_id, token, page, size) => fly.post(URL.confirmList, {
  action_id: action_id,
  token: token,
  page: page,
  size: size
})

//核销
export const confirmTo = (action_id, token, code) => fly.post(URL.confirmTo, {
  action_id: action_id,
  token: token,
  code: code,
  editLoading:true
})

// 菜品管理相关  // 返回一个promise对象全部都拿到之后
// 菜品列表
export const foodList = (action_id, token) => fly.post(URL.foodList, {
  action_id: action_id,
  token: token
})



//菜品删除
export const foodDel = (action_id, token, id) => fly.post(URL.foodDel, {
  action_id: action_id,
  token: token,
  id: id
})

// 菜品编辑或添加
export const foodEdit = (action_id, token, title, sort, classfly, price, img, summary, expand, recommend, id) => fly.post(URL.foodEdit, {
  action_id: action_id,
  token: token,
  title: title,
  sort: sort,
  classfly: classfly,
  price: price,
  img: img,
  summary: summary,
  expand: expand,
  recommend: recommend,
  id: id,
  editLoading:true
})

//经营数据 相关
export const marketList = (action_id, token, type, time) => fly.post(URL.marketList, {
  action_id: action_id,
  token: token,
  type: type,
  time: time
})

// 总价格
export const marketMoney = (action_id, token) => fly.post(URL.marketMoney, {
  action_id: action_id,
  token: token
})

//入驻
export const enterList = (action_id, token) => fly.post(URL.enterList, {
  action_id: action_id,
  token: token
})


//
export const enterRegisters = (action_id, token, title, business_licence, address, mobile, name, lng, lat, province, city, county) => fly.post(URL.enterRegisters, {
  action_id: action_id,
  token: token,
  title: title,
  business_licence: business_licence,
  address: address,
  mobile: mobile,
  name: name,
  lng: lng,
  lat: lat,
  province: province,
  city: city,
  county: county
})
//证件信息完善 - 编辑
export const certificateEdit = (action_id, token, business_licence, identity_front, identity_reverse, catering_service_permi) => fly.post(URL.certificateEdit, {
  action_id: action_id,
  token: token,
  business_licence: business_licence,
  identity_front: identity_front,
  identity_reverse: identity_reverse,
  catering_service_permit: catering_service_permi,
  editLoading:true
})
//证件信息完善 -详情
export const certificatesInfo = (action_id, token) => fly.post(URL.certificatesInfo, {
  action_id: action_id,
  token: token
})

//银行卡相关

//查看银行卡
export const bankDetail = (action_id, token) => fly.post(URL.bankDetail, {
  action_id: action_id,
  token: token
})

// 获取银行列表
export const bankBanks = (action_id, token) => fly.post(URL.bankBanks, {
  action_id: action_id,
  token: token
})

// 编辑
export const bankEdit = (action_id, token, bank_name, bank_open_address, bank_open_name, bank_number, bank_number_name, id, bank_id, bank_code) => fly.post(URL.bankEdit, {
  action_id: action_id,
  token: token,
  bank_name: bank_name,
  bank_open_address: bank_open_address,
  bank_open_name: bank_open_name,
  bank_number: bank_number,
  bank_number_name: bank_number_name,
  id: id,
  bank_id: bank_id,
  bank_code: bank_code,
  editLoading:true
})
// 金额
export const bankMoney = (action_id, token) => fly.post(URL.bankMoney, {
  action_id: action_id,
  token: token
})

//提现列表
export const bankPayList = (action_id, token, page, size) => fly.post(URL.bankPayList, {
  action_id: action_id,
  token: token,
  page: page,
  size: size
})

//提现动作
export const bankPull = (action_id, token, money, type, name) => fly.post(URL.bankPull, {
  action_id: action_id,
  token: token,
  money: money,
  type: type,
  name: name // 提现到零钱需要验证真实姓名
})

//取消提现
export const bankCancel = (action_id, token, id) => fly.post(URL.bankCancel, {
  action_id: action_id,
  token: token,
  id: id
})

export const cancelWithdraw = (action_id, token, id) => fly.post(URL.cancelWithdraw, {
  action_id: action_id,
  token: token,
  id: id
})

//提现消息提醒
export const bankNews = (action_id, token) => fly.post(URL.bankNews, {
  action_id: action_id,
  token: token
})

//公告相关
//公告详情
export const noticeDetail = (action_id, token) => fly.post(URL.noticeDetail, {
  action_id: action_id,
  token: token
})


//生成二维码
export const formCode = (path, width, auto_color, line_color, is_hyaline) => fly.post(URL.formCode, {
  path: path,
  width: width,
  auto_color: auto_color,
  line_color: line_color,
  is_hyaline: is_hyaline,
  editLoading:true
})
//获取位置
export const getMap = function() {
  return new Promise((resove, reject) => {
    wx.getLocation({
      success: function(res) {
        resove(res);
      }
    })
  })
}


//写入手机号
export const setPhone = (token, action_id, code, iv, encryptedData) => fly.post(URL.setPhone, {
  token: token,
  action_id: action_id,
  code: code,
  iv: iv,
  encryptedData: encryptedData
})

export const getCity = function (res) {
    return new Promise((resove, reject) => {

      var argu = {
        ak: 'ByQKfr4Q77mRURrcSxhSqDks73eYENu5',
        coordtype: 'wgs84ll',
        output: 'json',
        location: res.latitude + ',' + res.longitude
      }
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/',
        data: argu,
        success: function(res) {
          resove(res.data.result);
        },
        fail: function(e) {
          reject(e);
        }
      })
    })

  }
