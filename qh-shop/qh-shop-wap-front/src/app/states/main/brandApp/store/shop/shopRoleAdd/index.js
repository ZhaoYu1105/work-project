import conf from "../../../../../../conf";
import angular from "angular";
import uiRouter from "angular-ui-router";
import confState from "./confState";
import "./css.scss";

// import "../../../../../../../node_modules/weui/dist/style/weui.css"



export default angular.module(`${conf.app}.states.brandApp.store.shop.shopRoleAdd`, [
        uiRouter
    ])
    .config(confState);
