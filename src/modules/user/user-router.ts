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
                    isProtected: true
                },
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/id/:id`,
                    callback: UserController.getUserById,
                    isProtected: false
                },
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/email`,
                    callback: UserController.getUserByEmail, 
                    isProtected: false
                }
            ],
            put: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/update/:id`,
                    callback: UserController.updateUser,
                    isProtected: false
                }
            ],
            delete: [
                {
                    endpoint: `${ this.context }/${this.version}/${this.moduleName}/destroy/:id`,
                    callback: UserController.deleteUser,
                    isProtected: false
                }
            ]
        },
       
    };
}