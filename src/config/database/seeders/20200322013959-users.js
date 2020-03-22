'use strict';

module.exports = {
  up: (queryInterface, Sequelize)  => queryInterface.bulkInsert('Users', 
    [
      {
        name: 'Fernando Athaide Nóbrega Filho',
        email: 'fernandoathaide@hotmail.com',
        password: 'fernando',
      },
      {
        name: 'Teste',
        email: 'test@medium.com',
        password: 'teste',
      }
    ]
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
