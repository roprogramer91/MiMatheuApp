import { BASE_URL } from '../src/constants/api';

export interface Farmacia {
  nombre: string;
  direccion: string;
  telefono: string;
  imagen: string;
  maps: string;
}

export interface AyerHoyManiana {
  ayer: Farmacia;
  hoy: Farmacia;
  maniana: Farmacia;
}

function parseFarmacia(d: any): Farmacia {
  return {
    nombre: d?.turno ?? d?.nombre ?? 'Sin datos',
    direccion: d?.ubicacion ?? d?.direccion ?? '',
    telefono: d?.telefono ?? '',
    imagen: d?.imagen_url ?? d?.imagen ?? '',
    maps: d?.google_maps_url ?? d?.maps ?? '',
  };
}

export async function getFarmaciasAyerHoyManiana(): Promise<AyerHoyManiana> {
  const res = await fetch(`${BASE_URL}/api/farmacias/ayerhoymaniana`);
  if (!res.ok) throw new Error('Error API');
  const json = await res.json();
  console.log('Farmacias raw:', JSON.stringify(json).slice(0, 300));
  const maniana = json.manana ?? {};
  return {
    ayer: parseFarmacia(json.ayer),
    hoy: parseFarmacia(json.hoy),
    maniana: parseFarmacia(maniana),
  };
}
