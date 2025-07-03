import { Request, Response } from 'express';
import cloudinary from './cloudinary';

export const uploadImages = async (req: Request, res: Response) => {
  if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  try {
    const uploadPromises = req.files.map((file: any) =>
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) throw error;
        return result?.secure_url;
      })
    );
    // Actually, need to wrap upload_stream in a Promise for each file
    const urls: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      const url = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url!);
        });
        stream.end(file.buffer);
      });
      urls.push(url);
    }
    res.json({ urls });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
}; 