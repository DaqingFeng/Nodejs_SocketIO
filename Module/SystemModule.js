

var SysModule = {
    UserInfo: {//登录用户信息
        //登录用户信息
        BankName: "",
        BankNo: "",
        CertNote: null,
        CertState: 0,
        Company: "",
        CompanyType: "",
        DDUserId: "",
        FirmId: "",
        Id: "",
        LoastLoginTime: "",
        Person: "",
        QQ: "",
        SystemCert: "",
        UserName: "",
        UserType: "",
        //订阅
        SERIES: '',
        MATERIAL: '',
        SURFACE: '',
        SCORE: 0,
    },

    DeliverInfo: {//发求购 | 确认求购
        USERID: '',//发求购用户ID
        REQUIREID: '',//发布求购ID
        SERIES: '',//系列
        MATERIAL: '',//材质
        SURFACE: '',//表面
        EXPIRES: '',//过期时长
        DETAIL: '',//找货详情
        LOCATION: '',//客户位置
        EXTRA: '',//找货扩展信息
        DELIVERY: "",//交货地
        //------------------返回确认求购参数
        OFFER_USERID: '',//报价人用户ID---当确认报价后需要使用该属性验证userid
        OFFERID: '',//报价ID
        PRICE: 0,
        OFFER_EXPIRES: '',
        NOTE: '',
        OFFER_LOCATION: '',
    },

    Quoted: {//报价信息
        OFFER_USERID: '',//报价人ID
        USERID: '',//求购人用户Id---当发送抢单信息时，需要使用验证userid
        REQUIREID: '',//求购ID
        OFFERID: '',//报价ID
        PRICE: '',
        NOTE: '',
        OFFER_LOCATION: '',
    }
};
module.exports.SystemModule = SysModule;

