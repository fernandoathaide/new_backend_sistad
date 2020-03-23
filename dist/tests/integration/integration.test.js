"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = __importStar(require("http-status"));
var jwt = __importStar(require("jwt-simple"));
var helpers_1 = require("./config/helpers");
var model = require('../../src/entities');
var secret = require('../../src/config/env').secret;
describe('Testes de Integração', function () {
    'use strict';
    var token;
    var userTest = {
        id_user: 100,
        name: 'Usuário Teste',
        email: 'teste@email.com',
        password: 'teste'
    };
    var userDefault = {
        id_user: 1,
        name: 'Default',
        email: 'default@email.com',
        password: 'teste'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {}
        })
            .then(function () {
            return model.User.create(userDefault);
        })
            .then(function (user) {
            model.User.create(userTest)
                .then(function () {
                _this.token = jwt.encode({ id_user: user.id_user }, secret);
                done();
            });
        });
    });
    describe('POST /api/v1/auth/token', function () {
        it('Deve receber um JWT', function (done) {
            var credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app)
                .post('/api/v1/auth/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.token).to.equal("" + _this.token);
                done(error);
            });
        });
        it('Não deve gerar Token', function (done) {
            var credentials = {
                email: 'email@emailqualquer.com',
                password: 'qualquer'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/v1/auth/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
});
//# sourceMappingURL=integration.test.js.map