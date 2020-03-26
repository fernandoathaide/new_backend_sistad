import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import userService from '../user/user-service';

export class AuthStrategy{
    
    private secret: string;

    constructor(segredo: string){
        this.secret = segredo;
    }
    setStrategy(){
        let opts = {
            secretOrKey: this.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
            // jwtFromRequest: ExtractJwt.fromHeader('jwt') //Extrai o Token do Header da Requisição
            /**
             * jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
             * Extrai o Token do Header da Requisição atribui a uma função
             * */
        };
        console.log(opts);
        passport.use(new Strategy(opts, (jwtPayload, done) =>{
            userService
                .getUserById(jwtPayload.id_user)
                .then(user =>{
                    if(user){
                        return done(null, {
                            id_user: user['id_user'],
                            email: user['email']
                        });
                    }
                    return done(null, false)
                })
                .catch(error => {
                    done(error, null)
                  });
        }));
        return {
            //Com a ES6 podemos fazer a declaração inline de uma ArrowFunction caso este possua apenas um comando.
            initialize: () => passport.initialize(), // Inicializa o Passport
            authenticate: () => passport.authenticate('jwt', {session: false}) // Retorna a estratégia Obj Ativo
          }
    }
    
}
