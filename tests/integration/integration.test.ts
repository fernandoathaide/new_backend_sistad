import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
const model = require('../../src/entities');
const { secret } = require('../../src/config/env');

describe('Testes de Integração',() => {

  'use strict';
  const token = 0;

  const userTest = {
    id_user: 1,
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: 'teste'
  };

  const userDefault = {
    id_user: 2,
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
            const payload = { id_user: user.id_user, email: user.email };
            this.token = jwt.encode(payload, secret);
            done();
          })
      })
    });

    describe('POST /api/v1/auth/token', () => {
      it('Deve receber um JWT', done => {
        const credentials = {
          email: userDefault.email,
          password: userDefault.password
        };
        request(app.aplicationExpress)
          .post('/api/v1/auth/token')
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
        request(app.aplicationExpress)
          .post('/api/v1/auth/token')
          .send(credentials)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
            expect(res.body).to.empty;
            done(error);
          })
      })
    });
  
    describe('GET /api/v1/users/all', () =>{
        it('Deve retornar um Json com todos os usuários', done =>{
            const token = { token: this.token };
            request(app.aplicationExpress)
            .get('/api/v1/users/all')
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

    describe('GET /api/v1/users/id/:id', () =>{
        it('Deve retornar um Json com um usuário', done =>{
            request(app.aplicationExpress)
            .get(`/api/v1/users/id/${userDefault.id_user}`)
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

    describe('GET /api/v1/users/email', () =>{
      it('Deve retornar um usuário por Email', done =>{
        const credentials = { email: userDefault.email };
          request(app.aplicationExpress)
          .get(`/api/v1/users/email`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `JWT ${this.token}`)
          .send(credentials)
          .end((error, res)=>{
              expect(res.status).to.equal(HTTPStatus.OK);
              expect(res.body.payload.id_user).to.equal(userDefault.id_user);
              expect(res.body.payload).to.have.all.keys([ 'id_user', 'name', 'email', 'password' ]);
              this.id_user = res.body.payload.id_user
              done(error);
          })
      });
  });

    describe('POST /api/v1/users/create', () =>{
        it('Deve inserir/Criar novo usuário, retorno 200', done =>{
            const user = {
                id_user: 200,
                name:'FernandoTeste',
                email: 'novo@gmail.com',
                password: 'novouser'
            }
            request(app.aplicationExpress)
            .post('/api/v1/users/create')
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
    describe('PUT /api/v1/users/update/:id', () => {
        it('Deve atualizar um Usuário', done => {
          const user = {
            name: 'Fernando Teste Update',
            email: 'update@email.com'
          };
          request(app.aplicationExpress)
            .put(`/api/v1/users/update/${userTest.id_user}`)
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
      describe('DELETE /api/v1/users/destroy/:id', () => {
        it('Deve remover um usário', done => {
          request(app.aplicationExpress)
            .del(`/api/v1/users/destroy/${userTest.id_user}`)
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