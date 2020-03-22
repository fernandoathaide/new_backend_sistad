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
var model = require('../../server/models');
describe('Testes de Integração', function () {
    'use strict';
    var config = require('../../server/config/env/config')();
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
                _this.token = jwt.encode({ id_user: user.id_user }, config.secret);
                done();
            });
        });
    });
    describe('POST /api/token', function () {
        it('Deve receber um JWT', function (done) {
            var credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app)
                .post('/api/token')
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
                .post('/api/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('GET /api/users/all', function () {
        it('Deve retornar um Json com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id_user', function () {
        it('Deve retornar um Json com um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id_user)
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id_user).to.equal(userDefault.id_user);
                helpers_1.expect(res.body.payload).to.have.all.keys(['id_user', 'name', 'email', 'password']);
                _this.id_user = res.body.payload.id_user;
                done(error);
            });
        });
    });
    describe('POST /api/users/create', function () {
        it('Deve inserir/Criar novo usuário, retorno 200', function (done) {
            var user = {
                id_user: 2,
                name: 'FernandoTeste',
                email: 'novo@gmail.com',
                password: 'novouser'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id_user).to.eql(user.id_user);
                helpers_1.expect(res.body.payload.name).to.eql(user.name);
                helpers_1.expect(res.body.payload.email).to.eql(user.email);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', function () {
        it('Deve atualizar um Usuário', function (done) {
            var user = {
                name: 'TesteUpdate',
                email: 'update@email.com'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + userTest.id_user + "/update")
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.eql(1);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', function () {
        it('Deve remover um usário', function (done) {
            helpers_1.request(helpers_1.app)
                .del("/api/users/" + userTest.id_user + "/destroy")
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.eql(1);
                done(error);
            });
        });
    });
});
//# sourceMappingURL=integration.test.js.map