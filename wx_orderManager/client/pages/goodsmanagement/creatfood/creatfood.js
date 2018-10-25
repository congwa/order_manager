import { httpClient } from '../../../http.js';
import { actionId ,URL} from '../../../url';
const { $Toast } = require('../../../iview/base/index');
import regeneratorRuntime, { async } from '../../../regenerator-runtime/runtime';
const  util  = require('../../../utils/util');
var app = getApp();
import { foodList,foodEdit ,classflyList } from '../../../getData.js';
Page({
 

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    data:{},
    id:'',
    sortList: [],
    classfly:'', // 分类id
    title:'',
    expand:'',
    price:'',
    recommend:'不推荐',
    summary:'',
    img:'',
    imgUp:'',
    sort:'',
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    if(id){
      this.setData({
        id:id
      })
    }
    this.init(options);
  },
  async init(options){
    this.setData({
      loading:true
    })
    await classflyList('2',app.globalData.token).then(res => {
      if(res.code == 10000){
        this.setData({
          sortList:res.data,
          classfly:res.data[this.data.index].id
        })
      }
    })
    await foodList('2',app.globalData.token).then(res => {
      if(res.code == 10000){
        this.setData({
          data:res.data
        })
      }
    }).then(()=>{
      if(this.data.id){
       var food = this.search(this.data.id);
       if(food){
        this.setData({
          title:food.title,
          ctitle:food.ctitle,
          expand:food.expand.join(','),
          price:food.price,
          summary:food.summary,
          img:food.img,
          classfly:food.classfiy_id,
          sort:food.asort
        })
       }
      }
    })
    this.setData({
      loading:false
    })
  },
  search(id){
    var data = this.data.data;
    for(var i in data){
      var food = data[i];
      for(let j=0;j<food.length;j++){
        if(food[j].id == id){
          return food[j];
        }
      }
    }
    return false;
  },

  selectImage(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var upData = {
          url:URL.upLoadImg,
          filePath:tempFilePaths[0],
          name:'image',
          formData:{
            token:app.globalData.token,
            image:tempFilePaths[0]
          }
        }
        util.upLoadImg(upData).then(res =>{
          var log = JSON.parse(res.data).data;
          that.setData({
            img:log.url,
            imgUp:log.path
          })
        })
      }
    })
  },

  setTitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  setExpand(e){
    this.setData({
      expand:e.detail.value
    })
  },
  setPrice(e){
    this.setData({
      price:e.detail.value
    })
  },
  setSort(e){
    this.setData({
      sort:e.detail.value
    })
  },
  setSummary(e){
    this.setData({
      summary:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      ctitle: this.data.sortList[e.detail.value].title,
      classfly:this.data.sortList[e.detail.value].id
    })
  },

  radioChange(e){
    console.log(e);
    this.setData({
      recommend:e.detail.value
    })
  },

  // 检测是否填写正确
  check(){
    if(!this.data.title){
      $Toast({
        content: '请输入正确的菜名',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.classfly){
      $Toast({
        content: '请选择正确的分类',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.expand){
      $Toast({
        content: '请输入正确的口味',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.price){
      $Toast({
        content: '请输入正确的价格',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.sort){
      $Toast({
        content: '请输入正确的排序',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.summary){
      $Toast({
        content: '请输入正确的简介',
        type: 'error',
        mask:true
      });
      return false;
    }
    if(!this.data.img){
      $Toast({
        content: '请上传图片',
        type: 'error',
        mask:true
      });
      return false;
    }
    return true;
  },
  goEdit(){
    if(!this.check()){
      return false;
    }
    foodEdit('2',app.globalData.token,this.data.title,this.data.sort,this.data.classfly,this.data.price,this.data.imgUp,this.data.summary,this.data.expand,this.data.recommend,this.data.id).then(res =>{
      if(res.code ==10000){
        wx.redirectTo({
          url: '../../goodsmanagement/order/order',
        })
      }else{
       
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
