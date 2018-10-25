
export var tabBar = {
    off           : 0,
    on            : 1   //在tabBar中 跳转应该用 switchBar
}

export var path   = {
    intent        : {
        path      : '../intent/indent',
        type      : tabBar.on
    },
    mycenter      : {
        path      : '../mycenter/mycenter',
        type      : tabBar.on
    },
    ordercurrent  : {
        path      : '../ordercurrent/ordercurrent',
        type      : tabBar.off
    },
    order         : {
        path      : '../order/order',
        type      : tabBar.off
    },
    pay_input     : {
        path      : '../pay_input/pay_input',
        type      : tabBar.off
    }
}

