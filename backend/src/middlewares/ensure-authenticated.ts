import { authConfig } from "@/configs/auth.js";
import { AppError } from "@/utils/AppError.js";

import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

type TokenPayload = {
  id: string;
  role: string;
};

async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token de autenticação não encontrado", 401);
    }

    const [, token] = authHeader.split(" ");
    const { secret: s } = authConfig.jwt;
    const secret = new TextEncoder().encode(s);

    const { payload } = await jwtVerify(token, secret);
    const { id, role } = payload as TokenPayload;

    request.user = {
      id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Token de autenticação inválido", 401);
  }
}

export { ensureAuthenticated };
