import conf from "../../../../../conf"

var $scope,
    $http,
    authService,
    $state,
    $log,
    $filter,
    loginService,
    alertService,
    $mdDialog,
    $stateParams,
    Upload,
    errorService;
class Controller {
    constructor(_$scope,
                _$http,
                _$state,
                _$log,
                _$filter,
                _authService,
                _loginService,
                _alertService,
                _$mdDialog,
                _$stateParams,
                _Upload,
                _errorService) {
        $scope = _$scope;
        $http = _$http;
        $mdDialog = _$mdDialog;
        $state = _$state;
        $filter = _$filter;
        authService = _authService;
        loginService = _loginService;
        $log = _$log;
        Upload = _Upload;
        errorService = _errorService;
        $stateParams = _$stateParams;
        alertService = _alertService;
        /////////////////////////////////
        loginService.loginCtl(true);
        $scope.brandAppId = $stateParams.brandAppId;
        //获取权限，勿删
        // authService.setAuthorities($scope.brandAppId);
        //console.log("====================", $stateParams);
        $scope.checkedApp = [];
        $scope.checkedCategory=[];

        $scope.today = new Date();
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.getApp = function () {
            $http({
                method: "get",
                url: conf.apiPath + "/app",
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                },
                params: {
                    page: 0,
                    size: 999,
                }
            }).success(function (resp) {
                $scope.data = resp.data;
                console.log('data',  $scope.data );
            });
        };
        $scope.getApp();



        $scope.business = {};


        $scope.save = function () {
            if(!$scope.business.title){
                return errorService.error('商家名称不能为空!');
            }

            if(!(/^1[34578]\d{9}$/.test($scope.business.phone))){
                return errorService.error('请输入正确的联系人号码!');
            }
            if(!$scope.business.date){
                return errorService.error('有效时间不能为空!');
            }
            if(!$scope.business.logoUrl){
                return errorService.error('商家Logo不能为空!');
            }


            $http({
                method: "POST",
                url: conf.apiPath + "/brandCom/add",
                headers: {
                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                    "brandApp-Id": $scope.brandAppId
                },
                data: {
                    phone:$scope.business.phone,
                    title:$scope.business.title,
                    // categoryId:[$scope.business.categoryId],
                    categoryId:[111],
                    logoUrl:$scope.business.logoUrl,
                    appIds:$scope.checkedApp,
                    date:$filter('date')($scope.business.date,'yyyy-MM-dd'),
                }
            }).then(function (resp) {
                if (resp.status ==200){
                    $scope.fallbackPage();
                }
            }, function (resp) {
                errorService.error(resp.data.message);
            });
        };


        //返回按钮
        $scope.fallbackPage = function () {
            if (history.length === 1) {
                $state.go("main.brandApp.index", null, {reload: true});
            } else {
                history.back();
            }
        };
        //yun图片上传
        $scope.uploading = function (file) {
            $scope.f = file;
            // $scope.errFile =errFiles && errFiles[0];
            if (file) {
                Upload.upload({
                    url: conf.yunApiPath + '/app/5988791a6b869f4e18d5c8d5/org/598878fc6b869f4e0f19fb47/yunFile',
                    data: {
                        file: file,
                    }
                }).then(function (resp) {
                    // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ', resp.data);
                    $http({
                        method: 'GET',
                        url: conf.yunApiPath + '/app/5988791a6b869f4e18d5c8d5/org/598878fc6b869f4e0f19fb47/yunFile/' + resp.data.data
                    }).then(function (resp) {
                        //console.log('Success ' + resp.data.data.cdnUrls[0].url);
                        // 上传代码返回结果之后，将图片插入到编辑器中
                        $scope.business.logoUrl  = resp.data.data.cdnUrls[0].url;
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    });
                }, function (resp) {
                    //console.log('Error status: ' + resp.status);
                }, function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        };

        $scope.cancelDelImg = function () {
            $scope.business.logoUrl = '';
        };












        //拒绝确认tk
        $scope.alertSure = function (ev) {
            $mdDialog.show({
                templateUrl: 'businessAdd.html',
                parent: angular.element(document.body).find('#qh-platform-admin-front'),
                targetEvent: ev,
                clickOutsideToClose: true,   //true 点击界外的时候弹窗消失
                fullscreen: false,
                controllerAs: "vmd",
                controller: ['$mdDialog', function ($mdDialog) {
                    var vmd = this;
                    vmd.cancel = function () {
                        return $mdDialog.cancel();
                    };
                    //拒绝接单js
                    vmd.reject = function () {
                        if(!vmd.reason){
                            return errorService.error("拒绝原因不能为空", null)
                        }else{
                            $http({
                                method:"PUT",
                                url:conf.apiPath +"/brandApp/"+$scope.brandAppId+"/partner/123/refund/"+$scope.id+"/reject",
                                params: {
                                    rejectReason: vmd.reason
                                },
                                headers: {
                                    'Authorization': 'Bearer ' + loginService.getAccessToken(),
                                    "brandApp-Id": $scope.brandAppId
                                },
                            }).success(function (data) {
                                console.log(data);
                                if (data.status == '200') {
                                    vmd.cancel();
                                    $scope.getInfo();
                                    //$scope.fallbackPage();
                                }
                            });
                        }
                    };
                }],
            }).then(function (answer) {
            }, function () {
            });
        };
    }
}

Controller.$inject = [
    '$scope',
    '$http',
    '$state',
    '$log',
    '$filter',
    'authService',
    'loginService',
    'alertService',
    '$mdDialog',
    '$stateParams',
    'Upload',
    'errorService'
];

export default Controller ;