import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module"
import  AuthController from './auth-controller';

export class AuthRouterModule extends BaseRouterModule {

    constructor(){
        super('auth');
    }
    
    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            post: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/token`,
                    callback: AuthController.auth,
                    isProtected: false
                }
            ]
        }
    };

}