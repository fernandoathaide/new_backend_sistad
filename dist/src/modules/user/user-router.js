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
var user_controller_1 = __importDefault(require("./user-controller"));
var UserRouterModule = (function (_super) {
    __extends(UserRouterModule, _super);
    function UserRouterModule() {
        var _a;
        var _this = _super.call(this, 'users') || this;
        _this.MODULES_ENDPOINT_MAP = (_a = {},
            _a[_this.moduleName] = {
                post: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/create",
                        callback: user_controller_1.default.createUser,
                        isProtected: false
                    }
                ],
                get: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/all",
                        callback: user_controller_1.default.getAllUser,
                        isProtected: false
                    },
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/:id",
                        callback: user_controller_1.default.getUserById,
                        isProtected: false
                    }
                ],
                put: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/:id/update",
                        callback: user_controller_1.default.updateUser,
                        isProtected: false
                    }
                ],
                delete: [
                    {
                        endpoint: _this.context + "/" + _this.version + "/" + _this.moduleName + "/:id/destroy",
                        callback: user_controller_1.default.deleteUser,
                        isProtected: false
                    }
                ]
            },
            _a);
        return _this;
    }
    return UserRouterModule;
}(base_router_module_1.BaseRouterModule));
exports.UserRouterModule = UserRouterModule;
//# sourceMappingURL=user-router.js.map