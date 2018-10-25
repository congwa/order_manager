// pages/classification/creat_classification/creat_classification.js
const { $Toast } = require('../../../iview/base/index');
import { httpClient  } from '../../../http.js';
import { actionId } from '../../../url.js';

var app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    id:'',
    title:'',
    sort:''
  },

  onLoad(options){
    var id = options.id;
    this.setData({
      id:id,
      title:options.title,
      sort: options.num
    })
  },

  title(e){
    this.setData({
      title:e.detail.value
    })
  },

  sort(e){
    this.setData({
      sort:e.detail.value
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
    if(!this.data.sort){
      $Toast({
        content: '请输入正确的排序号',
        type: 'error',
        mask:true
      });
      return false;
    }
    return true;
  },

  goWithdraw(){
    if(!this.check()){
      return false;
    }
    if(this.data.id){
      this.upData();
    }else{
      this.add();
    }
  },

  add(){
    httpClient.edit({
      action_id:actionId['11'],
      token:app.globalData.token,
      title:this.data.title,
      sort:this.data.sort
    }).then(e =>{
      if(e.data.code == 10000){
        wx.navigateBack({
          delta: 1
        });
      }
    })
  },

  upData(){
    httpClient.edit({
      action_id:actionId['11'],
      token:app.globalData.token,
      title:this.data.title,
      sort:this.data.sort,
      id:this.data.id
  }).then(e =>{
      if(e.data.code == 10000){
        wx.navigateBack({
          delta: 1
        });
      }
    })
  }
})
