'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _a = require('../config/env'), dbURL = _a.dbURL, database = _a.database, password = _a.password, username = _a.username;
var basename = path.basename(module.filename);
var db = {};
if (dbURL) {
    var sequelize = new Sequelize(dbURL);
}
else {
    var sequelize = new Sequelize(database, username, password);
}
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    var extension = '.js';
    if (process.env.NODE_ENV == 'development')
        extension = '.ts';
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) == "" + extension);
})
    .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
