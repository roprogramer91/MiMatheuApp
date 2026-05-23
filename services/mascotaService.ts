import { BASE_URL } from '../src/constants/api';

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
  foto: string;
  publicadoPor: string;
  activa: boolean;
}

export async function getMascotas(tipo?: TipoMascota | 'todos'): Promise<Mascota[]> {
  const url = tipo && tipo !== 'todos'
    ? `${BASE_URL}/api/mascotas?tipo=${tipo}`
    : `${BASE_URL}/api/mascotas`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener mascotas');
  return res.json();
}

export async function subirFoto(uri: string): Promise<string> {
  const formData = new FormData();
  formData.append('foto', {
    uri,
    name: 'foto.jpg',
    type: 'image/jpeg',
  } as any);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error al subir imagen');
  const data = await res.json();
  return data.url;
}

export async function reportarMascota(data: Omit<Mascota, 'id' | 'activa'>): Promise<Mascota> {
  const res = await fetch(`${BASE_URL}/api/mascotas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al reportar mascota');
  return res.json();
}
