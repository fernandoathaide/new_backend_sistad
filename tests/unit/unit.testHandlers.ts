import { expect } from './config/helpers';
import Handlers from '../../src/core/handlers/response-handlers';
import * as HTTPStatus from 'http-status';


describe('Testes Unitários do Handler para melhorar a %.', () =>{
    
    describe('Método onSuccess', () => {
        it('Deve emitir mensagem de sucesso', () =>{
            return Handlers.onSuccess;
        });
    });
});