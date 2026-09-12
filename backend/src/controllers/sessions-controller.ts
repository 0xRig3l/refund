import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { z } from "zod";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email({ message: "Digite um e-mail válido" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw new AppError("Credenciais inválidas", 401);
      }

      const passwordMatches = await compare(password, user.password);

      if (!passwordMatches) {
        throw new AppError("Credenciais inválidas", 401);
      }

      const { secret: s, expiresIn } = authConfig.jwt;
      const secret = new TextEncoder().encode(s);

      const token = await new SignJWT({ id: user.id, role: user.role })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);

      const { password: _, ...userWithoutPassword } = user;

      response.status(201).json({ token, user: userWithoutPassword });
    } catch (error) {
      throw new AppError("Erro ao entrar na conta", 500);
    }
  }
}

export { SessionsController };
