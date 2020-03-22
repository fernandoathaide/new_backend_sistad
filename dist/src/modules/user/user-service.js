"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_interface_1 = require("./user-interface");
var model = require('../../entities');
var ServiceUser = (function () {
    function ServiceUser() {
    }
    ServiceUser.prototype.createUser = function (user) {
        return model.User.create(user);
    };
    ServiceUser.prototype.getAllUser = function () {
        return model.User.findAll({
            order: ['name']
        })
            .then(user_interface_1.createUsers);
    };
    ServiceUser.prototype.getUserById = function (id_user) {
        return model.User.findOne({
            where: { id_user: id_user }
        })
            .then(user_interface_1.createUserById);
    };
    ServiceUser.prototype.getUserByEmail = function (email) {
        return model.User.findOne({
            where: { email: email }
        })
            .then(user_interface_1.createUserByEmail);
    };
    ServiceUser.prototype.updateUser = function (id_user, user) {
        return model.User.update(user, {
            where: { id_user: id_user },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        });
    };
    ServiceUser.prototype.deleteUser = function (id_user) {
        return model.User.destroy({
            where: { id_user: id_user }
        });
    };
    return ServiceUser;
}());
exports.default = new ServiceUser();
//# sourceMappingURL=user-service.js.map