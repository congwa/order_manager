//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
import {URL} from './url'
import { resolve } from 'path';

App({
    onLaunch: function () {
        //qcloud.setLoginUrl(config.service.loginUrl)
        var _this = this;
      
    },
    bindGetUserInfo: function (event) {
        //使用
        var _this = this;
        var app = this;
        // wx.showLoading({
        //     title: '尝试登录中',
        // })
        return new Promise((resove, reject) => {
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.login({
                            success: function (res) {
                                var code = res.code; //登录凭证
                                if (code) {
                                    //2、调用获取用户信息接口
                                    wx.getUserInfo({
                                        success: function (res) {
                                            console.log('userInfo:  ', res);
                                            app.globalData.userInfo = res.userInfo;
                                            console.log('app:  ', app);
                                            console.log({
                                                encryptedData: res.encryptedData,
                                                iv: res.iv,
                                                code: code
                                            })
                                            //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                                            wx.request({
                                                url: URL.login, //自己的服务接口地址
                                                method: 'get',
                                                header: {
                                                    'content-type': 'application/x-www-form-urlencoded'
                                                },
                                                data: {
                                                    encryptedData: res.encryptedData,
                                                    iv: res.iv,
                                                    code: code,
                                                    action_id: -1
                                                },
                                                success: function (data) {
                                                    if (data && data.data && data.data.code==10000) {
                                                        app.globalData.token = data.data.data;
                                                        _this.login = true;
                                                        wx.hideLoading();
                                                        wx.request({
                                                            data: {
                                                                token: app.globalData.token,
                                                                action_id: -1
                                                            },
                                                            url: URL.checkPhone,
                                                            success: e => {
                                                                console.log('绑定手机号', e);
                                                                if (e.data.data == 1) {
                                                                    _this.showNum = true;
                                                                    resove('1');
                                                                    return;
                                                                }
                                                                resove('0');
                                                            }
                                                        })
                                                    }
                                                    //4.解密成功后 获取自己服务器返回的结果
                                                    if (data.statusCode == 200) {
                                                      
                                                    } else {
                                                        console.log('解密失败')
                                                        reject();
                                                    }

                                                },
                                                fail: function () {
                                                    console.log('系统错误')
                                                    reject();
                                                }
                                            })
                                        },
                                        fail: function () {
                                            console.log('获取用户信息失败')
                                            reject();
                                        }
                                    })

                                } else {
                                    console.log('获取用户登录态失败！' + r.errMsg)
                                    reject();
                                }
                            },
                            fail: function () {
                                console.log('登陆失败')
                                reject();
                            }
                        })
                    } else {
                        console.log('获取用户信息失败')
                        reject();
                    }
                }
            })
        })
    },
    /**
     *检测是否跳转
     *login true   showNum:true authorizeUserInfo:1 那么就可以不跳转
     */
    isMask(argu) {
        /**
         * 同时都满足
         */
        if (this.login && this.showNum && this.authorizeUserInfo == 2) {
            return false;
        } else if (this.login && this.authorizeUserInfo == 1) {
            return false;
        }

        wx.navigateTo({
            url: '../az/az?argu=' + JSON.stringify(argu)
        });
        return true;
    },
    // 获取屏幕高度
    getWindowHeight(){
        var that = this;
        return new Promise((resolve,rejuect)=>{
            if(that.windowHeight){
                resolve(that.windowHeight);
            }else{
                wx.getSystemInfo({
                    success: res => {
                        that.windowHeight = (res.windowHeight * (750 / res.windowWidth));
                        resolve( that.windowHeight );
                    }
                });
            }
        })
    },

    windowHeight:'',
    /**
     * 是否登录
     */
    login: false,

    /**
     * 是否授权了手机号
     */
    showNum: false,

    /**
     * 这次登录是否授权UserInfo
     * 1：没有授权
     * 2：已经授权
     */
    authorizeUserInfo: 1,

    /**
     * 全局变量数据
     */
    globalData: {
        userInfo: null, // userInfo微信的
        token: null, //登录后的token值 
        systemInfo: null, //用户当前手机信息
        area: null, //本程序支持的所有区域的信息详情
        windowHeight: 900
      
    },
})