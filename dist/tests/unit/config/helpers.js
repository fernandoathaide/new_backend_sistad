"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Chai = __importStar(require("chai"));
var td = __importStar(require("testdouble"));
var supertest = require('supertest');
var core_1 = require("../../../src/core/core");
var app = core_1.CoreModule;
exports.app = app;
var request = supertest;
exports.request = request;
var expect = Chai.expect;
exports.expect = expect;
var testDouble = td;
exports.testDouble = testDouble;
//# sourceMappingURL=helpers.js.map