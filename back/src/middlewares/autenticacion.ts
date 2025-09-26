import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  if (token === "proyectoM3") next();
  else
    res
      .status(400)
      .json({
        message: "Error de solicitud. Falta autorizacion - leer .env.example",
      });
};

export default auth;
