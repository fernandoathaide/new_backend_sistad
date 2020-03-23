"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var user_service_1 = __importDefault(require("../user/user-service"));
var AuthService = (function () {
    function AuthService(segredo) {
        this.secret = segredo;
    }
    AuthService.prototype.setStrategy = function () {
        var opts = {
            secretOrKey: this.secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt')
        };
        passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
            user_service_1.default
                .getUserById(jwtPayload.id_user)
                .then(function (user) {
                if (user) {
                    return done(null, {
                        id_user: user['id_user'],
                        email: user['email']
                    });
                }
                return done(null, false);
            })
                .catch(function (error) {
                done(error, null);
            });
        }));
        return {
            initialize: function () { return passport_1.default.initialize(); },
            authenticate: function () { return passport_1.default.authenticate('jwt', { session: false }); }
        };
    };
    return AuthService;
}());
exports.AuthService = AuthService;
