import Controller from "./Controller";
import html from "!html-loader?minimize=true!./view.html";

confState.$inject = ['$stateProvider'];
function confState($stateProvider) {
    /**
     * 测试
     */
    $stateProvider.state("main.brandApp.store.shop.selectSpec", {
        url: "/selectSpec?id&skuData&choose&from&selectMoreSpec",
        sticky: true,
        deepStateRedirect: true,
        views: {
            "selectSpec@main.brandApp": {
                template: html,
                controller: Controller,
                /*controller: function(){
                 console.log("----------------------------------------zll")
                 },*/
                controllerAs: "vm"
            }
        }
    });
}

export default confState ;


