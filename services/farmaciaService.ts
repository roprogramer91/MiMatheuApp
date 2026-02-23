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
  const res = await fetch('https://farmacia-turnos.vercel.app/api/farmacia/ayerhoymaniana');
  if (!res.ok) throw new Error('Error API');
  const json = await res.json();
  console.log('Farmacias raw:', JSON.stringify(json).slice(0, 300));
  const maniana = json.manana ?? json.maniana ?? json['mañana'] ?? json.tomorrow ?? {};
  return {
    ayer: parseFarmacia(json.ayer),
    hoy: parseFarmacia(json.hoy),
    maniana: parseFarmacia(maniana),
  };
}
