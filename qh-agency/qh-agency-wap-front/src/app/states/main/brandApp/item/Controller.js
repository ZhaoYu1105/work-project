import cart from "!html-loader?minimize=true!./cart.html";
import conf from "../../../../conf";

var $scope,
    $http,
    $state,
    alertService,
    $log,
    $mdBottomSheet,
    $templateCache,
    loginService,
    $mdDialog,
    $timeout,
    $stateParams,
    $location;
class Controller {
    constructor(_$scope,
                _$http,
                _$state,
                _alertService,
                _$log,
                _$mdBottomSheet,
                _$templateCache,
                _loginService,
                _$mdDialog,
                _$timeout,
                _$stateParams,
                _$location) {
        $scope = _$scope;
        $http = _$http;
        $mdDialog = _$mdDialog;
        $state = _$state;
        $timeout = _$timeout;
        loginService = _loginService;
        $log = _$log;
        alertService = _alertService;
        $stateParams = _$stateParams;
        $mdBottomSheet = _$mdBottomSheet;
        $templateCache = _$templateCache;
        $location = _$location;
        /////////////////////////////////
        loginService.loginCtl(true, $location.absUrl());
        let vm = this;
        $scope.brandAppId = $stateParams.brandAppId;
        $scope.itemId = $stateParams.itemId;
        //联调api,获取数据
        $scope.getData = function () {
            $http({
                method: "GET",
                url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/111/item/" + $scope.itemId,
                params: {
                    type: 'PURCHASE'
                },
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                }
            }).then(function (resp) {
                    $scope.data = resp.data.data;

                    ///数据容错处理
                    if (!$scope.data.skus || $scope.data.skus.length == 0) {
                        alert("商品错误");
                        return;
                    }

                    // $scope.skuNum = {};
                    ////默认选中第0个
                    $scope.checkedSku = $scope.data.skus[0];
                    $scope.selectPrice = $scope.checkedSku.price;
                    //当前已选中的规格值,spec.value nameId为key，valueId为值
                    $scope.selectSpecs = {};
                    //默认选中一个
                    for (let i in $scope.data.specs) {
                        $scope.selectSpecs[$scope.checkedSku.specs[i].nameId] = $scope.checkedSku.specs[i].valueId;
                    }


                    /////计算最低价的sku
                    // vm.minPriceSku = $scope.data.skus[0];
                    // for (let i in $scope.data.skus) {
                    //     if (vm.minPriceSku.price > $scope.data.skus[i].price) {
                    //         vm.minPriceSku = $scope.data.skus[i];
                    //     }
                    // }
                    $scope.getList();

                    /*
                     * 将后台数据存入模板并绑定到页面
                     * */
                    var tplUrl = "/___/store/template/index/tpl";
                    $scope.tplUrl = tplUrl;
                    $templateCache.put(tplUrl, resp.data.data.detail);
                }
                ,
                function () {

                }
            );
        };
        $scope.getData();


        //------------------------------------------选择图片
        $scope.imgActive = '0';
        $scope.chooseImg = function (num) {
            if (num > $scope.data.imgs.length - 1) {
                return;
            } else {
                $scope.imgActive = num;
            }

        };

