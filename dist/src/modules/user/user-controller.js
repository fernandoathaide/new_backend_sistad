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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var user_service_1 = __importDefault(require("./user-service"));
var response_handlers_1 = __importDefault(require("../../core/handlers/response-handlers"));
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (req, res) {
        user_service_1.default
            .createUser(req.body)
            .then(_.partial(response_handlers_1.default.onSuccess, res))
            .catch(_.partial(response_handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(response_handlers_1.default.onError, res, 'Erro ao criar o usuário.'));
    };
    UserController.prototype.getAllUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, user_service_1.default.getAllUser()];
                    case 1:
                        users = _a.sent();
                        response_handlers_1.default.onSuccess(res, users);
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        response_handlers_1.default.onError(res, 'Erro ao buscar todos os usuários.', error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UserController.prototype.getUserById = function (req, res) {
        user_service_1.default
            .getUserById(parseInt(req.params.id))
            .then(_.partial(response_handlers_1.default.onSuccess, res))
            .catch(_.partial(response_handlers_1.default.onError, res, 'Erro ao buscar um usuário por ID.'));
    };
    UserController.prototype.getUserByEmail = function (req, res) {
        user_service_1.default
            .getUserByEmail(req.body.email)
            .then(_.partial(response_handlers_1.default.onSuccess, res))
            .catch(_.partial(response_handlers_1.default.onError, res, 'Erro ao buscar um usuário por Email.'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var id_user = parseInt(req.params.id);
        var props = req.body;
        user_service_1.default
            .updateUser(id_user, props)
            .then(_.partial(response_handlers_1.default.onSuccess, res))
            .catch(_.partial(response_handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(response_handlers_1.default.onError, res, 'Erro ao alterar o usuário.'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        user_service_1.default
            .deleteUser(parseInt(req.params.id))
            .then(_.partial(response_handlers_1.default.onSuccess, res))
            .catch(_.partial(response_handlers_1.default.onError, res, 'Erro ao deletar um usuário.'));
    };
    return UserController;
}());
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map