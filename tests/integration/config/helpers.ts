import * as mocha from 'mocha';
import * as Chai from 'chai';
import * as td from 'testdouble';
const supertest = require('supertest');
import { CoreModule } from '../../../src/core/core';

const app = CoreModule;
const request = supertest;
const expect = Chai.expect;
const testDouble = td;

export{ app, request, expect, testDouble }