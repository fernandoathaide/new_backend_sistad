
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
        swagger: "2.0",
        info: {
            version: "4.1.3",
            title: "Swagger API de Backend SISTAD.",
            termsOfService: "http://swagger.io/terms/",
            description:"Sistema de Promoção de Oficiais/Graduados",
            contact: {
            name: "Fernando Athaide Nóbrega Filho",
            url: "http://rqhsolucoes.com.br/",
            email:"fernandoathaide@hotmail.com"
        },
        servers: {
            url: "http://localhost:5000/api/v1",
            description: "Servidor de desenvolvimento"
        },
        license: {
            name: "Apache 2.0",
            url: "https://github.com/OAI/OpenAPI-Specification/blob/master/https://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    schemes: {
        //https: "https://localhost:5000/api/v1",
        http: "http://localhost:5000/api/v1"
    },
    host: "localhost:5000", // the host or url of the app
    basePath: "/api/v1", // the basepath of your endpoint
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    explorer: true,

    // path to the API docs
    apis: ["**/*controller.ts"],
};
// initialize swagger-jsdoc

const specs = swaggerJSDoc(options);
module.exports = (app) =>{
    app.use('/src/core/swagger',swaggerUi.serve, swaggerUi.setup(specs));
};