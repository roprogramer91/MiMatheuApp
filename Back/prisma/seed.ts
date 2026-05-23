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
    direccion: 'San Martín 180, B1627 Matheu, Provincia de Buenos Aires',
    telefono: '03484462444',
    googleMapsUrl: 'https://maps.app.goo.gl/yFb63UhA9i2XRkpv8',
    imagenUrl: '',
  },
  {
    nombre: 'Manher',
    direccion: 'Av. Hipólito Yrigoyen 490, B1627DLR Matheu, Provincia de Buenos Aires',
    telefono: '03484469173',
    googleMapsUrl: 'https://maps.app.goo.gl/9YLhDJGAccH56Udk7',
    imagenUrl: '',
  },
];

const mascotas = [
  { nombre: 'Luna', tipo: 'perro', descripcion: 'Labrador blanca, collar azul, muy amigable', zona: 'B° Centro', fechaPerdida: '20/05/2026', contacto: '1140001111', color: '#f97316' },
  { nombre: 'Michi', tipo: 'gato', descripcion: 'Atigrado naranja, ojos verdes, es castrado', zona: 'B° Norte', fechaPerdida: '18/05/2026', contacto: '1140002222', color: '#3b82f6' },
  { nombre: 'Toby', tipo: 'perro', descripcion: 'Beagle marrón y blanco, sin collar', zona: 'Ruta 6 zona', fechaPerdida: '15/05/2026', contacto: '1140003333', color: '#10b981' },
  { nombre: 'Puchi', tipo: 'gato', descripcion: 'Negro con mancha blanca en el pecho', zona: 'B° Sur', fechaPerdida: '21/05/2026', contacto: '1140004444', color: '#8b5cf6' },
  { nombre: 'Rex', tipo: 'perro', descripcion: 'Rottweiler grande, dócil, tiene chip', zona: 'B° Este', fechaPerdida: '19/05/2026', contacto: '1140005555', color: '#ef4444' },
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

  console.log('\nEjecutando seed de mascotas...');
  for (const m of mascotas) {
    await prisma.mascota.create({ data: m });
    console.log(`  ✓ ${m.nombre}`);
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
