"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_router_module_1 = require("../../core/router/base-router-module");
var auth_controller_1 = __importDefault(require("./auth-controller"));
var AuthRouterModule = (function (_super) {
    __extends(AuthRouterModule, _super);
    function AuthRouterModule() {
        var _a;
        var _this = _super.call(this, 'auth') || this;
        _this.MODULES_ENDPOINT_MAP = (_a = {},
            _a[_this.moduleName] = {
                post: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/token",
                        callback: auth_controller_1.default.auth,
                        isProtected: false
                    }
                ]
            },
            _a);
        return _this;
    }
    return AuthRouterModule;
}(base_router_module_1.BaseRouterModule));
exports.AuthRouterModule = AuthRouterModule;
