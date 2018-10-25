// pages/administrator/add_admin/add_admin.js
import {
  actionId
} from '../../../url.js';

import {
  adminSearch,
  adminEdit,
  adminDetail,
  index
} from '../../../getData.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //搜索框
    inputShowed: false,
    name: '',
    job: "",
    rules: [],
    rulesNames: [],
    res: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.init(options);
  },
  init(options) {
    index(app.globalData.token).then(res => {

      var rule = new Array(res.data.actions.length);
      for (var i = 0; i < rule.length; i++) {
        rule[i] = false;
      }
      // for(var i=0;i<res.data.actions.length;i++){
      //   res.data.actions[i].isSelect=false;
      // }
      this.setData({
        rulesNames: res.data.actions,
        rules: rule
      })
     
    }).then(()=>{
      adminDetail('12', app.globalData.token, options.id).then(res => {
        console.log(res)
        this.setData({
          res:res.data,
          name:res.data.name,
          job:res.data.job
        })
        console.log(this.data.rulesNames);
        for(var key in this.data.rulesNames){
          for(var j=0;j<res.data.rules.length;j++){
            if(this.data.rulesNames[key].id==res.data.rules[j]){
              
              this.data.rules[key]=true;
            }
           
          }
        }
        this.setData({
          rules:this.data.rules
        })
        console.log(this.data.rules);
      })
    })
    
    
  },
  setName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  setJob(e) {
    this.setData({
      job: e.detail.value
    })
  },
  setRules(e) {
    var index = e.target.dataset.idx;
    this.data.rules[index] = !this.data.rules[index];
    this.setData({
      rules: this.data.rules
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  goList(e){
    var arr = [];
    this.data.rules.forEach((ele,index) =>{
      if(ele){
        arr.push(this.data.rulesNames[index].id)
      }
    })
  
    adminEdit('12',app.globalData.token,e.target.dataset.id,this.data.name,this.data.job,arr.join(',')).then(res=>{
      console.log(res)
    })
    // fly.post(URL.adminEdit,{action_id:actionId['12'],token: app.globalData.token,uid: e.target.dataset.id,name:this.data.name,job:this.data.job,rules:this.data.rules}).then(res =>{
    //   if(res.code == 10000){
    //     console.log('添加成功');
    //   }
    // }).catch(err =>{

    // })

    wx.navigateTo({
      url: '../admin_list/admin_list',
    })
  }
  
})