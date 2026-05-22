import { Request, Response } from 'express';
import { createMascota, getMascotas } from './mascotas.service';

export async function listar(req: Request, res: Response) {
  try {
    const tipo = req.query.tipo as string | undefined;
    const mascotas = await getMascotas(tipo);
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mascotas', error: String(error) });
  }
}

export async function crear(req: Request, res: Response) {
  try {
    const mascota = await createMascota(req.body);
    res.status(201).json(mascota);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear mascota', error: String(error) });
  }
}
