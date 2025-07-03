"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const uploadImages = async (req, res) => {
    if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    try {
        const uploadPromises = req.files.map((file) => cloudinary_1.default.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error)
                throw error;
            return result?.secure_url;
        }));
        // Actually, need to wrap upload_stream in a Promise for each file
        const urls = [];
        for (const file of req.files) {
            const url = await new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result?.secure_url);
                });
                stream.end(file.buffer);
            });
            urls.push(url);
        }
        res.json({ urls });
    }
    catch (err) {
        res.status(500).json({ error: err.message || 'Upload failed' });
    }
};
exports.uploadImages = uploadImages;
