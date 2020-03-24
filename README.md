# ESTRUTURA DO PROJETO
    - API Server em NODE JS 
    - Modelo em camadas MVC 
    - SEQUELIZE: Mapeamento Relacional e Migrations - Object Relational Mapper (ORM) para NodeJS baseado em promises que tem como principal objetivo unir a orientação objeto com a parte relacional, onde faz um mapeamento dos tipos de dados relacional gerando o objeto com a mesma representação dos dados.
    - EXPRESS: Estrutura de aplicativo da web para Node.js, lançada como software livre e de código aberto sob a licença MIT. Ele foi projetado para criar aplicativos da Web e APIs.

    ## FERRAMENTAS PARA TESTES DE Integração e Unitários:
        - MOCA: framework Javascript que roda em aplicações Node. js e no browser para realizar testes assíncronos de uma maneira simples e fácil
        - CHAI: biblioteca BDD/TDD de assertions para node e navegadores, que pode ser deliciosamente combinada com qualquer framework de testes em Javascript.
        - SUPERTEST: - TESTDOUBLE:

    ## FERRAMENTA PARA GERAÇÃO DE TOKEN DE SEGURANÇA:
     - PASSPORT PASSPORT-JWT e JWT-SIMPLE: middleware para Node. js que faz a implementação de autenticação em um aplicativo de maneira rápida e fácil.

    ## GERAÇÃO DE CRIPTOGRAFIA

    ## CARREGAMENTO SWAGGER PARA APRESENTAÇÃO DA API
    projeto composto por algumas ferramentas que auxiliam o desenvolvedor de APIs REST em algumas tarefas como: Modelagem da API. Geração de documentação (legível) da API. Geração de códigos do Cliente e do Servidor, com suporte a várias linguagens de programação.
    
# Comandos iniciais arquitetura do projeto
npm i body-parser express http morgan pg -S
npm install npm     //Atualizando o NPM  New minor version of npm available! 6.13.7 → 6.14.2
npm i ts-node -D    //DEPENDÊNCIA DE DESENVOLVIMENTO
npm i nodemon -S //Roda a aplicação a cada alteração.
npm i @types/express @types/body-parser @types/morgan -D //ou --save-dev
npm i sequelize sequelize-cli -S 
npm i @types/sequelize -D
npm install --save pg pg-hstore //Plugin para PostgreSQL

npm install @types/node --save-dev

npm install -D ts-node && npm install -D typescript

## Ferramentas para teste unitários
npm i mocha chai supertest testdouble -D
npm i @types/mocha @types/chai @types/supertest -D

## Inicializando o Sequelize dentro da pasta server
    cd server
    sequelize init
### Criando e executando migration com o sequelize
    sequelize model:create --name User --attributes name:string,email:string,password:string
    ID, createdAt e UpdatedAt ele cria automatico
    sequelize db:migrate --env test


### Caso de erro
npm install -g sequelize-cli
npm i sequelize-cli -S

## Biblioteca HTTP Status
npm i http-status -S
npm i @types/http-status -D

## Biblioteca BLUEBIRD
npm i bluebird -S
npm i @types/bluebird -D

## Biblioteca LODASH
npm i lodash -S
npm i @types/lodash -D

## Bibliotecas JWT Passport jwt-simple
npm i passport passport-jwt jwt-simple -S
npm i @types/passport @types/passport-jwt @types/jwt-simple -D

## Swagger para apresentação da API
npm i swagger-ui-express -S
npm i swagger-jsdoc-express swagger-jsdoc -S

## BCRYPT Criptografia das senhas
npm i bcrypt -S
npm i @types/bcrypt -D

## Biblioteca para cobertura de código
npm i istanbul nyc -D


# GULP Automatização
    O gulp é um kit de ferramentas JavaScript de código aberto criado por Eric Schoffstall usado como um sistema de criação de streaming no desenvolvimento web front-end.
    Obs.: Também pode ser usado para acelerar o desenvolvimento do BackEnd.

## Instalação do modulo CLI do Gulp
    npm i gulp gulp-typescript gulp-clean -D
    npm install -g gulp-cli
    npm install -S gulp-cli
    gulpfile.js //Arquivo de configuração criado na raiz do projeto onde será feita a automatização
    METODOS PRINCIPAIS: 
        gulp.src(args)                  //Arquivo ou diretório a ser lido
        gulp.dest(dest)                 //Destino de saída do processamento
        gulp.task(nome,callback() {} )  //Cria uma tarefa e executa dentro da função de callback
        gulp.run(task1, task2 ...)      //Execulta as tarefas em ordem
        gulp.watch(arg, task)           //Executa uma determinada task com base no argumento passado

    Apos criar o arquivo gulpfile.js basta rodar o comando 
    gulp [nome da task]

# FERRAMENTA PARA INTEGRAÇÃO CONTINÚA
            jenkins
            Circle CI
            Travis CI
## Instalando e Configurando o TRAVIS CI - Integrado ao GitHub que trabalha com o NODE.
Criar o arquivo .travis.yml

# Programa para gravação de aulas
Simple Scren Recorder

# Biblioteca Global CUSTOM-ENV
npm i -S custom-env

## DEPENDÊNCIAS GLOBAIS BIBLIOTECAS
 npm install -g gulp-cli
 npm install -g sequelize-cli


## CONFIGURAÇÃO DO PROXY LINUX
    sudo nano /etc/profile
    sudo nano /etc/environment
    nano ~/.bashrc

    =======================
    Cofigurações do proxy:
        PROXY:
            proxy.ccabr.intraer:8080
            proxybrasilia.intraer:8080 
    =======================

    proxy="http://04076228456:wff@260981N%40@proxy.ccabr.intraer:8080"
    export https_proxy=$proxy
    export http_proxy=$proxy
    export ftp_proxy=$proxy
    export no_proxy="*.intraer,localhost,127.0.0.0/8,10.0.0.0/8,192.168.0.0/16,::1,172.16.44.50,10.*,intraer,https://gitlab.com*"


    source ~/.bashrc // Reincia sem sair do terminal