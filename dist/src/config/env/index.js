require('custom-env').env('development', './');
var _a = process.env, NODE_ENV = _a.NODE_ENV, SERVER_HOST = _a.SERVER_HOST, SERVER_PORT = _a.SERVER_PORT, AUTH_SECRET = _a.AUTH_SECRET, DB_NAME = _a.DB_NAME, DB_DIALECT = _a.DB_DIALECT, DB_USERNAME = _a.DB_USERNAME, DB_PASSWORD = _a.DB_PASSWORD, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT;
module.exports = {
    environment: NODE_ENV,
    host: SERVER_HOST,
    serverPort: SERVER_PORT,
    secret: AUTH_SECRET,
    database: DB_NAME,
    dialect: DB_DIALECT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dataBaseHost: DB_HOST,
    dataBasePort: DB_PORT,
    dbURL: "postgres://" + DB_USERNAME + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME
};
//# sourceMappingURL=index.js.map