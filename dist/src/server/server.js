"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var core_1 = require("../core/core");
var serverPort = require('../config/env').serverPort;
var Server = (function () {
    function Server(dataBaseConnector) {
        if (dataBaseConnector) {
            this.db = dataBaseConnector;
            this.expressApi = new core_1.CoreModule().aplicationExpress;
            this.syncDataBase();
        }
    }
    Server.prototype.syncDataBase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var syncData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.sync()];
                    case 1:
                        syncData = _a.sent();
                        this.dataBaseSyncHandler(syncData);
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.dataBaseSyncErrorHandler(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    Server.prototype.dataBaseSyncHandler = function (dataBaseInfo) {
        var options = dataBaseInfo.options, config = dataBaseInfo.config, models = dataBaseInfo.models;
        this.upServer();
        this.logDataBaseConnection({ models: models, options: options, config: config });
    };
    Server.prototype.dataBaseSyncErrorHandler = function (error) {
        console.log("Can't connect to a database because " + error + ".");
        this.upServer();
    };
    Server.prototype.upServer = function () {
        http.createServer(this.expressApi)
            .listen(serverPort)
            .on('listening', this.onServerUp.bind(this, serverPort))
            .on('error', this.onServerStartupError.bind(this));
    };
    Server.prototype.onServerUp = function (port) {
        console.log("Server rodando na porta " + port);
    };
    Server.prototype.onServerStartupError = function (error) {
        console.log("Server erro de running: Error:  " + error);
    };
    Server.prototype.logDataBaseConnection = function (_a) {
        var models = _a.models, options = _a.options, config = _a.config;
        var dialect = options.dialect, host = options.host;
        var database = config.database, port = config.port;
        if (dialect && host && database && port && models) {
            console.log("Data base dialect: " + dialect);
            console.log("Host de conex\u00E3o data base: " + host);
            console.log("Data Base name: " + database);
            console.log("Data Base Port: " + port);
            console.log('Created Tables:');
            console.log(models);
        }
    };
    return Server;
}());
exports.Server = Server;
