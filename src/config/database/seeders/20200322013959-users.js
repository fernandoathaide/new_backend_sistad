'use strict';

module.exports = {
  up: (queryInterface, Sequelize)  => queryInterface.bulkInsert('Users', 
    [
      {
        name: 'Fernando Athaide Nóbrega Filho',
        email: 'fernandoathaide@hotmail.com',
        password: '$2b$10$KW28Rxt5ZmtQfUsCLw9LSOzC9.D3lCx.qaOEAKznVMmjmtc3NH4dW',
      },
      {
        name: 'Teste',
        email: 'test@medium.com',
        password: '$2b$10$KW28Rxt5ZmtQfUsCLw9LSOzC9.D3lCx.qaOEAKznVMmjmtc3NH4dW',
      }
    ]
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
