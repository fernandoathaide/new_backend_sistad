import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module"
import UserController from './user-controller';

export class UserRouterModule extends BaseRouterModule {
      
    constructor(){
        super('users');
    }
    //GET
    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            get: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/all`,
                    callback: UserController.getAllUser,
                    isProtected: false
                }
            ]
        }        
    };
}