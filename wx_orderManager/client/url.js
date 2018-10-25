// export var root = 'https://www.yblcloud.com/';

import flys from './fly';
export var fly = flys;   


 var BASE_URL = 'https://www.xjsgcn.cn/';
//var BASE_URL =' https://www.food.local/';

export var root = BASE_URL;

export var URL = {
    // map ak
    qqMapKey:'',

    login     : root +'storeapi/login/login',
    phone     : root +'storeapi/login/phone',
    checkPhone: root +'storeapi/login/checkPhone',
    
    index     : root+ 'storeapi/index/index',
    notice    : root + 'storeapi/notice/index',
    order     : root +'storeapi/order/detail',
    orderIndex: root +'/storeapi/order/index',
    search    : root +'storeapi/order/search',
    storeimgs : root + 'storeapi/imgs/index',
   
    setPhone : root + 'storeapi/login/phone',

    // 菜品管理相关
    foodList: root + 'storeapi/food',
    foodDel : root + 'storeapi/food/del',
    foodEdit : root + 'storeapi/food/edit', // 编辑和添加

    
    // 预定管理相关
    reserveList : root + 'storeapi/bespeak/index', //预定列表
    operate : root + 'storeapi/bespeak/operate',   // 接受或者拒绝


    // 核销相关
    // 核销列表
    confirmList: root + 'storeapi/confirm/index',
    confirmTo: root + 'storeapi/confirm/confirm',

 
    

    //图片上传
    upLoadImg: root + 'storeapi/upload/up',


    // 菜品分类相关
    classfly  : root +'storeapi/classfly/index', // 列表
    edit      : root +'storeapi/classfly/edit',  // 编辑&添加
    del       : root +'storeapi/classfly/del',   // 删除

    // 打印机相关
    putAdd    : root +'storeapi/put/add',    // 添加
    putDel    : root +'storeapi/put/del',   // 删除
    putList   : root +'storeapi/put/index',  // 列表
    putPrint  : root +'storeapi/put/printorder',    // 打印

    // //优惠券相关
    countEdit: root +'storeapi/discount/edit', // 添加
    countList: root +'storeapi/discount/index', // 列表
    countDel : root +'storeapi/discount/del', // 列表

    // 提现相关
    bankDetail : root+'storeapi/bank/detail', // 列表
    bankEdit   : root+'storeapi/bank/edit', // 添加
    bankPayList: root+'storeapi/pay/index', // 提现列表
    bankMoney  : root+'storeapi/pay/money', // 金额
    bankPull   : root+'storeapi/pay/pull', // 零钱提现
    bankCancel : root+'storeapi/pay/cancel', // 取消提现  1为零钱 2为银行卡
    bankBanks : root+'storeapi/bank/index', // 获取银行卡
    cancelWithdraw:root+'/storeapi/pay/cancel',
    bankNews : root +'storeapi/pay/news',  // 提现消息

    // 公告提示
    noticeDetail : root + 'storeapi/notice/info',  //公告详情
    noticeEdit : root + 'storeapi/notice/edit',  //公告编辑

    

    // 相册
    imgsEdit : root + 'storeapi/imgs/edit',  //编辑或者添加 相册
    imgsDel : root + 'storeapi/imgs/del',    // 删除 相册 
    imgsList : root + 'storeapi/imgs/index', // 相册列表

    // 管理员相关
    adminSearch: root + 'storeapi/admin/search',
    adminEdit  : root + 'storeapi/admin/edit',  // 编辑或者添加
    adminList  : root + 'storeapi/admin/index', // 列表
    adminDetail: root + 'storeapi/admin/detail', // 详情
    adminDel   : root + 'storeapi/admin/del', //  删除

    // 客服相关
    serviceIndex  : root + 'storeapi/service/index', //  客服 - 二维码与电话

    //入驻相关
    enterIndex  : root + 'storeapi/enter/index', //  客服 - 二维码与电话

    // 二维码
    qrCodeEdit : root + 'storeapi/qr/edit',
    qrCodeList : root + 'storeapi/qr/index',
    qrCodeDel : root + 'storeapi/qr/del',
    qrCodeDown : root + 'storeapi/qr/down',  // 下载 
    qrCodeTemplet : root + 'storeapi/qr/templet', // 模板列表

 // 经营数据相关
    marketList: root  + 'storeapi/marketing/index',
    marketMoney:  root + 'storeapi/marketing/total', // 总金额

//店铺信息（基础设施）
//    baseLists : root +'storeapi/base/index',//基础设施 - 列表
//    baseInfo:root + 'storeapi/base/info',//基础设施 - 选中的详情
//    baseEdit : root + 'storeapi/base/edit',//基础设施 - 编辑

   //基础信息完善
   baseinfoEdit:root+'storeapi/baseinfo/edit',//基础信息完善 - 编辑
   baseinfoInfo:root + 'storeapi/baseinfo/info', //基础信息完善 - 详情

   //商户分类
   merchantsClassify:root+'storeapi/nav/index', 
//店铺信息（基础设施）
   baseLists : root +'storeapi/base/index',//基础设施 - 列表
   baseInfo:root + 'storeapi/base/info',//基础设施 - 选中的详情
   baseEdit : root + 'storeapi/base/edit',//基础设施 - 编辑

   //基础信息完善
   baseinfoEdit:root+'storeapi/baseinfo/edit',//基础信息完善 - 编辑
   baseinfoInfo:root + 'storeapi/baseinfo/info', //基础信息完善 - 详情
   //商户分类
   merchantsClassify:root+'storeapi/nav/index' ,
   //入驻
    enterList: root +'storeapi/enter/index',//入住 - 审核结果
    enterRegisters:root +'storeapi/enter/register',// 商户 - 入住

    //店铺信息 - 证件信息完善 
    certificateEdit:root+'storeapi/certificates/edit', //编辑
    certificatesInfo:root+'storeapi/certificates/info', //详情
      //店铺信息(满减)
   decreaseEdit : root + 'storeapi/decrease/edit',//满减 - 添加
   decreaseDetails :root +'storeapi/decrease/index',//满减 - 列表
   decreaseDel : root +'/storeapi/decrease/del', //满减 - 删除
  //生成小程序二维码
 formCode:'https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN'

}

export var code = {
    "10000":"成功",
    "10001":"失败",
    "10002":"商户不存在",
    "10003":"功能无权限",
    "10004":"未登录,或已失效",
    "10005":"用户添加失败",
    "20001":"参数不全",
    "30001":"已存在",
    "30002":"微信code获取失败"
}

export var actionId= {
    '1':1,  //订单管理功能
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    '10':10,
    '11':11,
    '12':12,
    '13':13,
    '14':14,
    '15':15
}
export var limits={
    '1':' 订单管理 ',
    '2':'菜品管理',
    '3':'经营数据',
    '4':'核销',
    '5':'预定管理',
    '6':"提现",
    '7':'',
    '8':"优惠券",
    '9':"商家相册",
    '10':"店铺信息",
    '11':"菜品分类",
    '12':"管理员",
    '13': "二维码",
    '14':"打印机",
    '15':"平台客服"
}