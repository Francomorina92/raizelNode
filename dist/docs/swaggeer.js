"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion Api Raizel",
        version: "1.0.0",
    },
    servers: [
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
            perfilGet: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                    },
                    nombre: {
                        type: "string",
                    },
                    estado: {
                        type: "boolean",
                    },
                    idUsuario: {
                        type: "integer",
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
        },
        responses: {
            Unauthorized: {
                description: '(Unauthorized) No hay autorizaciÃ³n para llamar al servicio'
            },
            NotFound: {
                description: '(NotFound) No se encontrÃ³ informaciÃ³n'
            },
            BadRequest: {
                description: '(Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados'
            },
            ServerError: {
                description: 'Error en servidor'
            }
        },
        parameters: {
            token: {
                in: 'header',
                name: 'x-token',
                description: 'Token de autenticaciÃ³n en API.',
                required: true,
                schema: {
                    type: 'string'
                }
            }
        }
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swaggeer.js.map