import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import farmaciaRoutes from './farmacias/farmacias.routes';
import mascotaRoutes from './mascotas/mascotas.routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/farmacias', farmaciaRoutes);
app.use('/api/mascotas', mascotaRoutes);

export default app;
