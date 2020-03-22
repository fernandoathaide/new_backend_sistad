"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var bodyParser = __importStar(require("body-parser"));
var routes_1 = require("./router/routes");
var response_handlers_1 = __importDefault(require("./handlers/response-handlers"));
var auth_service_1 = require("../modules/auth/auth-service");
var secret = require('../config/env').secret;
var swaggerUi = __importStar(require("swagger-ui-express"));
var swaggerDocument = require('./swagger.json');
var CoreModule = (function () {
    function CoreModule() {
        this._aplicationExpress = express_1.default();
        this.authService = new auth_service_1.AuthService(secret).setStrategy();
        this.configExpress();
        this.routerModeule = new routes_1.RouterModule(this.aplicationExpress);
        this.router();
    }
    Object.defineProperty(CoreModule.prototype, "aplicationExpress", {
        get: function () {
            return this._aplicationExpress;
        },
        enumerable: true,
        configurable: true
    });
    CoreModule.prototype.configExpress = function () {
        this._aplicationExpress.use(this.configHeaders.bind(this));
        this._aplicationExpress.use(morgan_1.default('dev'));
        this._aplicationExpress.use(bodyParser.urlencoded({ extended: true }));
        this._aplicationExpress.use(bodyParser.json());
        this._aplicationExpress.use(response_handlers_1.default.errorHandlerApi);
        this._aplicationExpress.use(this.authService.initialize());
        this._aplicationExpress.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    };
    CoreModule.prototype.router = function () {
        this.routerModeule.exposeRoutes(this.authService.authenticate);
    };
    CoreModule.prototype.configHeaders = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    };
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.js.map