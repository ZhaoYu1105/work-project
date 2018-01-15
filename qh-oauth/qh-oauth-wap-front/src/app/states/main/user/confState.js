import Controller from "./Controller";
import html from "!html-loader?minimize=true!./view.html";

confState.$inject = ['$stateProvider'];
function confState($stateProvider) {
    /**
     * 测试
     */
    $stateProvider.state("main.user", {
        url: "/user",  //不写则会默认显示  ?providerID&client_id&redirect_uri&scope&state
        params: {
            loginType: null
        },
        sticky: true,
        deepStateRedirect: true,
        views: {
            "user@main": {
                template: html,
                controller: Controller,
                controllerAs: "vm"
            }
        }
    });
}

export default confState ;

