// pages/notice/notice.js
import { httpClient } from '../../http.js';
import { actionId ,fly ,URL} from '../../url';
var app = getApp();
import { noticeDetail } from '../../getData';
Page({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    data:'',
    text:'',
    originText:'',
    maxlength:50
  },

  onLoad(e){
    // httpClient.noticeDetail({
    //   action_id:actionId['7'],
    //   app: app.globalData.token
    // }).then(res => {
    //   if(res.data.code == 10000){
    //     data: res.data.data
    //   } 
    // })
    noticeDetail('7',app.globalData.token).then( res =>{
      if(res.code == 10000){
          this.setData({
            text:res.data,
            originText:res.data
          })
      } 
    })
  },

  changeText(e){
    this.setData({
      text:e.detail.value
    })
  },
  // 提交
  submit(e){
    if (this.data.text == this.data.originText){
      wx.showModal({
        title: '',
        content: '您未修改任何内容哦',
      })
      return;
    }
    console.log(this.data.text, this.data.originText)
    fly.post(URL.noticeEdit,{
      action_id:actionId['7'],
      token: app.globalData.token,
      content: this.data.text
    }).then(res => {
      console.log(res)
      if(res.code == 10000){
        wx.showToast({
          title: '修改成功',
        })
        
      } 
    }).catch(err =>{
      
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
