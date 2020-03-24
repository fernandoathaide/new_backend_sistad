import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserService from '../user/user-service';
import ResponseHandlers from '../../core/handlers/response-handlers';

class AuthController {
    /**
     * @swagger
     * /auth/token:
     *   post:
     *     tags:
     *     - "token"
     *     description: Gerador de tokens
     *     produces:
     *       - multipart/form-data
     *     parameters:
     *     - name: "email"
     *       in: "formData"
     *       required: true
     *       type: "string"
     *     - name: "password"
     *       in: "formData"
     *       required: true
     *       type: "string"
     *     responses:
     *       200:
     *         description: "Token gerado com sucesso!"
     *       401:
     *         description: "Usuário não encontrado."
     */

    async auth(req: Request, res: Response){
        const { email, password } = req.body;
        console.log(email, password);
        if(email && password){
            try {
                const user = await UserService.getUserByEmail(email);
                ResponseHandlers.authSuccess(res, password, user);
            } catch (error) {
                ResponseHandlers.authFail(req, res);
            }
        }else{
            return ResponseHandlers.onError(res, 'Necessário informar email e senha!', 'no-credentials');
        }
    }
}
export default new AuthController();