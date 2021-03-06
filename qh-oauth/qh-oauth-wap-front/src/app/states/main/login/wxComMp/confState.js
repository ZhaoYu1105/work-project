import Controller from "./Controller";
import html from "!html-loader?minimize=true!./view.html";

confState.$inject = ['$stateProvider'];
function confState($stateProvider) {

    /**
     * 微信登录
     */
    $stateProvider.state("main.login.wxComMp", {
        url: "/wxComMp?backUrl&wxComAppId&wxMpAppId",
        params: {

        },

        sticky: true,
        deepStateRedirect: true,
        views: {
            "wxComMp@main.login": {
                template: html,
                controller: Controller,
                controllerAs: "vm"
            }
        }
    });
}

export default confState ;


