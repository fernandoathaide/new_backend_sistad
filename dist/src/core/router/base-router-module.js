"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseRouterModule = (function () {
    function BaseRouterModule(moduleName) {
        var _a;
        this.context = '/api';
        this.version = 'v1';
        this.moduleName = 'rest-api';
        this.MODULES_ENDPOINT_MAP = (_a = {},
            _a[this.moduleName] = {
                get: [
                    {
                        endpoint: this.context + "/" + this.version + "/" + this.moduleName,
                        callback: function (req, res) {
                            res.sendStatus(200).send({ status: 200, msg: 'Rota Ok!' });
                        },
                        isProtected: false
                    }
                ]
            },
            _a);
        if (typeof moduleName === 'string') {
            this.moduleName = moduleName;
        }
    }
    BaseRouterModule.prototype.getRoutesFromModules = function () {
        return this.MODULES_ENDPOINT_MAP;
    };
    return BaseRouterModule;
}());
exports.BaseRouterModule = BaseRouterModule;
