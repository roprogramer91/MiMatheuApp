import prisma from '../db';

export async function getMascotas(tipo?: string) {
  return prisma.mascota.findMany({
    where: {
      activa: true,
      ...(tipo && tipo !== 'todos' ? { tipo } : {}),
    },
    orderBy: { creadaEn: 'desc' },
  });
}

export async function createMascota(data: {
  nombre: string;
  tipo: string;
  descripcion: string;
  zona: string;
  fechaPerdida: string;
  contacto: string;
  color: string;
}) {
  return prisma.mascota.create({ data });
}
