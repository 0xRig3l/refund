import { AppError } from "../utils/AppError.js";
import { prisma } from "../database/prisma.js";
import { z } from "zod";
const CategoriesEnum = z.enum([
    "food",
    "others",
    "services",
    "transport",
    "accommodation",
]);
class RefundsController {
    async create(request, response) {
        const bodySchema = z.object({
            description: z
                .string()
                .trim()
                .min(3, "A descrição deve ter pelo menos 3 caracteres")
                .max(70, "A descrição pode ter no máximo 70 caracteres"),
            category: CategoriesEnum,
            amount: z
                .number("Digite um valor válido")
                .positive("O valor deve ser maior que zero"),
            filename: z.string().min(20),
        });
        const { description, category, amount, filename } = bodySchema.parse(request.body);
        if (!request.user?.id) {
            throw new AppError("Não autorizado", 401);
        }
        const refund = await prisma.refunds.create({
            data: {
                description,
                category,
                amount,
                filename,
                userId: request.user.id,
            },
        });
        response.status(201).json(refund);
    }
    async index(request, response) {
        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10),
        });
        const { name, page, perPage } = querySchema.parse(request.query);
        const skip = (page - 1) * perPage;
        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
            where: {
                user: { name: { contains: name } },
            },
            orderBy: { createdAt: "desc" },
            include: { user: { omit: { password: true } } },
        });
        const totalRecords = await prisma.refunds.count();
        const totalPages = Math.ceil(totalRecords / perPage);
        response.json({
            refunds,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1,
            },
        });
    }
    async show(request, response) {
        const paramsSchema = z.object({
            id: z.uuid(),
        });
        const { id } = paramsSchema.parse(request.params);
        const where = request.user?.role === "manager"
            ? { id }
            : { id, userId: request.user?.id };
        const refund = await prisma.refunds.findFirst({
            where,
            include: { user: { omit: { password: true } } },
        });
        if (!refund) {
            throw new AppError("Reembolso não encontrado", 404);
        }
        response.json(refund);
    }
}
export { RefundsController };
