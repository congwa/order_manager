import {URL,fly, actionId,limits} from '../../../url.js';

import { adminSearch, adminEdit, adminDetail,adminDel } from '../../../getData.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limits:limits,
    selectAll:true,
    list: [],
    editflag: false,
    idStr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.init();
  },
  init(){
    fly.post(URL.adminList, { action_id: actionId['12'], token: app.globalData.token }).then(res => {
      console.log(res);
      this.setData({
        list: res.data
      })
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
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  showedit() {
    this.setData({
      editflag: !this.data.editflag
    })
  },
  handleFruitChange({ detail = {} }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
  },
  goCreat(){
    wx.navigateTo({
      url: '../add_admin/add_admin',
    })
  },
  goEdit(e){
    wx.navigateTo({
      url: '../edit_admin/edit_admin?id=' + e.target.dataset.id + '&name=' + e.target.dataset.name + "&job=" + e.target.dataset.job,
    })
  },
  checkboxChange(e){
    var x=e.currentTarget.id;
    console.log(this.data.idStr.indexOf(x));
    if(this.data.idStr.indexOf(x)==-1){
      this.data.idStr.push(e.currentTarget.id);
      this.setData({
           idStr:this.data.idStr
          })
    }else if(this.data.idStr.indexOf(x)>-1){
      this.data.idStr.splice(this.data.idStr.indexOf(x),1);
      this.setData({
           idStr:this.data.idStr
          })
    }
    console.log('当前',e.currentTarget.id);
    console.log('数组',this.data.idStr);
  },
  //删除管理员
  godel(){
    adminDel('12', app.globalData.token,this.data.idStr.join(',')).then(res=>{
      console.log(res);
      wx.showToast({
        title: res.msg,
      })
      if (res.code == 10000) {
          wx.showToast({
            title: '删除成功',
          })
        this.init();
      }
    })
  },
  selectAll(){ 
    this.setData({
      selectAll: !this.data.selectAll
    })
    if (this.data.selectAll){
      for (var i = 0; i < this.data.list.length; i++) {
        this.data.list[i].checked = false;
        this.data.idStr.splice(this.data.idStr.indexOf(this.data.list[i].id),1);
      }
    }else{
      for (var i = 0; i < this.data.list.length; i++) {
        this.data.list[i].checked = true;
        this.data.idStr.push(this.data.list[i].id);
      }
    } 
   
    this.setData({
      list:this.data.list,
      idStr:this.data.idStr
    })
    // console.log(this.data.list, this.data.idStr);
  }
})