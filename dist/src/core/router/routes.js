"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_map_1 = require("./router-map");
var RouterModule = (function () {
    function RouterModule(app) {
        this.express = app;
        this.routerFactory = new router_map_1.RouterModuleFactory();
    }
    RouterModule.prototype.exposeRoutes = function (authenticate) {
        var registeredModules = this.routerFactory.getRegisteredModules();
        if (registeredModules && Array.isArray(registeredModules)) {
            registeredModules.forEach(this.extractRouterInfoFromModule.bind(this, authenticate));
        }
    };
    RouterModule.prototype.extractRouterInfoFromModule = function (authenticate, routerFeatModule) {
        if (routerFeatModule) {
            var registeredVerbs = Object.keys(routerFeatModule);
            registeredVerbs.forEach(this.extractInfoByVerb.bind(this, authenticate, routerFeatModule));
        }
    };
    RouterModule.prototype.extractInfoByVerb = function (authenticate, routerFeatModule, registeredVerb) {
        routerFeatModule[registeredVerb]
            .forEach(this.mountRoutes.bind(this, authenticate, registeredVerb));
    };
    RouterModule.prototype.mountRoutes = function (authenticate, registeredVerb, routerInfo) {
        if (routerInfo) {
            var isProtected = routerInfo.isProtected, callback = routerInfo.callback, endpoint = routerInfo.endpoint;
            console.log(isProtected, callback, endpoint);
            isProtected
                ? this.express.route(endpoint).all(authenticate())[registeredVerb](callback)
                : this.express.route(endpoint)[registeredVerb](callback);
        }
    };
    return RouterModule;
}());
exports.RouterModule = RouterModule;
//# sourceMappingURL=routes.js.map