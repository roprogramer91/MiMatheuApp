import jwt from 'jsonwebtoken';
import prisma from '../db';

const JWT_SECRET = process.env.JWT_SECRET ?? 'mimatheu_secret_dev';

export interface TokenPayload {
  id: string;
  nombre: string;
  telefono?: string;
}

function generarToken(usuario: { id: string; nombre: string; telefono?: string | null }): string {
  const payload: TokenPayload = { id: usuario.id, nombre: usuario.nombre };
  if (usuario.telefono) payload.telefono = usuario.telefono;
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '365d' });
}

export async function registro(data: { nombre: string; telefono: string; email?: string }) {
  const existe = await prisma.usuario.findUnique({ where: { telefono: data.telefono } });
  if (existe) throw new Error('TELEFONO_EN_USO');

  if (data.email) {
    const emailExiste = await prisma.usuario.findUnique({ where: { email: data.email } });
    if (emailExiste) throw new Error('EMAIL_EN_USO');
  }

  const usuario = await prisma.usuario.create({ data });
  const token = generarToken(usuario);
  return { usuario, token };
}

export async function login(telefono: string) {
  const usuario = await prisma.usuario.findUnique({ where: { telefono } });
  if (!usuario) throw new Error('USUARIO_NO_ENCONTRADO');

  const token = generarToken(usuario);
  return { usuario, token };
}

export async function loginConEmail(email: string) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) throw new Error('USUARIO_NO_ENCONTRADO');

  const token = generarToken(usuario);
  return { usuario, token };
}

export async function loginConGoogle(data: { googleId: string; email: string; nombre: string }) {
  let usuario = await prisma.usuario.findFirst({
    where: { OR: [{ googleId: data.googleId }, { email: data.email }] },
  });

  if (!usuario) {
    usuario = await prisma.usuario.create({
      data: { googleId: data.googleId, email: data.email, nombre: data.nombre },
    });
  } else if (!usuario.googleId) {
    usuario = await prisma.usuario.update({
      where: { id: usuario.id },
      data: { googleId: data.googleId },
    });
  }

  const token = generarToken(usuario);
  return { usuario, token };
}
