import Controller from "./Controller";
import html from "!html-loader?minimize=true!./view.html";

confState.$inject = ['$stateProvider'];
function confState($stateProvider) {
    /**
     * 测试
     */
    $stateProvider.state("main.brandApp.store.shop.addSales", {
        url: "/addSales",
        sticky: true,
        deepStateRedirect: true,
        views: {
            "addSales@main.brandApp": {
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


