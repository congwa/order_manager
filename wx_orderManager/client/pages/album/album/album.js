import URL from '../../../url.js';
import { httpClient } from '../../../http.js';
import { imgsDel} from '../../../getData.js';
import regeneratorRuntime from '../../../regenerator-runtime/runtime';
var app = getApp();

Page({
  data: {
    loading:true,
    grids: [],
    gridsSelect:[],
    editflag:false,
    edittitle:'编辑'
  },
  onLoad:function(){
   this.init();
  },
  async init(){
    this.setData({
      loading:true
    })
    // for(var i=0;i<this.data.grids.length;i++){
    //    var ob={};
    //    ob.idx=i;
    //    ob.content=this.data.grids[i];
    //    this.data.grids[i]=ob;
    // }
    // console.log(this.data.grids);
    await httpClient.storeimgs({action_id: "9", token: app.globalData.token}).then(res=>{
      if(res.data.code ==10000){
        if(res.data.data.length == 0){
          wx.navigateTo({
            url: '../empty_album/empty_album'
          });
          return;
        }
        // 设置全部未选中状态
        res.data.data.forEach((element,index) => {
          res.data.data[index].selectflag = false;
        });
        this.setData({
          grids:res.data.data
        })
        console.log(this.data.grids);
      }
    
    })

    this.setData({
      loading:false
    })
  },
  showedit(){
    this.setData({
      editflag:!this.data.editflag
    })
    if(this.data.editflag==false){
      this.setData({
        edittitle: '编辑'
      })
    }else{
      this.setData({
        edittitle: '取消'
      })
    }
  },
  select(e){
    if(this.data.editflag==false){
      return;
    }
    this.data.grids[e.currentTarget.dataset.idx].selectflag= !this.data.grids[e.currentTarget.dataset.idx].selectflag;  
    console.log(this.data.grids);
    this.setData({
     // edittitle: '取消',
     // editflag: false,
      grids:this.data.grids
    })
  },

  addImgs(e){
    wx.navigateTo({
      url: '../creat_album/creat_album',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  imgsDel(e){
    var arr = [];
    this.data.grids.forEach(ele => {
      if(ele.selectflag){
        arr.push(ele.id);
      }
    })
    var id = arr.join(',');
    imgsDel('9',app.globalData.token,id).then(res =>{
      if(res.code == 10000){
        this.init();
      }
    })
  },
  imgsSelect(e){
    this.data.grids.forEach((e,i)=>{
      this.data.grids[i].selectflag = true;
    })
    this.setData({
      grids:this.data.grids
    })
  }
});