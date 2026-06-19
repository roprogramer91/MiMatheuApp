import prisma from '../db';
import { getEvents } from '../utils/googleCalendar';

export interface FarmaciaResult {
  turno: string;
  ubicacion: string;
  telefono: string;
  google_maps_url: string;
  imagen_url: string;
}

function vacia(turno: string): FarmaciaResult {
  return { turno, ubicacion: '', telefono: '', google_maps_url: '', imagen_url: '' };
}

export async function getFarmaciaTurnoPorFecha(fecha: string): Promise<FarmaciaResult> {
  const events = await getEvents();
  if (events.length === 0) return vacia('Sin datos');

  const ahora = new Date();
  let fechaBusqueda = new Date(`${fecha}T08:30:00`);

  // El turno cambia a las 8:30 AM — antes de esa hora aplica el turno anterior
  if (ahora.getHours() < 8 || (ahora.getHours() === 8 && ahora.getMinutes() < 30)) {
    fechaBusqueda.setDate(fechaBusqueda.getDate() - 1);
  }

  const evento = events.find((event) => {
    const startDate = new Date(`${event.start.date}T08:30:00`);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    endDate.setHours(8, 30, 0, 0);
    return fechaBusqueda >= startDate && fechaBusqueda < endDate;
  });

  if (!evento) return vacia('Sin datos');

  const nombre = (evento.summary ?? '').trim();
  console.log('[farmacias] buscando en DB:', JSON.stringify(nombre));
  const farmacia = await prisma.farmacia.findFirst({
    where: { nombre: { equals: nombre, mode: 'insensitive' } },
  });

  if (farmacia) {
    return {
      turno: farmacia.nombre,
      ubicacion: farmacia.direccion,
      telefono: farmacia.telefono,
      google_maps_url: farmacia.googleMapsUrl,
      imagen_url: farmacia.imagenUrl,
    };
  }

  return {
    turno: nombre,
    ubicacion: 'No se encontraron detalles adicionales',
    telefono: '',
    google_maps_url: '',
    imagen_url: '',
  };
}

export async function getAyerHoyManiana() {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);

  const fmt = (d: Date) => d.toISOString().split('T')[0];

  const [farmaciaAyer, farmaciaHoy, farmaciaManana] = await Promise.all([
    getFarmaciaTurnoPorFecha(fmt(ayer)),
    getFarmaciaTurnoPorFecha(fmt(hoy)),
    getFarmaciaTurnoPorFecha(fmt(manana)),
  ]);

  return { ayer: farmaciaAyer, hoy: farmaciaHoy, manana: farmaciaManana };
}
