import uploadConfig from "../configs/upload.js";
import fs from "node:fs";
import path from "node:path";
export class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(path.resolve(uploadConfig.TMP_FOLDER, file), path.resolve(uploadConfig.UPLOADS_FOLDER, file));
        return file;
    }
    async deleteFile(file, type) {
        const pathFile = type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER;
        const filePath = path.resolve(pathFile, file);
        try {
            await fs.promises.stat(filePath);
        }
        catch {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}
