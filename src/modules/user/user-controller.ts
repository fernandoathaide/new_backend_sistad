import { Request, Response } from 'express';
import * as _ from 'lodash';
import  UserService  from './user-service';
import ResponseHandlers from '../../core/handlers/response-handlers';

class UserController {

    constructor(){}
    /**
     * @swagger
     * /users/create:
     *   post:
     *     tags:
     *     - "users"
     *     description: Criar Usuário do sistema
     *     produces:
     *       - multipart/form-data
     *     parameters:
     *     - name: "id"
     *       in: "formData"
     *       required: false
     *       type: "integer"
     *     - name: "name"
     *       in: "formData"
     *       required: true
     *       type: "string"
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
     *         description: "Usuário criado com sucesso!"
     *       401:
     *         description: "Erro na criação do usuário."
     */
    createUser(req: Request, res: Response){
        UserService
            .createUser(req.body)
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.dbErrorHandler, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao criar o usuário.'))
    }
     /**
     * @swagger
     * /users/all:
     *   get:
     *     tags:
     *     - "users"
     *     description: Buscar todos os usuários sistema
     *     responses:
     *       200:
     *         description: "Busca com sucesso!"
     *       401:
     *         description: "Erro na busca de usuários."
     */
    async getAllUser(req: Request, res: Response){
        try{
            const users = await UserService.getAllUser()
            ResponseHandlers.onSuccess(res, users);
        } catch (error) {
            ResponseHandlers.onError(res, 'Erro ao buscar todos os usuários.', error);
        }
    }
     /**
     * @swagger
     * /users/id/{id}:
     *   get:
     *     tags:
     *     - "users"
     *     summary: "Busca por ID do Usuário."
     *     description: Consultar por ID
     *     produces:
     *       - "application/xml"
     *     parameters:
     *     - name: "id"
     *       in: "path"
     *       required: true
     *       type: "integer"
     *     responses:
     *       200:
     *         description: "Consulta sucesso!"
     *       401:
     *         description: "Erro na consulta por ID."
     */
    getUserById(req: Request, res: Response){
        UserService
            .getUserById(parseInt(req.params.id))
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao buscar um usuário por ID.'))
    }
    /**
     * @swagger
     * /users/email:
     *   get:
     *     tags:
     *     - "users"
     *     summary: "Consultar por Email."
     *     description: Consultar um usuário por email.
     *     produces:
     *       - multipart/form-data
     *     parameters:
     *     - name: "email"
     *       in: "formData"
     *       required: true
     *       type: "string"
     *     responses:
     *       200:
     *         description: "Consulta com sucesso!"
     *       401:
     *         description: "Erro ao consultar usuário."
     */
    getUserByEmail(req: Request, res: Response){
        UserService
            .getUserByEmail(req.body.email)
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao buscar um usuário por Email.'))
    }
    /**
     * @swagger
     * /users/update/{id}:
     *   put:
     *     tags:
     *     - "users"
     *     summary: "Altearar Usuário."
     *     description: Altera um usuário por ID fornecido.
     *     produces:
     *       - multipart/form-data
     *     parameters:
     *     - name: "id"
     *       in: "path"
     *       required: true
     *       type: "string"
     *     - name: "email"
     *       in: "formData"
     *       required: false
     *       type: "string"
     *     - name: "name"
     *       in: "formData"
     *       required: false
     *       type: "string"
     *     - name: "password"
     *       in: "formData"
     *       required: false
     *       type: "string"
     *     responses:
     *       200:
     *         description: "Alterado com sucesso!"
     *       401:
     *         description: "Erro ao alterar usuário."
     */
    updateUser(req: Request, res: Response){
        const id_user = parseInt(req.params.id);
        const props = req.body;
        UserService
            .updateUser(id_user, props)
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.dbErrorHandler, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao alterar o usuário.'))
    }
    /**
     * @swagger
     * /users/destroy/{id}:
     *   delete:
     *     tags:
     *     - "users"
     *     summary: "Deletar Usuário."
     *     description: Deletar um usuário.
     *     produces:
     *       - "application/xml"
     *     parameters:
     *     - name: "id"
     *       in: "path"
     *       required: true
     *       type: "integer"
     *     responses:
     *       200:
     *         description: "Deletado com sucesso!"
     *       401:
     *         description: "Erro ao deletar usuário."
     */
    deleteUser(req: Request, res: Response){
        UserService
            .deleteUser(parseInt(req.params.id))
            .then(_.partial(ResponseHandlers.onSuccess, res))
            .catch(_.partial(ResponseHandlers.onError, res, 'Erro ao deletar um usuário.'))
    }
}

export default new UserController();