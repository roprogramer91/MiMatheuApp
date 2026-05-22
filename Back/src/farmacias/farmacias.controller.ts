import { Request, Response } from 'express';
import { getAyerHoyManiana, getFarmaciaTurnoPorFecha } from './farmacias.service';

export async function turnoHoy(req: Request, res: Response) {
  try {
    const fecha = new Date().toISOString().split('T')[0];
    const farmacia = await getFarmaciaTurnoPorFecha(fecha);
    res.json(farmacia);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener farmacia de turno', error: String(error) });
  }
}

export async function ayerHoyManiana(_req: Request, res: Response) {
  try {
    const data = await getAyerHoyManiana();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener farmacias', error: String(error) });
  }
}
