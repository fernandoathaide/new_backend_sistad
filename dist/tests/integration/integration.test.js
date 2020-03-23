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
        id_user: 1,
        name: 'Usuário Teste',
        email: 'teste@email.com',
        password: '$2b$10$KW28Rxt5ZmtQfUsCLw9LSOzC9.D3lCx.qaOEAKznVMmjmtc3NH4dW'
    };
    var userDefault = {
        id_user: 2,
        name: 'Default',
        email: 'default@email.com',
        password: '$2b$10$KW28Rxt5ZmtQfUsCLw9LSOzC9.D3lCx.qaOEAKznVMmjmtc3NH4dW'
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
                password: secret
            };
            helpers_1.request(helpers_1.app.aplicationExpress)
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
            helpers_1.request(helpers_1.app.aplicationExpress)
                .post('/api/v1/auth/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('GET /api/v1/users/all', function () {
        it('Deve retornar um Json com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app.aplicationExpress)
                .get('/api/v1/users/all')
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
    describe('GET /api/v1/users/id/:id', function () {
        it('Deve retornar um Json com um usuário', function (done) {
            helpers_1.request(helpers_1.app.aplicationExpress)
                .get("/api/v1/users/id/" + userDefault.id_user)
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
    describe('GET /api/v1/users/email', function () {
        it('Deve retornar um usuário por Email', function (done) {
            var credentials = { email: userDefault.email };
            helpers_1.request(helpers_1.app.aplicationExpress)
                .get("/api/v1/users/email")
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id_user).to.equal(userDefault.id_user);
                helpers_1.expect(res.body.payload).to.have.all.keys(['id_user', 'name', 'email', 'password']);
                _this.id_user = res.body.payload.id_user;
                done(error);
            });
        });
    });
    describe('POST /api/v1/users/create', function () {
        it('Deve inserir/Criar novo usuário, retorno 200', function (done) {
            var user = {
                id_user: 200,
                name: 'FernandoTeste',
                email: 'novo@gmail.com',
                password: 'novouser'
            };
            helpers_1.request(helpers_1.app.aplicationExpress)
                .post('/api/v1/users/create')
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
    describe('PUT /api/v1/users/update/:id', function () {
        it('Deve atualizar um Usuário', function (done) {
            var user = {
                name: 'Fernando Teste Update',
                email: 'update@email.com'
            };
            helpers_1.request(helpers_1.app.aplicationExpress)
                .put("/api/v1/users/update/" + userTest.id_user)
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + _this.token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
    describe('DELETE /api/v1/users/destroy/:id', function () {
        it('Deve remover um usário', function (done) {
            helpers_1.request(helpers_1.app.aplicationExpress)
                .del("/api/v1/users/destroy/" + userTest.id_user)
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
