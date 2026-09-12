import { AppError } from "../utils/AppError.js";
import z, { ZodError } from "zod";
export const errorHandler = (error, _request, response, _next) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
        return;
    }
    if (error instanceof ZodError) {
        response.status(400).json({
            message: "Erro de validação",
            issues: z.treeifyError(error),
        });
        return;
    }
    response.status(500).json({ message: error.message });
    return;
};
