"use strict";
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
var Chai = __importStar(require("chai"));
var td = __importStar(require("testdouble"));
var supertest = require('supertest');
var api_1 = __importDefault(require("../../../server/api/api"));
var app = api_1.default;
exports.app = app;
var request = supertest;
exports.request = request;
var expect = Chai.expect;
exports.expect = expect;
var testDouble = td;
exports.testDouble = testDouble;
//# sourceMappingURL=helpers.js.map