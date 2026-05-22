import { Router } from 'express';
import { crear, listar } from './mascotas.controller';

const router = Router();

router.get('/', listar);
router.post('/', crear);

export default router;
