import { v2 as cloudinary } from 'cloudinary';
import { Router, Request, Response } from 'express';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    res.status(500).json({ message: 'Error al subir imagen', error: String(error) });
  }
});

export default router;
