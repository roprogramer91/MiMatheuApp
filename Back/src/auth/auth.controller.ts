import { Request, Response } from 'express';
import { login, loginConEmail, loginConGoogle, registro } from './auth.service';

export async function registrar(req: Request, res: Response) {
  try {
    const { nombre, telefono, email } = req.body;
    if (!nombre?.trim() || !telefono?.trim()) {
      res.status(400).json({ message: 'Nombre y teléfono son requeridos' });
      return;
    }
    const result = await registro({ nombre: nombre.trim(), telefono: telefono.trim(), email: email?.trim() || undefined });
    res.status(201).json(result);
  } catch (error) {
    const msg = String(error);
    if (msg.includes('TELEFONO_EN_USO')) {
      res.status(409).json({ message: 'Ese número de teléfono ya está registrado' });
    } else if (msg.includes('EMAIL_EN_USO')) {
      res.status(409).json({ message: 'Ese email ya está registrado' });
    } else {
      res.status(500).json({ message: 'Error al registrar', error: msg });
    }
  }
}

export async function ingresar(req: Request, res: Response) {
  try {
    const { telefono } = req.body;
    if (!telefono?.trim()) {
      res.status(400).json({ message: 'El teléfono es requerido' });
      return;
    }
    const result = await login(telefono.trim());
    res.json(result);
  } catch (error) {
    const msg = String(error);
    if (msg.includes('USUARIO_NO_ENCONTRADO')) {
      res.status(404).json({ message: 'No encontramos una cuenta con ese número' });
    } else {
      res.status(500).json({ message: 'Error al ingresar', error: msg });
    }
  }
}

export async function google(req: Request, res: Response) {
  try {
    const { googleId, email, nombre } = req.body;
    if (!googleId || !email || !nombre) {
      res.status(400).json({ message: 'googleId, email y nombre son requeridos' });
      return;
    }
    const result = await loginConGoogle({ googleId, email, nombre });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar con Google', error: String(error) });
  }
}

export async function recuperar(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      res.status(400).json({ message: 'El email es requerido' });
      return;
    }
    const result = await loginConEmail(email.trim());
    res.json(result);
  } catch (error) {
    const msg = String(error);
    if (msg.includes('USUARIO_NO_ENCONTRADO')) {
      res.status(404).json({ message: 'No encontramos una cuenta con ese email' });
    } else {
      res.status(500).json({ message: 'Error al recuperar', error: msg });
    }
  }
}
