import {Request} from "express";

export const imageFileValidator = (req: any, file: Express.Multer.File, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = 'Only image files are allowed';
        return callback(null, false);
    }
    callback(null, true);
}