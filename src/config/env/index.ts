require('custom-env').env();
const{
    NODE_ENV,
    SERVER_HOST,
    SERVER_PORT,
    AUTH_SECRET,
    DB_NAME,
    DB_DIALECT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
} = process.env;

module.exports = {
    environment : NODE_ENV,
    host : SERVER_HOST,
    serverPort: SERVER_PORT,
    secret : AUTH_SECRET,
    database : DB_NAME,
    dialect : DB_DIALECT,
    username : DB_USERNAME,
    password : DB_PASSWORD,
    dataBaseHost : DB_HOST,
    dataBasePort : DB_PORT,
    dbURL: `postgres://${ DB_USERNAME }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`
};