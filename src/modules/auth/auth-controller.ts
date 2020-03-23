import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserService from '../user/user-service';
import ResponseHandlers from '../../core/handlers/response-handlers';

class AuthController {
    
    constructor(){}

    public async auth(req: Request, res: Response){
        try{
            const { name, email } = req.body;            
            const user = await UserService.getUserByEmail(email);
            console.log(user);
            console.log('Senha do usuário ===========' + user['password']);
            ResponseHandlers.authSuccess(res, user['password'] , user);
        }catch(erro){
            console.log(erro);
        }
    }
}
export default new AuthController();