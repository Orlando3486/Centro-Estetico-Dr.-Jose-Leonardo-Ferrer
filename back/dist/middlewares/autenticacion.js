"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => {
    const { token } = req.headers;
    if (token === "proyectoM3")
        next();
    else
        res
            .status(400)
            .json({
            message: "Error de solicitud. Falta autorizacion - leer .env.example",
        });
};
exports.default = auth;
//# sourceMappingURL=autenticacion.js.map