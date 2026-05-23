import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

const farmacias = [
  {
    nombre: 'Martín',
    direccion: 'Av. Sarmiento 13, B1627 Matheu, Provincia de Buenos Aires',
    telefono: '03484460154',
    googleMapsUrl: 'https://maps.app.goo.gl/ZqTMsi36aZSgykj86',
    imagenUrl: 'https://www.dropbox.com/scl/fi/eejqzou2zwhlocy65wcy8/fMartin.jpg?rlkey=khazq8l3ccfb7d87t8qdzfog2&st=cfdtx4ri&raw=1',
  },
  {
    nombre: 'Ros',
    direccion: 'Domingo Nazarre & Felisa de Longhi, Matheu, Buenos Aires',
    telefono: '0348154390060',
    googleMapsUrl: 'https://maps.app.goo.gl/CwiRZTJxJkUVtK2T8',
    imagenUrl: 'https://www.dropbox.com/scl/fi/dbd5y5opsts7ycjlfcrku/fRos.jpg?rlkey=sdff5tdo7jj0ova87imsnlqed&st=fuyrz0vq&raw=1',
  },
  {
    nombre: 'Perez Montoya',
    direccion: 'Ruta 25 1015, B1627 Matheu, Provincia de Buenos Aires',
    telefono: '0348154388985',
    googleMapsUrl: 'https://maps.app.goo.gl/Wk7YyDjp7rj3mURu5',
    imagenUrl: '',
  },
  {
    nombre: 'Godoy',
    direccion: '',
    telefono: '',
    googleMapsUrl: '',
    imagenUrl: '',
  },
  {
    nombre: 'Manher',
    direccion: '',
    telefono: '',
    googleMapsUrl: '',
    imagenUrl: '',
  },
];

async function main() {
  console.log('Ejecutando seed de farmacias...');

  for (const f of farmacias) {
    await prisma.farmacia.upsert({
      where: { nombre: f.nombre },
      update: f,
      create: f,
    });
    console.log(`  ✓ ${f.nombre}`);
  }

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
