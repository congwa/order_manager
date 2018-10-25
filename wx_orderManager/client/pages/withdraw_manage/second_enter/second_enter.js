import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';
var app = getApp();
import { bankDetail} from '../../../getData';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bank_name:'',
    bank_open_address:'',
    bank_open_name:'',
    bank_number:'',
    bank_number_name:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bankDetail('6',app.globalData.token).then(res => {
      if(res.code == 10000){
        this.setData({
          id:res.data.id,
          bank_name:res.data.bank_name,
          bank_open_address:res.data.bank_open_name,
          bank_number:res.data.bank_number,
          bank_number_name:res.data.bank_number_name
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
  setBank(e){
    this.setData({
      bank_name:e.detail.value
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

  goWithdraw(){
    // httpClient.bankEdit({
    //   bank_name:this.data.bank_name,
    //   bank_open_address:this.data.bank_open_address,
    //   bank_open_name:this.data.bank_open_name,
    //   bank_number:this.data.bank_number,
    //   bank_number_name:this.data.bank_number_name,
    //   action_id:actionId['6'],
    //   token:app.globalData.token,
    //   id:'' 
    // }).then(res =>{
    //   if(res.data.code == 10000){

    //   }
    // })
    wx.navigateTo({
      url: '../first_enter/first_enter?id='+this.data.id
    })
  }
})