        //获取购物车列表
        $scope.getList = function () {
            $http({
                method: "GET",
                url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart",
                params: {
                    type: 'PURCHASE'
                },
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                }
            }).then(function (resp) {
                    $scope.comments = resp.data.data;
                    $scope.totlePrice = 0;
                    if ($scope.comments == null) {
                        console.log(11111112222)
                    }
                    else {
                        for (let i in $scope.comments) {
                            if ($scope.checkedSku.skuId == $scope.comments[i].sku.skuId) {
                                $scope.skuNum = $scope.comments[i].num;
                                break;
                            }
                            else {
                                $scope.skuNum = 0;
                            }
                        }
                    }
                    if (!resp.data.data) {
                        console.log('未添加');
                        $scope.totlePrice = 0;
                        return;
                    }
                    for (let i = 0; i < $scope.comments.length; i++) {
                        $scope.totlePrice += (Number($scope.comments[i].sku.price) * $scope.comments[i].num);
                    }
                }, function () {

                }
            );
        };

        ////点击规格
        $scope.clickedSpec = function (spec, curValue) {


            $scope.selectPrice = {};

            for (let i in $scope.data.specs) {
                $scope.selectSpecs[$scope.checkedSku.specs[i].nameId] = $scope.checkedSku.specs[i].valueId;
            }
            ////原有规格值备份
            let valueIdBak = $scope.selectSpecs[spec.nameId];

            //修改当前规格状态
            $scope.selectSpecs[spec.nameId] = curValue.valueId;
            let hasSku = false;
            //匹配sku
            for (let i in $scope.data.skus) {
                let sku = $scope.data.skus[i];
                let boo = true;
                for (let j in sku.specs) {
                    if ($scope.selectSpecs[sku.specs[j].nameId] != sku.specs[j].valueId) {
                        boo = false;
                        break;
                    }
                }
                if (boo) {
                    $scope.checkedSku = sku;
                    $scope.selectPrice = sku.price;


                    //测试单个sku图片
                    if (sku.imgs[0]) {
                        //存在
                        $scope.data.imgs[5] = sku.imgs[0];
                        $scope.chooseImg('5');
                    }
                    //console.log(sku.imgs[0]);
                    //$scope.data.imgs[5]='';

                    // console.log(111,$scope.data.imgs);


                    hasSku = true;
                    if ($scope.comments == null) {
                        break;
                    }
                    else {
                        for (let i in $scope.comments) {
                            if ($scope.checkedSku.skuId == $scope.comments[i].sku.skuId) {
                                $scope.skuNum = $scope.comments[i].num;
                                break;
                            }
                            else {
                                $scope.skuNum = 0;
                            }
                        }
                    }
                    break;
                }
            }
            if (!hasSku) {
                alertService.msgAlert("exclamation-circle", "当前规格缺货");
                $scope.selectSpecs[spec.nameId] = valueIdBak;
            }

        };


        //---------------------------------控制购物车红点变化
        $scope.warmchange = false;
        $scope.warnView = function () {
            $scope.warmchange = true;
            $timeout(function () {
                $scope.warmchange = false;
            }, 1000);
        };

        $scope.skuNum = 0;
        //输入框失去焦点
        $scope.skuNumBlur = function (num, sku) {
            $scope.skuNum = Number(num);
            //console.log(num,$scope.skuNum,typeof $scope.skuNum);
            if ($scope.skuNum == '') {
                $scope.skuNum = 0;
            } else if (!( /^\d+(\.\d+)?$/.test(num))) { //测试
                $scope.skuNum = 0;
                alertService.msgAlert("exclamation-circle", "请输入正整数");
            }
            if(!/^\d+$/.test($scope.skuNum)){
                $scope.skuNum = 0;
                alertService.msgAlert("exclamation-circle", "请输入整数");
            };
            if (sku.storage < $scope.skuNum) {
                alertService.msgAlert("exclamation-circle", "库存仅剩" + sku.storage + "件");
                $scope.skuNum = sku.storage;
            }
            $scope.warnView();
            if ($scope.skuNum <= 0) {
                $scope.skuNum = 0;
            }
            $scope.addCart($scope.skuNum, sku)
        };
        // 计算商品数量。进行加减
        $scope.skuNumCount = function (num, sku) {
            $scope.skuNum = Number($scope.skuNum);
            console.log(num, $scope.skuNum, typeof $scope.skuNum);
            //减到0
            if (num == -1) {
                if ($scope.skuNum <= 0) {
                    $scope.skuNum = 0;
                    return false;
                }
            }
            if ($scope.skuNum == '') {
               // console.log('zou')
                $scope.skuNum = 0;
            } else if (!( /^\d+(\.\d+)?$/.test($scope.skuNum))) { //测试
                $scope.skuNum = 0;
                console.log('=========2')
                alertService.msgAlert("exclamation-circle", "请输入正整数");
                return false;
            }

            if (num == 1 || num == -1) {
                console.log('$scope.skuNum',$scope.skuNum);
                $scope.skuNum += num;
                //
            } else {
                $scope.skuNum = num;
            }
            if (sku.storage < $scope.skuNum) {
                alertService.msgAlert("exclamation-circle", "库存仅剩" + sku.storage + "件");
                $scope.skuNum = sku.storage;
            }
            $scope.warnView();
            $scope.addCart($scope.skuNum, sku)
        };

        /*
         * 加入购物车中
         * */
        $scope.addCart = function (num, sku) {
            console.log('num', num);
            // if (sku.storage = num) {
            //     alertService.msgAlert("exclamation-circle", "最多可买" + num + "件").then(function () {
            //         $scope.skuNum = num;
            //     });
            //     return;
            // }
            $http({
                method: "PUT",
                url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart",
                params: {
                    num: num,
                    skuId: sku.skuId,
                    type: 'PURCHASE'
                },
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                }
            }).then(function (resp) {
                    // $scope.cartInfo();
                    $scope.getList();
                }, function () {

                }
            );
        };

        //顶部选项卡
        $scope.activeNum = 1;
        $scope.tabBtnClick = function (num) {
            $scope.activeNum = num;
        };
        // 生成订单
        $scope.orderCreate = function () {
            $scope.postParams = [];
            if ($scope.comments) {
                for (let i = 0; i < $scope.comments.length; i++) {
                    let tmpSku = {
                        skuId: $scope.comments[i].sku.skuId,
                        num: $scope.comments[i].num
                    };
                    $scope.postParams.push(tmpSku);
                }
            }
            if ($scope.postParams.length < 1) {
                // alertService.msgAlert("exclamation-circle", "您还没有选择任何商品哦");
                return;
            }

            $http({
                method: "POST",
                url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/order",
                data: $scope.postParams,
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                }
            }).then(function (resp) {
                    let orderData = resp.data;
                    /*.orderId*/
                    $scope.orderId = orderData.data;
                    $state.go("main.brandApp.order.checkOrder", {
                        orderId: $scope.orderId,
                        from: "CART"
                    }, {reload: true})

                }, function () {

                }
            );
        };

        $scope.formatNum = function (number) {
            if (!( /^\+?[1-9][0-9]*$/.test(number))) {
                alertService.msgAlert("exclamation-circle", "请输入正整数");
                $scope.skuNum = number.substr(0,number.length-1);
                return false;
            } else {
                return true;
            }
        };

        $scope.openDialog = function () {
            $scope.alert = '';
            $mdBottomSheet.show({
                template: cart,
                clickOutsideToClose: true,
                fullscreen: false,
                controllerAs: "vmd",
                bindToController: true,
                controller: ['$mdBottomSheet', '$timeout', 'alertService', function ($mdBottomSheet, $timeout, alertService) {
                    var vmd = this;
                    //---------------------------------控制购物车红点变化
                    vmd.warmchange = false;
                    vmd.warnView = function () {

                        vmd.warmchange = true;
                        $timeout(function () {
                            vmd.warmchange = false;
                        }, 1000);
                    };

                    vmd.editShow=false;
                    vmd.getList = function () {
                        $http({
                            method: "GET",
                            url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart",
                            params: {
                                type: 'PURCHASE'
                            },
                            headers: {
                                'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                "brandApp-Id": $scope.brandAppId
                            }
                        }).then(function (resp) {
                            console.log(1)
                                if (!resp.data.data) {
                                    vmd.editShow=false;
                                    console.log('未添加',vmd.editShow);
                                    $scope.totlePrice = 0;
                                    // return;
                                }else{
                                    vmd.editShow=true;
                                };
                                vmd.comments = resp.data.data;
                                vmd.totlePrice = 0;
                                vmd.getCheck = function (name) {
                                    if (vmd.comments != null) {
                                        for (var i = 0; i < vmd.comments.length; i++) {
                                            vmd.comments[i].checked = name;
                                            vmd.totlePrice += (Number(vmd.comments[i].sku.price) * vmd.comments[i].num);
                                        }
                                    }
                                }
                                vmd.getCheck(true);
                                //全选
                                vmd.checkAll = true;
                                vmd.checkdAll = function () {
                                    vmd.checkAll = !vmd.checkAll;
                                    if (!vmd.checkAll) {   //全选
                                        vmd.getCheck(false);
                                    } else {
                                        vmd.getCheck(true);
                                    }
                                };
                            }, function () {

                            }
                        );
                    };
                    vmd.getList();
                    //编辑
                    vmd.isEdit = true;
                    vmd.changeEdit = function () {
                        vmd.isEdit = !vmd.isEdit;
                        //最终吊取购物车列表接口
                        vmd.getList();
                    };
                    //选中
                    vmd.changeCheck = function (item) {
                        item.checked = !item.checked;
                        //判断是否全选中
                        var numFasle=0;
                        if (vmd.comments != null) {
                            for (var i = 0; i < vmd.comments.length; i++) {
                                if (!vmd.comments[i].checked ) {    //全选中
                                    numFasle=numFasle+1;       //一个fasle
                                }
                            }
                            if(numFasle==vmd.comments.length){
                                vmd.checkAll = false;
                            }else{
                                vmd.checkAll = true;
                            }
                        }
                    };
                    //点击删除   1-判断是否是全删   2-判断是否为部分删除
                    vmd.deleteCar = function () {
                        if (!vmd.checkAll) {      //    情况1
                            vmd.deleteOrder();
                        } else {
                            console.log('commments', vmd.comments);    //走部分删除
                            var cartIdItems=[];
                            for(var i = 0; i < vmd.comments.length; i++){
                               if(!vmd.comments[i].checked){
                                   console.log(2,vmd.comments[i].sku.skuId);
                                   cartIdItems.push(vmd.comments[i].sku.skuId);
                               }
                            }
                            $http({
                                method: "PUT",
                                url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart/removeCart",
                                params: {
                                    cartItems: cartIdItems,
                                    type: 'PURCHASE'
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                    "brandApp-Id": $scope.brandAppId
                                }
                            }).then(function (resp) {
                                    // 成功
                                    vmd.getList();
                                    $scope.getList();
                                }, function () {
                                    //error
                                }
                            );
                        }
                    };


                    // 计算商品数量。进行加减
                    vmd.skuNumCount = function (num, item) {
                        console.log(111111, item.num);
                        vmd.warnView();
                        item.num += num;
                        if (item.sku.storage < item.num) {
                            alertService.msgAlert("exclamation-circle", "库存仅剩" + item.sku.storage + "件");
                            item.num = item.sku.storage;
                        }
                        if (item.num <= 0) {
                            item.num = 0;
                        }

                        $http({
                            method: "PUT",
                            url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart/setNum",
                            params: {
                                num: item.num,
                                skuId: item.sku.skuId,
                                type: 'PURCHASE'
                            },
                            headers: {
                                'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                "brandApp-Id": $scope.brandAppId
                            }
                        }).then(function (resp) {
                                vmd.getList();

                                // $scope.$digest();
                            }, function () {
                                //error
                            }
                        );
                    };
                    vmd.formatNum = function (item) {
                        console.log('cccccccccccccccc', item.num);
                        if (item.num == null || item.num == '' || !item.num) {
                            console.log('null================', item.num);
                            return;
                        } else if (item.num <= 0) {
                            item.num = 1;
                        } else if (item.num > item.sku.storage) {
                            alertService.msgAlert("exclamation-circle", "当前规格库存不足");
                            item.num = item.sku.storage; //todo------------------
                        }
                        $http({
                            method: "PUT",
                            url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart/setNum",
                            params: {
                                num: item.num,
                                skuId: item.sku.skuId,
                                type: 'PURCHASE'
                            },
                            headers: {
                                'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                "brandApp-Id": $scope.brandAppId
                            }
                        }).then(function (resp) {
                                vmd.getList();
                            }, function () {
                                //error
                            }
                        );


                    };
                    // 当输入框为null时失去焦点事件
                    vmd.numBlur = function (item) {
                        console.log(222222213456, item.num);
                        if (item.num > item.sku.storage) {
                            alertService.msgAlert("exclamation-circle", "当前规格库存不足");
                            item.num = item.sku.storage; //todo------------------
                        }
                        if (item.num == null || vmd.skuNum == '' || item.num == '' || item.num <= 0) {
                            console.log('qw');
                            item.num = 1;
                        }
                        if(!/^\d+$/.test(item.num)){
                            item.num = 1;
                            alertService.msgAlert("exclamation-circle", "请输入整数");
                        };
                        $http({
                            method: "PUT",
                            url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart/setNum",
                            params: {
                                num: item.num,
                                skuId: item.sku.skuId,
                                type: 'PURCHASE'
                            },
                            headers: {
                                'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                "brandApp-Id": $scope.brandAppId
                            }
                        }).then(function (resp) {
                                console.log(resp);
                                vmd.getList();
                            }, function () {
                                //error
                            }
                        );
                    };


                    vmd.deleteOrder = function () {
                        // vmd.deleteParams = [];
                        // if (vmd.comments) {
                        //     for (let i = 0; i < vmd.comments.length; i++) {
                        //         let deleteSku = {
                        //             skuId: vmd.comments[i].sku.skuId,
                        //             num: 0
                        //         };
                        //         vmd.deleteParams.push(deleteSku);
                        //     }
                        // }
                        // if (vmd.deleteParams.length < 1) {
                        //     // alertService.msgAlert("exclamation-circle", "您还没有选择任何商品哦");
                        //     return;
                        // }
                        $http({
                            method: "PUT",
                            url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/cart/clearCart",
                            params: {type: 'PURCHASE'},
                            headers: {
                                'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                "brandApp-Id": $scope.brandAppId
                            }
                        }).then(function (resp) {
                                vmd.getList();
                                $scope.getList();

                                // $mdBottomSheet.hide().then(
                                //         $scope.getList()
                                //     );
                                // $scope.$digest();
                            }, function () {
                                //error
                            }
                        );
                    };
                    // 生成订单
                    vmd.orderCreate = function () {
                        vmd.postParams = [];
                        if (vmd.comments) {
                            for (let i = 0; i < vmd.comments.length; i++) {
                                let tmpSku = {
                                    skuId: vmd.comments[i].sku.skuId,
                                    num: vmd.comments[i].num
                                };
                                vmd.postParams.push(tmpSku);
                            }
                        }
                        if (vmd.postParams.length < 1) {
                            // alertService.msgAlert("exclamation-circle", "您还没有选择任何商品哦");
                            return;
                        }

                        $http({
                            method: "POST",
                            url: conf.apiPath + "/brandApp/" + $scope.brandAppId + "/partner/1111111111111/order",
                            data: vmd.postParams,
                            headers: {
                                'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                "brandApp-Id": $scope.brandAppId
                            }
                        }).then(function (resp) {
                                let orderData = resp.data;
                                /*.orderId*/
                                vmd.orderId = orderData.data;
                                $mdBottomSheet.hide().then(
                                    $state.go("main.brandApp.order.checkOrder", {
                                        orderId: vmd.orderId,
                                        from: "CART"
                                    }, {reload: true})
                                );

                            }, function () {

                            }
                        );
                    };

                    vmd.cancleDialog = function () {
                        $mdBottomSheet.hide();
                    };
                    vmd.submit = function () {
                        $mdBottomSheet.hide({
                            totlePrice: vmd.totlePrice,
                            skuData: vmd.comments,
                            postParams: vmd.postParams,
                        });
                    };
                    // $mdBottomSheet.hide({totlePrice: vmd.totlePrice});
                }]
            }).then(function (data) {
                $scope.getList();
                $scope.skuNum = 0;
                if (data) {
                    $scope.totlePrice = data.totlePrice;
                    $scope.skuNum = 0;
                    // for (let i = 0; i < data.skuData.length; i++) {
                    //     for (let j = 0; j < data.skuData[i].sku.specs.length; j++) {
                    //         $scope.skuNum[data.skuData[i].sku.specs[j].valueId] = data.skuData[i].num;
                    //     }
                    // }
                }
            })
        };

        /*返回上级*/
        $scope.fallbackPage = function () {
            if (history.length === 1) {
                $state.go("main.brandApp.home", null, {reload: true});
            } else {
                history.back();
            }
        };
    }
}

Controller.$inject = [
    '$scope',
    '$http',
    '$state',
    'alertService',
    '$log',
    '$mdBottomSheet',
    '$templateCache',
    'loginService',
    '$mdDialog',
    '$timeout',
    '$stateParams',
    '$location',
];

export default Controller ;
