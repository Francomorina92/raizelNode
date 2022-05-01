import swaggerJSDoc,{OAS3Definition,OAS3Options,Options} from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition={
    openapi: "3.0.0",
    info:{
        title: "Documentacion Api Raizel",
        version: "1.0.0",
    },
    servers:[
        {
            url: "http://localhost:8000/api",
        },
    ],
    components: {
        /* securitySchemes: {
            "x-token":{
                type: "http",
                scheme: "bearer",
            }
        }, */
        schemas: {
          usuarioPost: {
            type: "object",
            required: ["nombre", "password", "email", "rol"],
            properties: {
              nombre: {
                type: "string",
              },
              password: {
                type: "string",
              },
              email: {
                type: "string",
              },
              rol: {
                type: "string",
              }
            },
          },
          usuarioPut: {
            type: "object",
            properties: {
              img: {
                type: "string",
              },
              email: {
                type: "string",
              },
              rol: {
                type: "string",
              }
            },
          },
          usuarioGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              email: {
                type: "string",
              },
              img: {
                type: "string",
              },
              rol: {
                type: "string",
              },
              google: {
                type: "boolean",
              },
              estado: {
                type: "boolean",
              },
              createdAt: {
                type: "string",
                format: 'date-time'
              },
              updatedAt: {
                type: "string",
                format: 'date-time'
              },
            },
          },
          login: {
            type: "object",
            properties: {
              correo: {
                type: "string",
              },
              password: {
                type: "string",
              }
            },
          },
          usuarioToken: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              token: {
                type: "string",
                default: 'tokenn'
              },
              email: {
                type: "string",
              },
              img: {
                type: "string",
              },
              rol: {
                type: "string",
              },
              google: {
                type: "boolean",
              },
              estado: {
                type: "boolean",
              },
              createdAt: {
                type: "string",
                format: 'date-time'
              },
              updatedAt: {
                type: "string",
                format: 'date-time'
              },
            },
          },
          categoriaGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              nombre: {
                type: "string",
                default: "Regular"
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          categoriaPost: {
            type: "object",
            required: ["nombre"],
            properties: {
              nombre: {
                type: "string",
              }
            },
          },
          categoriaPut: {
            type: "object",
            properties: {
              nombre: {
                type: "string",
              },
              estado: {
                type: "boolean",
              }
            },
          },
          equipamientoGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              nombre: {
                type: "string",
                default: "Mancuerna"
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          equipamientoPost: {
            type: "object",
            required: ["nombre"],
            properties: {
              nombre: {
                type: "string",
              }
            },
          },
          equipamientoPut: {
            type: "object",
            properties: {
              nombre: {
                type: "string",
              },
              estado: {
                type: "boolean",
              }
            },
          },
          musculoGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              nombre: {
                type: "string",
                default: "Bisep"
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          musculoPost: {
            type: "object",
            required: ["nombre"],
            properties: {
              nombre: {
                type: "string",
              }
            },
          },
          musculoPut: {
            type: "object",
            properties: {
              nombre: {
                type: "string",
              },
              estado: {
                type: "boolean",
              }
            },
          },
          calificacionGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              mensaje: {
                type: "string",
                default: "Excelente rutina"
              },
              calificacion: {
                type: "integer",
                default: 5
              },
              idPerfil: {
                type: "integer",
                default: 1
              },
              idUsuario: {
                type: "integer",
                default: 2
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          calificacionPost: {
            type: "object",
            required: ["idUsuario","idPerfil","calificacion"],
            properties: {
              mensaje: {
                type: "string",
              },
              idPerfil: {
                type: "integer",
              },
              idUsuario: {
                type: "integer",
              },
              calificacion: {
                type: "integer",
              }
            },
          },
          calificacionPut: {
            type: "object",
            required: ["idUsuario","idPerfil","calificacion"],
            properties: {
              mensaje: {
                type: "string",
              },
              idPerfil: {
                type: "integer",
              },
              idUsuario: {
                type: "integer",
              },
              calificacion: {
                type: "integer",
              },
              estado: {
                type: "boolean",
              }
            },
          },
          likeGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              idPerfil: {
                type: "integer",
                default: 1
              },
              idRutina: {
                type: "integer",
                default: 2
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          likePost: {
            type: "object",
            required: ["idUsuario","idPerfil"],
            properties: {
              idPerfil: {
                type: "integer",
              },
              idUsuario: {
                type: "integer",
              }
            },
          },
          likePut: {
            type: "object",
            required: ["idUsuario","idPerfil","estado"],
            properties: {
              idPerfil: {
                type: "integer",
              },
              idUsuario: {
                type: "integer",
              },
              estado: {
                type: "boolean",
                default: true
              },
            },
          },
          perfilGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              idUsuario: {
                type: "integer",
                default: 1
              },
              nombre: {
                type: "string",
                default: "Franco"
              },
              apellido: {
                type: "string",
                default: "Morina"
              },
              facebook: {
                type: "string",
                default: "www.facebook.com"
              },
              twitter: {
                type: "string",
                default: "www.twitter.com"
              },
              instagram: {
                type: "string",
                default: "www.instagram.com"
              },
              web: {
                type: "string",
                default: "www.francomorina.com.ar"
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          perfilPost: {
            type: "object",
            required: ["idUsuario","nombre"],
            properties: {
              nombre: {
                type: "string",
              },
              idUsuario: {
                type: "integer",
              }
            },
          },
          perfilPut: {
            type: "object",
            required: ["idUsuario","nombre"],
            properties: {
              nombre: {
                type: "string",
              },
              apellido: {
                type: "string",
                default: "Morina"
              },
              facebook: {
                type: "string",
                default: "www.facebook.com"
              },
              twitter: {
                type: "string",
                default: "www.twitter.com"
              },
              instagram: {
                type: "string",
                default: "www.instagram.com"
              },
              web: {
                type: "string",
                default: "www.francomorina.com.ar"
              },
              estado: {
                type: "boolean",
                default: true
              },
              idUsuario: {
                type: "integer",
              }
            },
          },
          rutinaGet: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                default: 5
              },
              idPerfil: {
                type: "integer",
                default: 1
              },
              nombre: {
                type: "string",
                default: "nombre rutina"
              },
              estado: {
                type: "boolean",
                default: true
              },
              createdAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
              updatedAt: {
                type: "string",
                format: 'date-time',
                default: "2022-04-04T00:36:27.000Z"
              },
            },
          },
          rutinaPost: {
            type: "object",
            required: ["idPerfil","nombre"],
            properties: {
              nombre: {
                type: "string",
              },
              idPerfil: {
                type: "integer",
              }
            },
          },
          rutinaPut: {
            type: "object",
            required: ["idPerfil","nombre","estado"],
            properties: {
              nombre: {
                type: "string",
              },
              idPerfil: {
                type: "integer",
              },
              estado: {
                type: "boolean",
              }
            },
          },
        },
        responses:{
          Unauthorized:{
            description: '(Unauthorized) No hay autorizaciÃ³n para llamar al servicio'
          },
          NotFound:{
            description: '(NotFound) No se encontrÃ³ informaciÃ³n' 
          },
          BadRequest:{
            description: '(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados'
          },
          ServerError:{
            description: 'Error en servidor'
          }
        },
        parameters:{
          token: {      
            in: 'header',
            name: 'x-token',
            description: 'Token de autenticaciÃ³n en API.',
            required: true,
            schema:{
              type: 'string'
            }
          }
        }
    
    
        
    }
}
const swaggerOptions: OAS3Options={
    swaggerDefinition,
    apis: ["./routes/*.ts"],
}
export default swaggerJSDoc(swaggerOptions);