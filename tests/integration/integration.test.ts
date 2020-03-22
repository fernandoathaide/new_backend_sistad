import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
const model = require('../../server/models');

describe('Testes de Integração',() => {

  'use strict';
  const config = require('../../server/config/env/config')();
  let token;

  const userTest = {
    id_user: 100,
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: 'teste'
  };

  const userDefault = {
    id_user: 1,
    name: 'Default',
    email: 'default@email.com',
    password: 'teste'
  };

    beforeEach((done) => {
      model.User.destroy({
        where: {}
      })
      .then(() => {
        return model.User.create(userDefault);
      })
      .then(user => {
        model.User.create(userTest)
          .then(() => {
            this.token = jwt.encode({id_user: user.id_user}, config.secret);
            done();
          })
      })
    });

    describe('POST /api/token', () => {
      it('Deve receber um JWT', done => {
        const credentials = {
          email: userDefault.email,
          password: userDefault.password
        };
        request(app)
          .post('/api/token')
          .send(credentials)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK);
            expect(res.body.token).to.equal(`${this.token}`);
            done(error);
          });
      })
      it('Não deve gerar Token', done => {
        const credentials = {
          email: 'email@emailqualquer.com',
          password: 'qualquer'
        };
        request(app)
          .post('/api/token')
          .send(credentials)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
            expect(res.body).to.empty;
            done(error);
          })
      })
    });
  
    describe('GET /api/users/all', () =>{
        it('Deve retornar um Json com todos os usuários', done =>{
            request(app)
            .get('/api/users/all')
            .set('Content-Type', 'application/json')
            .set('Authorization', `JWT ${this.token}`)
            .end((error, res)=>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload).to.be.an('array');
                expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);// Caso retorne error se não apenas finaliza
            })
        });
    });
   
    describe('GET /api/users/:id_user', () =>{
        it('Deve retornar um Json com um usuário', done =>{
            request(app)
            .get(`/api/users/${userDefault.id_user}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `JWT ${this.token}`)
            .end((error, res)=>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id_user).to.equal(userDefault.id_user);
                expect(res.body.payload).to.have.all.keys([ 'id_user', 'name', 'email', 'password' ]);
                this.id_user = res.body.payload.id_user
                done(error);
            })
        });
    });

    describe('POST /api/users/create', () =>{
        it('Deve inserir/Criar novo usuário, retorno 200', done =>{
            const user = {
                id_user: 2,
                name:'FernandoTeste',
                email: 'novo@gmail.com',
                password: 'novouser'
            }
            request(app)
            .post('/api/users/create')
            .set('Content-Type', 'application/json')
            .set('Authorization', `JWT ${this.token}`)
            .send(user)
            .end((error, res)=>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id_user).to.eql(user.id_user);
                expect(res.body.payload.name).to.eql(user.name);
                expect(res.body.payload.email).to.eql(user.email);
                done(error);
            })
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um Usuário', done => {
          const user = {
            name: 'TesteUpdate',
            email: 'update@email.com'
          };
          request(app)
            .put(`/api/users/${userTest.id_user}/update`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `JWT ${this.token}`)
            .send(user)
            .end((error, res) => {
              expect(res.status).to.equal(HTTPStatus.OK);
              expect(res.body.payload[0]).to.eql(1);
              done(error);
            });
        });
      });
      describe('DELETE /api/users/:id/destroy', () => {
        it('Deve remover um usário', done => {
          request(app)
            .del(`/api/users/${userTest.id_user}/destroy`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `JWT ${this.token}`)
            .end((error, res) => {
              expect(res.status).to.equal(HTTPStatus.OK);
              expect(res.body.payload).to.eql(1);
              done(error);
            });
        });
      });
});