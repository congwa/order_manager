
import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
import { bankBanks, bankDetail } from '../../../getData.js';
const { $Toast } = require('../../../iview/base/index');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banks:[],
    bankData:'',
    bankIndex:'',

    bank_name:'',
    bank_open_address:'',
    bank_open_name:'',
    bank_number:'',
    bank_number_name:'',
    id:'',
    bank_id:'',
    bank_code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      })
      bankDetail('6',app.globalData.token).then(res => {
        if(res.code == 10000){
          this.setData({
            id:res.data.id,
            bank_name:res.data.bank_name,
            bank_open_address:res.data.bank_open_address,
            bank_number:res.data.bank_number,
            bank_open_name:res.data.bank_open_name,
            bank_number_name:res.data.bank_number_name
          })
        }
      })
    }
    bankBanks('6',app.globalData.token).then(e =>{
      if(e.code == 10000){
        let arr = [];
        e.data.forEach((ele,index) =>{
          arr.push(ele.name);
        })
        this.setData({
          banks: arr,
          bankData:e.data
        })
      }
    })
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
  setBank(res){
    var that = this;
    that.setData({
      bank_name:this.data.banks[res.detail.value],
      bank_id:this.data.bankData[res.detail.value].id,
      bank_code:this.data.bankData[res.detail.value].code,
      bank_open_name: this.data.bank_open_name,
      bankIndex:res.detail.value
   })
  },

  setBankArea(e){
    this.setData({
      bank_open_address:e.detail.value
    })
  },

  setBankAreaDetail(e){
    this.setData({
      bank_open_name:e.detail.value
    })
  },

  setBankNumber(e){
    this.setData({
      bank_number:e.detail.value
    })
  },

  setName(e){
    this.setData({
      bank_number_name:e.detail.value
    })
  },

  check(){
    if(!this.data.bank_name){
      $Toast({
        content: '请输入银行',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.bank_open_address){
      $Toast({
        content: '请输入银行卡开户地',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.bank_open_name){
      $Toast({
        content: '请输入银行卡开户行',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.bank_number){
      $Toast({
        content: '请输入银行卡卡号',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.bank_number_name){
      $Toast({
        content: '请输入持卡人姓名',
        type: 'error',
        mask:true
      });
      return false;
    }
    return true;
  },

  goWithdraw(){
    if(!this.check()){
      return ;
    }
    httpClient.bankEdit({
      bank_name:this.data.bank_name,
      bank_open_address:this.data.bank_open_address,
      bank_open_name:this.data.bank_open_name,
      bank_number:this.data.bank_number,
      bank_number_name:this.data.bank_number_name,
      action_id:actionId['6'],
      token:app.globalData.token,
      id:this.data.id,
      bank_id:this.data.bank_id,
      bank_code:this.data.bank_code
    }).then(res =>{
      if(res.data.code == 10000){
        wx.redirectTo({ url: '../withdraw_main/withdraw_main' });
      }else{
        $Toast({
          content: res.data.msg,
          type: 'error',
          mask:true
        });
      }
    }).catch(err => {
      $Toast({
        content: err.msg,
        type: 'error',
        mask:true
      });
    })
   
  }
})
