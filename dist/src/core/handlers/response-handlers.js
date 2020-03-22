"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = __importStar(require("http-status"));
var jwt = __importStar(require("jwt-simple"));
var bcrypt = __importStar(require("bcrypt"));
var secret = require('../../config/env').secret;
var ResponseHandlers = (function () {
    function ResponseHandlers() {
    }
    ResponseHandlers.prototype.onSuccess = function (res, data) {
        return res.status(HTTPStatus.OK).json({ payload: data });
    };
    ResponseHandlers.prototype.onError = function (res, message, err) {
        console.log("Error Interno do Server: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    };
    ResponseHandlers.prototype.authSuccess = function (res, credentials, data) {
        var isMatch = bcrypt.compareSync(credentials.password, data.password);
        if (isMatch) {
            var payload = { id_user: data.id_user };
            return res.json({
                token: jwt.encode(payload, secret)
            });
        }
        else {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
    };
    ResponseHandlers.prototype.authFail = function (req, res) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    };
    ResponseHandlers.prototype.dbErrorHandler = function (res, err) {
        console.log("Error de Data Base: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-01',
            message: 'Erro de acesso a base de dados.'
        });
    };
    ResponseHandlers.prototype.errorHandlerApi = function (err, req, res, next) {
        console.error("API error handler foi executada: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            errorCode: 'ERR-001',
            message: 'Erro Interno do Servidor de API'
        });
    };
    return ResponseHandlers;
}());
exports.default = new ResponseHandlers();
//# sourceMappingURL=response-handlers.js.map