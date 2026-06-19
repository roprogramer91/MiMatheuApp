import { Router } from 'express';
import { google, ingresar, recuperar, registrar } from './auth.controller';

const router = Router();

router.post('/registro', registrar);
router.post('/login', ingresar);
router.post('/recuperar', recuperar);
router.post('/google', google);

export default router;
