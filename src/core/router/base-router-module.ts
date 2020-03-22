import { Request, Response } from 'express';

export interface ModuleEndPointMap{
    [key: string]: HttpVerbMap;
}
export interface HttpVerbMap{
    get?: Array<FeatureModuleRouterInfo>;
    post?: Array<FeatureModuleRouterInfo>;
    put?: Array<FeatureModuleRouterInfo>;
    patch?: Array<FeatureModuleRouterInfo>;
}
export interface FeatureModuleRouterInfo{
    endpoint?: string;
    callback?: Function;
    isProtected?: boolean;
}


export class BaseRouterModule{
    protected readonly context : string = '/api';
    protected version : string = 'v1';
    protected moduleName : string = 'rest-api';

    constructor(moduleName: string){
        if(typeof moduleName === 'string'){
            this.moduleName = moduleName;
        }
    }

    //Regras de rotas
    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]:{
            get: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}`,
                    callback: (req: Request, res: Response) =>{
                        res.sendStatus(200).send({ status: 200, msg: 'Rota Ok!'});
                    },
                    isProtected: false

                }
            ]
        }
    }

    public getRoutesFromModules(): ModuleEndPointMap {
        return this.MODULES_ENDPOINT_MAP;
    }

}