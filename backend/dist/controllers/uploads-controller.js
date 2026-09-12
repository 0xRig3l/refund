import uploadConfig from "@/configs/upload.js";
import { DiskStorage } from "@/providers/disk-storage.js";
import { AppError } from "@/utils/AppError.js";
import z, { ZodError } from "zod";
class UploadsController {
    async create(request, response, next) {
        const diskStorage = new DiskStorage();
        try {
            const fileSchema = z
                .object({
                filename: z.string().min(1, "File is required"),
                mimetype: z
                    .string()
                    .refine((type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type), "Invalid file format. Only JPEG, JPG and PNG are allowed."),
                size: z
                    .number()
                    .positive()
                    .refine((size) => size <= uploadConfig.MAX_FILE_SIZE, "Invalid file size. Maximum size is 3MB."),
            })
                .loose(); // Allows additional properties from Multer
            const file = fileSchema.parse(request.file);
            const filename = await diskStorage.saveFile(file.filename);
            response.status(201).json({ filename });
        }
        catch (error) {
            if (error instanceof ZodError) {
                if (request.file) {
                    await diskStorage.deleteFile(request.file.filename, "tmp");
                }
                throw new AppError(error.issues[0].message);
            }
            throw error;
        }
    }
}
export { UploadsController };
