import { AppError } from "@/utils/AppError.js";
function verifyUserAuthorization(role) {
    return (request, _, next) => {
        if (!request.user || !role.includes(request.user.role)) {
            throw new AppError("Não autorizado", 401);
        }
        return next();
    };
}
export { verifyUserAuthorization };
