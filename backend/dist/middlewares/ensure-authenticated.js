import { authConfig } from "../configs/auth.js";
import { AppError } from "../utils/AppError.js";
import { jwtVerify } from "jose";
async function ensureAuthenticated(request, _, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError("Token de autenticação não encontrado", 401);
        }
        const [, token] = authHeader.split(" ");
        const { secret: s } = authConfig.jwt;
        const secret = new TextEncoder().encode(s);
        const { payload } = await jwtVerify(token, secret);
        const { id, role } = payload;
        request.user = {
            id,
            role,
        };
        return next();
    }
    catch (error) {
        throw new AppError("Token de autenticação inválido", 401);
    }
}
export { ensureAuthenticated };
