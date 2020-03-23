"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_handlers_1 = __importDefault(require("../../src/core/handlers/response-handlers"));
describe('Testes Unitários do Handler para melhorar a %.', function () {
    describe('Método onSuccess', function () {
        it('Deve emitir mensagem de sucesso', function () {
            return response_handlers_1.default.onSuccess;
        });
    });
});
