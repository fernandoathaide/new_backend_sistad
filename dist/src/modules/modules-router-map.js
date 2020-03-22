"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_router_1 = require("./auth/auth-router");
var user_router_1 = require("./user/user-router");
var ModulesRouterMapper = (function () {
    function ModulesRouterMapper() {
        this.registeredModules = [
            {
                moduleName: auth_router_1.AuthRouterModule,
                parser: 'getRoutesFromModules'
            },
            {
                moduleName: user_router_1.UserRouterModule,
                parser: 'getRoutesFromModules'
            }
        ];
    }
    return ModulesRouterMapper;
}());
exports.ModulesRouterMapper = ModulesRouterMapper;
//# sourceMappingURL=modules-router-map.js.map