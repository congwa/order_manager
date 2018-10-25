/**
 * 封装统一的ajax请求，统一拦截请求，对不同的请求状态封装
 * 通常说, ajax 请求错误有两种, 一种是网络问题或者代码问题所造成的 400, 500错误等,需要checkStatus方法拦截
 * 另外一种是请求参数后端通不过验证, 由后端抛出的错误，需要checkCode拦截处理
 *第二种根据不同的后端框架或者程序猿又可以分成两种, 一种是直接返回 json, 用一个 特别的 code 来区别正常请求返回的数据, 如:
 */
var Fly = require('./utils/wx.js');
import {root} from './url';
var fly = new Fly();

/**
 * fly请求拦截器
 * @param {object} config fly请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
fly.interceptors.request.use(config => {
  // 检测是否需要加载提示
  if(config.body.editLoading){ 
     wx.showLoading({
      title: '',
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
 // console.log('request',config);
  return config
}, err => {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if(!config || !config.retry) return Promise.reject(err);
  
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;
  
  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
  }
  
  // Increase the retry count
  config.__retryCount += 1;
  
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
      setTimeout(function() {
          resolve();
      }, config.retryDelay || 1);
  });
  
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
      return fly(config);
  });
})

/**
 * fly 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
fly.interceptors.response.use(response => {
  var name = '';
  switch (response.data.code) {
    case 10000:
      console.log('response',response); 
      if(response.request.body.editLoading){ //如果是提交相关的给与提示
        wx.showToast({
          title: '成功', //提示的内容,
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
  
          }
        });
      }
      return response;
    break;
    case 10001: 
     name ="失败";
    break;
    case 10002:
    name ="商户不存在";
    break;
    case 10003:
    name ="功能无权限";
    break;
    case 10004:
    name ="未登录,或已失效";
    break;
    case 10005:
    name ="用户添加失败";
    break;
    case 20001:
    name ="参数不全";
    break;
    case 30001:
    name ="已存在";
    break;
    case 30002:
    name ="微信code获取失败";
    break;
    case 30003:
    name ="没有token";
    break;
    case 30004:
    name ="没有搜索参数";
    break;
    case 30005:
    name ="没有订单编号";
    break;
    case 30006:
    name ="没有数据";
    break;
    case 30007:
    name ="没有标题";
    break;
    case 30008:
    name ="超出长度或大小范围";
    break;
    case 30009:
    name ="小于长度或大小范围";
    break;
    case 30010:
    name ="核销码不对";
    break;
    case 30011:
    name ="禁止登录";
    break;
    case 30012:
    name ="超出提现类型最大额度";
    break;
    case 30013:
    name ="超出每日最大额度";
    break;
    case 30014:
    name ="分类下有菜品不能删除该分类";
    break;
  
    default:

      break;
  }
  wx.hideLoading();
  wx.showToast({
    title: name,
    icon: 'none',
    image: '',
    duration: 1500,
    mask: false,
    success: (result)=>{
      
    },
    fail: ()=>{},
    complete: ()=>{}
  });
  return response
}, error => {
  return Promise.resolve(error)
})

/**
 * 请求发出后检查返回的状态码,统一捕获正确和错误的状态码，正确就直接返回response,错误就自定义一个返回对象
 * @param {object} response 响应对象
 * @return {object} 响应正常就返回响应数据否则返回错误信息
 **/
function checkStatus (response) {
  // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
  if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
    return response.data // 直接返回http response响应的data,此data会后端返回的数据数据对象，包含后端自定义的code,message,data属性
  }
  wx.hideLoading();
  return { // 自定义网络异常对象
    code: '404',
    message: '网络异常'
  }
}

/**
 * 检查完状态码后需要检查后如果成功了就需要检查后端的状态码处理网络正常时后台语言返回的响应
 * @param {object} res 是后台返回的对象或者自定义的网络异常对象，不是http 响应对象
 * @return {object} 返回后台传过来的数据对象，包含code,message,data等属性，
 **/
// function checkCode (res) {
//   // 如果状态码正常就直接返回数据
//   console.log(res)
//   if (res.code === -404) { // 这里包括网络异常，服务器异常等这种异常跟业务无关，直接弹窗警告
//     alert(res.message)
//     return {code: '', message: '网络错误'}
//   } else { // 除了上面的异常就剩下后端自己返回的状态code了这个直接返回出去供调用时根据不同的code做不同的处理
//     return res
//   }
// }

export default {
  post (url, data) {
    return fly.request(url,data,{
      method: 'post',
      baseURL:root,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  // 会转为字符串
      },
      timeout: 10000,
      parseJson:true
    }).then((res) => {
      return checkStatus(res)
    })
  },
  get (url, params) {
    return fly.request({
      method: 'get',
      baseURL: root,
      url,
      params,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  }
}