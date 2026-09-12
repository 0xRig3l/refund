import { AppError } from "../utils/AppError.js";
import { prisma } from "../database/prisma.js";
import { hash } from "bcrypt";
import { z } from "zod";
var UserRole;
(function (UserRole) {
    UserRole["Employee"] = "employee";
    UserRole["Manager"] = "manager";
})(UserRole || (UserRole = {}));
class UsersController {
    async create(request, response) {
        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "Name is required" }),
            email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),
            password: z
                .string()
                .min(6, { message: "Password must have at least 8 digits" }),
            role: z.enum(UserRole).default(UserRole.Employee),
        });
        const { name, email, password, role } = bodySchema.parse(request.body);
        const isEmailInUse = await prisma.user.findFirst({ where: { email } });
        if (isEmailInUse) {
            throw new AppError("This email is already in use.");
        }
        const hashedPassword = await hash(password, 8);
        try {
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                },
            });
        }
        catch (error) {
            throw new AppError("Unexpected error when creating the user. Please try again", 500);
        }
        response.status(201).json();
    }
}
export { UsersController };
