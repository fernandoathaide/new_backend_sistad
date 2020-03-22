import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module"
import UserController from './user-controller';

export class UserRouterModule extends BaseRouterModule {
      
    constructor(){
        super('users');
    }
    //GET
    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            post: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/create`,
                    callback: UserController.createUser,
                    isProtected: false
                }
            ], 
            get: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/all`,
                    callback: UserController.getAllUser,
                    isProtected: false
                },
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/:id`,
                    callback: UserController.getUserById,
                    isProtected: false
                }
            ],
            put: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/:id/update`,
                    callback: UserController.updateUser,
                    isProtected: false
                }
            ],
            delete: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/:id/destroy`,
                    callback: UserController.deleteUser,
                    isProtected: false
                }
            ]
        },
       
    };
}