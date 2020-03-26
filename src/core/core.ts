import express from 'express';
import { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { RouterModule } from './router/routes';
import ResponseHandlers from './handlers/response-handlers';

import { AuthStrategy } from '../modules/auth/auth-strategy';
const { secret } = require('../config/env');

const swagger = require('./swagger');

//Definição inicial da nossa aplicação API de entrada.
export class CoreModule{

    private _aplicationExpress: Application;
    private authService;
    private routerModeule: RouterModule;

    constructor(){
        this._aplicationExpress = express();
        this.authService = new AuthStrategy(secret).setStrategy();
        this.configExpress();
        this.routerModeule = new RouterModule(this.aplicationExpress);
        this.router();
    }

    public get aplicationExpress(): Application{
        return this._aplicationExpress; 
    }

    private configExpress(): void{
        this._aplicationExpress.use(this.configHeaders.bind(this));
        this._aplicationExpress.use(morgan('dev')); //Toda requisição feita será gerada um log no console da aplicação para acompanhamento.
        this._aplicationExpress.use(bodyParser.urlencoded({extended: true})); // URLENCODED - Formato dos dados submetidas extended true vai ser capaz de interpretar mais informações do que o padrão.
        this._aplicationExpress.use(bodyParser.json());//Se o que for passado for um JSON transformando em um objeto para ser tratado aqui dentro
        this._aplicationExpress.use(ResponseHandlers.errorHandlerApi);
        this._aplicationExpress.use(this.authService.initialize());
        swagger(this._aplicationExpress);
    }
    private router(): void{
        this.routerModeule.exposeRoutes(this.authService.authenticate);
    }
    private configHeaders(req: Request, res: Response, next: NextFunction){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
}