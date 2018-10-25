

import { URL } from "./url";
function fetch(argu,url){
    return new Promise((resove, reject)=> {
      wx.request({
        url:url,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:argu,
        method: 'POST',
        success: (res) => {
           wx.hideLoading();
          resove(res);
        },
        fail: (e) =>{
          wx.hideLoading();
          reject(e)
        }
      })
    })
  }

class Http {
    constructor(){}

    login(argu){ return fetch(argu,URL.login)}

    phone(argu){return fetch(argu,URL.phone)}

    checkPhone(argu){return fetch(argu,URL.checkPhone)}
    
    index(argu){return fetch( argu,URL.index)}

    notice(argu){return fetch( argu,URL.notice)}




    order(argu){return fetch( argu,URL.order)}

    orderIndex(argu){return fetch( argu,URL.orderIndex)}

    search(argu){return fetch( argu,URL.search)}
    
    food(argu){return fetch( argu,URL.foodList)}
    storeimgs(argu) { return fetch(argu, URL.storeimgs)}

    foodDel(argu){return fetch( argu,URL.foodDel)}

    reserveList(argu){return fetch( argu,URL.reserveList)}
    operate(argu){return fetch( argu,URL.operate)}

    
    confirmList(argu){return fetch( argu,URL.confirmList)}

    // 菜品分类相关
    classfly(argu){return fetch( argu,URL.classfly)}
    edit(argu){return fetch( argu,URL.edit)}
    del(argu){return fetch( argu,URL.del)}

    // 打印机相关
    putAdd(argu){return fetch( argu,URL.putAdd)}
    putDel(argu){return fetch( argu,URL.putDel)}
    putList(argu){return fetch( argu,URL.putList)}
    putPrint(argu){return fetch( argu,URL.putPrint)}


    //优惠券相关
    countEdit(argu){return fetch( argu,URL.countEdit)}
    countList(argu){return fetch( argu,URL.countList)}
    countDel(argu){return fetch( argu,URL.countDel)}

    // 银行卡相关
    bankDetail(argu){return fetch( argu,URL.bankDetail)}
    bankEdit(argu){return fetch( argu,URL.bankEdit)}
    bankPayList(argu){return fetch( argu,URL.bankPayList)} 
    bankMoney(argu){return fetch( argu,URL.bankMoney)}
    bankPull(argu){return fetch( argu,URL.bankPull)}
    bankCancel(argu){return fetch( argu,URL.bankCancel)}

    // 公告
    noticeDetail(argu){return fetch( argu,URL.noticeDetail)}

    // 相册 
    imgsEdit(argu){return fetch( argu,URL.imgsEdit)}  // 编辑或者添加 相册
    imgsDel(argu){return fetch( argu,URL.imgsDel)}    // 删除 相册 
    imgsList(argu){return fetch( argu,URL.imgsList)}  // 相册列表
    
}
  
  
export var httpClient = new Http();