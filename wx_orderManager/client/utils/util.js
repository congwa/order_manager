const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

// 图片上传
export var upLoadImg = function(argu){
    return new Promise((resove,reject)=>{
      wx.uploadFile({
        url:argu.url,
        filePath: argu.filePath ,
        name: argu.name ,
        formData: argu.formData== undefined?{}:argu.formData,
        success: (result)=>{
          resove(result)
        },
        fail: (err)=>{
            reject(err);
        },
        complete: (res)=>{
          console.log('上传文件成功');
        }
      });
    })
}


var merge = function (FirstOBJ, SecondOBJ) { // 深度合并对象
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
            merge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

//     for (var key in b) {
//         if (!a.hasOwnProperty(key)) {
//             a[key] = b[key];
//         } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
//             this.merge(a[key], b[key]);
//         }
//     }
//     return a;
// }

export var checkMobile = function (sMobile) {
    if (!(/^1[3|5][0-9]\d{4,8}$/.test(sMobile))) {
        return false;
    }
    return true;
}

// merge: function merge(a, b) {

function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


module.exports = {
    formatTime,
    showBusy,
    showSuccess,
    showModel,
    merge,
    upLoadImg,
    formatTimeTwo,
    checkMobile
}