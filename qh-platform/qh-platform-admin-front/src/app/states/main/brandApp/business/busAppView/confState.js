import Controller from "./Controller";
import html from "!html-loader?minimize=true!./view.html";

confState.$inject = ['$stateProvider'];
function confState($stateProvider) {

    $stateProvider.state("main.brandApp.business.busAppView", {
        url: "/busAppView/{appId}/{brandId}",

        resolve: {
            // // 当前的用户信息
            // curUser: ['userService', function (userService) {
            //     var q = userService.getCurUser(true, true);
            //     return q;
            // }]
        },
        views: {
            "busAppView@main.brandApp": {
                template: html,
                controller: Controller,
                controllerAs: "vm"
            }
        }
    });
}


export default confState ;



