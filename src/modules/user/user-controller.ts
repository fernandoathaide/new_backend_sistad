import { Request, Response } from 'express';
import * as _ from 'lodash';
import  UserService  from './user-service';
import ResponseHandlers from '../../core/handlers/response-handlers';

class UserController {

    constructor(){}

    createUser(req: Request, res: Response){
        UserService
            .createUser(req.body)
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.dbErrorHandler, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao criar o usuário.'))
    }
    
    async getAllUser(req: Request, res: Response){
        try{
            const users = await UserService.getAllUser()
            ResponseHandlers.onSuccess(res, users);
        } catch (error) {
            ResponseHandlers.onError(res, 'Erro ao buscar todos os usuários.', error);
        }
    }

    getUserById(req: Request, res: Response){
        UserService
            .getUserById(parseInt(req.params.id))
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao buscar um usuário por ID.'))
    }
    updateUser(req: Request, res: Response){
        const id_user = parseInt(req.params.id_user);
        const props = req.body;
        UserService
            .updateUser(id_user, props)
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.dbErrorHandler, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao alterar o usuário.'))
    }
    deleteUser(req: Request, res: Response){
        UserService
            .deleteUser(parseInt(req.params.id_user))
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao deletar um usuário.'))
    }
}

export default new UserController();