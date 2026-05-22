import { Router } from 'express';
import { ayerHoyManiana, turnoHoy } from './farmacias.controller';

const router = Router();

router.get('/turno', turnoHoy);
router.get('/ayerhoymaniana', ayerHoyManiana);

export default router;
