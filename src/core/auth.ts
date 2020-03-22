import { Request, Response } from 'express';
import * as _ from 'lodash';
import  UserService from '../modules/user/user-service'; 
import ResponseHandlers from '../core/handlers/response-handlers';   

export class TokenRoutes {

    constructor(){ }

  auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
      UserService
        .getUserByEmail(credentials.email)
        .then(_.partial(ResponseHandlers.authSuccess, res, credentials))
        .catch(_.partial(ResponseHandlers.authFail, req, res));
    }
  }
}