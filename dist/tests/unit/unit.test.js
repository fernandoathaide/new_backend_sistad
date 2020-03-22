"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var serviceUser_1 = __importDefault(require("../../server/modules/User/serviceUser"));
var model = require('../../server/models');
describe('Testes Unitários do userController', function () {
    var userDefault = {
        id_user: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {}
        })
            .then(function () {
            model.User.create(userDefault).then(function () {
                console.log("Default User created");
                done();
            });
        });
    });
    describe('Método Create', function () {
        it('Deve Criar um novo Usuário', function () {
            return serviceUser_1.default.createUser({
                id_user: 2,
                name: 'Default User 2',
                email: 'defaultuser@email.com',
                password: '1234'
            })
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id_user', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve Alterar um Usuário', function () {
            var userUpdate = { name: 'UserUpdate', email: 'userUpdate@teste.com' };
            return serviceUser_1.default.updateUser(userDefault.id_user, userUpdate).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método GET Users Buscar Usuários', function () {
        it('Deve Retornar Lista com os Usuários', function () {
            return serviceUser_1.default.getAllUser().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Método Buscar Usuários Por ID', function () {
        it('Deve Retornar um Usuário buscado', function () {
            return serviceUser_1.default.getUserById(userDefault.id_user).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id_user', 'name', 'password']);
            });
        });
    });
    describe('Método Buscar Usuários Por EMAIL', function () {
        it('Deve Retornar um Usuário buscado por email', function () {
            return serviceUser_1.default.getUserByEmail(userDefault.email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id_user', 'name', 'password']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve Deletar um Usuário', function () {
            return serviceUser_1.default.deleteUser(userDefault.id_user).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
//# sourceMappingURL=unit.test.js.map