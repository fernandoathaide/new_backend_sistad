import { expect } from './config/helpers';
import ServiceUser from '../../server/modules/User/serviceUser';
const model = require('../../server/models');


describe('Testes Unitários do userController', () =>{
    
      const userDefault = {
        id_user: 1,
        name: 'Default User',
        email: 'defaultuser@email.com',
        password: '1234'
      }
      beforeEach((done) => {
        model.User.destroy({
          where: {}
        })
        .then(() => {
          model.User.create(userDefault).then(() => {
            console.log(`Default User created`)
            done();
          });
        })
      });
    
    //CRIAR USER TESTE
    describe('Método Create', () => {
        it('Deve Criar um novo Usuário', () =>{
            return ServiceUser.createUser({
                id_user: 2,
                name: 'Default User 2',
                email: 'defaultuser@email.com',
                password: '1234'
              })
            .then(data =>{
                expect(data.dataValues).to.have.all.keys(
                    ['email','id_user','name','password','updatedAt','createdAt']
                )
            });
        });
    });
    
    //UPDATE USER TESTE
    describe('Método Update', () => {
        it('Deve Alterar um Usuário', () =>{
            const userUpdate = { name:'UserUpdate', email: 'userUpdate@teste.com'}
            return ServiceUser.updateUser(userDefault.id_user, userUpdate).then(data => {
                expect(data[0]).to.be.equal(1);
            })
        });
    });
    
    //BUSCAR TODOS USER TESTE
    describe('Método GET Users Buscar Usuários', () => {
        it('Deve Retornar Lista com os Usuários', () =>{
            return ServiceUser.getAllUser().then(data => {
                expect(data).to.be.an('array'); //Proposito do teste é apenas verificar se o retorno é uma lista
            })
        });
    });
    
    //BUSCAR POR ID USER TESTE
    describe('Método Buscar Usuários Por ID', () => {
        it('Deve Retornar um Usuário buscado', () =>{
            return ServiceUser.getUserById(userDefault.id_user).then(data => {
                expect(data).to.have.all.keys(
                    ['email', 'id_user', 'name', 'password']
                  );
            })
        });
    });

    //BUSCAR POR EMAIL USER TESTE
    describe('Método Buscar Usuários Por EMAIL', () => {
        it('Deve Retornar um Usuário buscado por email', () =>{
            return ServiceUser.getUserByEmail(userDefault.email).then(data => {
                expect(data).to.have.all.keys(
                    ['email', 'id_user', 'name', 'password']
                  );
            })
        });
    });
    
    //EXCLUIR USER TESTE
    describe('Método Delete', () => {
        it('Deve Deletar um Usuário', () =>{
            return ServiceUser.deleteUser(userDefault.id_user).then(data => {
                expect(data).to.be.equal(1); //a execução do comando em banco retorna uma Run afetada                
            })
        });
    });
});