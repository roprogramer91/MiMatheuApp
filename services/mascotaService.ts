const BASE_URL = 'https://mimatheuapp-production.up.railway.app/api/mascotas';

export type TipoMascota = 'perro' | 'gato' | 'otro';

export interface Mascota {
  id: string;
  nombre: string;
  tipo: TipoMascota;
  descripcion: string;
  zona: string;
  fechaPerdida: string;
  contacto: string;
  color: string;
  activa: boolean;
}

export async function getMascotas(tipo?: TipoMascota | 'todos'): Promise<Mascota[]> {
  const url = tipo && tipo !== 'todos' ? `${BASE_URL}?tipo=${tipo}` : BASE_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener mascotas');
  return res.json();
}

export async function reportarMascota(data: Omit<Mascota, 'id' | 'activa'>): Promise<Mascota> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al reportar mascota');
  return res.json();
}
