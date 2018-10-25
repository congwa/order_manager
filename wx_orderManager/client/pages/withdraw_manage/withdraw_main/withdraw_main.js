import { httpClient } from '../../../http.js';
import { actionId } from '../../../url.js';
var app = getApp();
import { bankPull, cancelWithdraw } from "../../../getData";
import { formatTime, formatTimeTwo } from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tState: ['', '已完成', '待审核', '待汇款', '已取消'],

    warnText: ['您的提现金额已经超出账面金额', '您的提现金额低于500', '您的提现金超过20000','您的提现金超过50000'],
    warnIndex:'',

    list: [],
    page: 1,
    size: 20,


    total_num: '2369000',
    giveAll: false,
    isSurpass: false,//是否超过最大金额
    disabled: true,
    buttonType: 'default',
    money: 0,
    name: '',
 
    type: 1, //1: 提现到银行卡  2:提现到微信

    trueName: '',
    // name visible 
    nvisible: false,
    //rule visible
    rulevisible: false,
    iscancle: false,
    url1: '',
    url2: '',
    cancelId: '',
    wxname: '',
    monyDes: ['', '0.009', '0.01']
  },

  initList() {

  },
  // 提现到银行卡或者微信
  radioChange(e) {
    var value = e.detail.value;
    this.setData({
      type: value,
      money: this.data.money
    })
    // this.patternValue();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getWithdrawOverage();
    this.init();
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        that.setData({
          wxname: nickName
        })
      }
    })

  },
  init() {
    httpClient.bankPayList({
      action_id: actionId['6'],
      token: app.globalData.token,
      page: this.data.page,
      size: this.data.size
    }).then(res => {
      console.log(res.data.data.items)
      if (res.data.code == 10000) {
        for (var key in res.data.data.items) {
          res.data.data.items[key].create_time = formatTimeTwo(res.data.data.items[key].create_time, 'Y-M-D h:m');
        }
        this.setData({
          list: res.data.data.items
        })
      }
    })
  },
  //滚动到底部的时候
  scrolltolower() {
    var page = this.data.page;
    page++;
    httpClient.bankPayList({
      action_id: actionId['6'],
      token: app.globalData.token,
      page: page,
      size: this.data.size
    }).then(res => {
      if (res.data.code == 10000) {
        this.setData({
          list: this.data.list.push(...res.data.data.items),
          page: page
        })
      }
    })
  },

  getWithdrawOverage() {
    httpClient.bankMoney({
      token: app.globalData.token,
      action_id: actionId['6'],
    }).then(res => {
      console.log('提现余额', res);
      if (res.data.code == 10000) {
        this.setData({
          total_num: res.data.data
        })
      }

    })
  },
  dropAll() {
    this.setData({
      giveAll: true
    })
  },
  patternValue(e) {
    // console.log(e.detail.value,this.data.total_num);
    if (!Number(e.detail.value)) {
      this.setData({
        isSurpass: false,
        disabled: true,
        buttonType: 'default'
      })
    } else {
      console.log(Number(e.detail.value));
      if (!this.checkState(e)) {
        // console.log('超过了')
        this.setData({
          isSurpass: true,
          disabled: true,
          buttonType: 'default'
        })
      } else {
        this.setData({
          money: Number(e.detail.value),
          isSurpass: false,
          disabled: false,
          buttonType: 'primary'
        })
      }
    }
  },

  checkState(e){
    if ((Number(e.detail.value) > Number(this.data.total_num))){
      this.setData({
        warnIndex:0
      })
      return false;
    }
    if (Number(e.detail.value) < 500){
      this.setData({
        warnIndex: 1
      })
      return false;
    }
    if (Number(e.detail.value) > 20000 && this.data.type == 1){
      this.setData({
        warnIndex: 2
      })
      return false;
    }
    if (Number(e.detail.value) > 50000 && this.data.type == 2){
      this.setData({
        warnIndex: 3
      })
      return false;
    }
    return true;
  },

  
  patternName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  goWithdraw() {
    if (this.data.type == 2) {// 银行卡
      httpClient.bankPull({
        token: app.globalData.token,
        action_id: actionId['6'],
        money: this.data.money * 100,
        type: this.data.type,

      }).then(res => {
        console.log('提现余额', res);
        if (res.data.code == 10000) {
           this.init();
        }

      })
    } else {
      this.maskopen();
    }

  },

  setTrueName(e) {
    this.setData({
      trueName: e.detail.value
    })
  },

  submitTrueName() {
    this.maskclose();
    bankPull('6', app.globalData.token, this.data.money*100, this.data.type, this.data.trueName).then(res => {//余额
      if (res.code == 10000) {
        wx.showToast({
          title: '已提交',
        });
         this.init();
      } else {
        wx.showToast({
          title: res.msg,
          duration: 1500,
          mask: true
        });
      }
    }).catch(err => {
      wx.showToast({
        title: res.msg,
        duration: 1500,
        mask: true
      });
    })
  },
  //跳转到银行卡页面
  goCheckCard() {
    wx.navigateTo({
      url: '../second_enter/second_enter',
    })
  },
  // 控制真实姓名弹窗
  maskclose() {
    this.setData({
      nvisible: false
    });
  },
  maskopen() {
    this.setData({
      nvisible: true
    })
  },
  operateRule() {
    this.setData({
      rulevisible: !this.data.rulevisible
    })
  },
  cancle(e) {
    if (e.target.dataset.id) {
      this.setData({
        cancelId: e.target.dataset.id
      })
    }
    this.setData({
      iscancle: !this.data.iscancle
    })
  },
  goWeb1() {
    console.log(111)
    wx.navigateTo({
      url: '../../rule/rule?url=' + 'https://pay.weixin.qq.com/index.php/public/apply_sign/protocol_v2',
    })
  },
  goWeb2() {
    wx.navigateTo({
      url: '../../rule/rule?url=' + 'https://pay.weixin.qq.com/index.php/core/home/pay_pact_v4',
    })
  },
  cancleWithDraw() {
    cancelWithdraw('6', app.globalData.token, this.data.cancelId).then(res => {
      console.log(res);
      this.setData({
        iscancle: !this.data.iscancle
      })
      wx.showToast({
        title: res.msg,
      })
      this.init();
    })
  },
//   if(sumMoney.toString().split('.')[1] * 100 == 0){
//   sumMoney = Number(sumMoney.toFixed(0));
// }else if (sumMoney.toString().split('.')[1] * 100 >= 1000 || sumMoney.toString().split('.')[1] * 100 < 10000) {
//   sumMoney = Number(sumMoney.toFixed(1))
// }
})