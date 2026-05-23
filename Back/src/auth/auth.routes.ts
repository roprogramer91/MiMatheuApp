import { Router } from 'express';
import { ingresar, recuperar, registrar } from './auth.controller';

const router = Router();

router.post('/registro', registrar);
router.post('/login', ingresar);
router.post('/recuperar', recuperar);

export default router;
