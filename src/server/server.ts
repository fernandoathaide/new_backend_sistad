import * as http from 'http';
import { CoreModule } from '../core/core';
const { serverPort } = require('../config/env');

export class Server {
    private db;
    private expressApi;

    //Recebendo o sequilize do bootstrap
    constructor(dataBaseConnector){
        if(dataBaseConnector){
            this.db = dataBaseConnector;
            this.expressApi = new CoreModule().aplicationExpress;
            this.syncDataBase();
        }
    }
    private async syncDataBase(){
        try {
            const syncData = await this.db.sync();
            this.dataBaseSyncHandler(syncData);
        } catch (error) {
            this.dataBaseSyncErrorHandler(error);
        }
    }
    private dataBaseSyncHandler(dataBaseInfo){
        const { options, config, modelManager } = dataBaseInfo.sequelize;
        const { models } = modelManager;
        this.upServer();
        this.logDataBaseConnection({ models, options, config });
    }
    private dataBaseSyncErrorHandler(error){
        console.log(`Can't connect to a database because ${error}.`);
        this.upServer();
    }
    private upServer(){
        http.createServer(this.expressApi)
            .listen(serverPort)
            .on('listening', this.onServerUp.bind(this, serverPort))
            .on('error', this.onServerStartupError.bind(this));
    }
    private onServerUp(port: number){
        console.log(`Server rodando na porta ${port}`);
    }
    private onServerStartupError(error: NodeJS.ErrnoException){
        console.log(`Server erro de running: Error:  ${error}`);
    }
    private logDataBaseConnection({models, options, config}){
        const  {dialect, dataBasehost} = options;
        const  { database, dataBassePort} = config;
        if(dialect && dataBasehost && database && dataBassePort && models){
            console.log(`Data base dialect: ${dialect}`);
            console.log(`Host de conexão data base: ${ dataBasehost }`);
            console.log(`Data Base name: ${database}`);
            console.log(`Data Base Port: ${dataBassePort}`);
            console.log(`Created Tables: ${models}`);
        }
    }
}