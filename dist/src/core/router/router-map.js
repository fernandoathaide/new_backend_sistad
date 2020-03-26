"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modules_router_map_1 = require("../../modules/modules-router-map");
var RouterModuleFactory = (function () {
    function RouterModuleFactory() {
        this.routerModulesMap = [];
        this.bootstrapModules(new modules_router_map_1.ModulesRouterMapper());
    }
    RouterModuleFactory.prototype.bootstrapModules = function (routerModulesMapper) {
        this.routerModulesMap = routerModulesMapper
            .registeredModules.map(this.createModules.bind(this));
    };
    RouterModuleFactory.prototype.createModules = function (registeredModule) {
        var moduleName = registeredModule.moduleName, parser = registeredModule.parser;
        return new moduleName()[parser]();
    };
    RouterModuleFactory.prototype.getRegisteredModules = function () {
        return this.routerModulesMap.map(function (routerModule) {
            var moduloName = Object.keys(routerModule)[0];
            return routerModule[moduloName];
        });
    };
    return RouterModuleFactory;
}());
exports.RouterModuleFactory = RouterModuleFactory;
