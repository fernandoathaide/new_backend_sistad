'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { dbURL, database, password, username } = require('../config/env');
var basename  = path.basename(module.filename);
const db: any = {};

if (dbURL) {
  var sequelize = new Sequelize(dbURL);
} else {
  var sequelize = new Sequelize(database, username, password);
}
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    let extension = '.js'
    if(process.env.NODE_ENV == 'development') extension = '.ts'
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) == `${extension}`);
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
