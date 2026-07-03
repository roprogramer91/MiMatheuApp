import { v2 as cloudinary } from 'cloudinary';
import { Router, Request, Response } from 'express';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('[Cloudinary] cloud:', process.env.CLOUDINARY_CLOUD_NAME, '| key:', process.env.CLOUDINARY_API_KEY, '| secret len:', process.env.CLOUDINARY_API_SECRET?.length);

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

router.post('/', upload.single('foto'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No se recibió ninguna imagen' });
    return;
  }
  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'mimatheu/mascotas', resource_type: 'image' },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(req.file!.buffer);
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', JSON.stringify(error), error);
    res.status(500).json({ message: 'Error al subir imagen', error: error instanceof Error ? error.message : JSON.stringify(error) });
  }
});

export default router;
