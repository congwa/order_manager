// pages/administrator/add_admin/add_admin.js
import {actionId} from '../../../url.js';

import {adminSearch ,adminEdit,adminDetail,index} from '../../../getData.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //搜索框
    inputShowed: false,
    name:'',
    job:"",
    rules:[false,false,false,false],
    rulesNames:['订单管理','菜品管理','经营数据','预订管理'],
    res:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  setName(e){
    this.setData({
      name:e.detail.value
    })
  },

  setJob(e){
    this.setData({
      job:e.detail.value
    })
  },
  setRules(e){
    var index = e.target.dataset.idx;
    this.data.rules[index] = !this.data.rules[index];
    this.setData({
      rules:this.data.rules
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

  goList(e){
    var arr = [];
    this.data.rules.forEach((ele,index) =>{
      if(ele){
        arr.push(this.data.rulesNames[index].id)
      }
    })
    if (!this.data.name){
      wx.showToast({
        title: '姓名不能为空',
      })
      return;
    } else if (!this.data.job){
      wx.showToast({
        title: '职位不能为空',
      })
      return;
    } else if (!arr.join(',')){
      wx.showToast({
        title: '请选择权限',
      })
      return;
    }
    adminEdit('12',app.globalData.token,e.target.dataset.id,this.data.name,this.data.job,arr.join(',')).then(res=>{
      console.log(res)
      wx.showToast({
        title: res.msg,
      })
      if(res.code==10000){
        wx.redirectTo({
          url: '../admin_list/admin_list',
        })
      }
    })
    // fly.post(URL.adminEdit,{action_id:actionId['12'],token: app.globalData.token,uid: e.target.dataset.id,name:this.data.name,job:this.data.job,rules:this.data.rules}).then(res =>{
    //   if(res.code == 10000){
    //     console.log('添加成功');
    //   }
    // }).catch(err =>{

    // })

   
  },
  //搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  //确认搜索
  searchOrder(e){
    adminSearch('12',app.globalData.token,e.detail.value).then(res=>{
      console.log(res);
      if(res.data){
            this.setData({
              res:res.data
            })
          }else{
            wx.showModal({
              title: '搜索结果',
              content: '没有此手机号用户',
              showCancel: true,
              cancelColor: '#000000',
              confirmText: '确定',
              confirmColor: '#3CC51F',
              success: (result) => {
                if(result.confirm){
                  
                }
              },
              fail: ()=>{},
              complete: ()=>{}
            });
          }
          // var id= res.data.id;
          // return id;
    }).then(()=>{
      index(app.globalData.token).then(res=>{
       
        var rule=new Array(res.data.actions.length);
        for(var i=0;i<rule.length;i++){
          rule[i]=false;
        }
        // for(var i=0;i<res.data.actions.length;i++){
        //   res.data.actions[i].isSelect=false;
        // }
        this.setData({
          rulesNames:res.data.actions,
          rules:rule
        })
        console.log('tyjyugthjghkjgk',this.data.rulesNames,this.data.rules)
      })
    })
   
  },
  /**
 * 输入改变的回调函数
 */
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    // this.auto();
    console.log(this.data.inputVal, e);
  }
})