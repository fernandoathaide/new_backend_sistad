https://medium.com/@diomalta/migrations-e-seeders-no-sequelizejs-67ba3571ed0e
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/sequelize/index.d.ts

            const User = sequelize.define('User', { 
            /* .... */ 
            }, {
            // não adicionar os atributos (updatedAt, createdAt)
            timestamps: false,

            // não permite deletar do banco, mas inseri na coluna deletedAt a data da exclusão
            // se o timestamps estiver ativado
            paranoid: true,

            // não adiciona camelcase para atributos gerados automaticamente
            // então se definirmos updatedAt ele será criado como updated_at
            underscored: true,

            // para evitar que o sequelize defina suas tabelas com o nome em plural automaticamente
            // como permanencia para permanencium ative a opção como true
            freezeTableName: true,

            // definindo o nome da sua tabela
            tableName: 'user_project'
            });