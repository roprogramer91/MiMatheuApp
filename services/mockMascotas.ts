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
}

export const mockMascotas: Mascota[] = [
  { id: '1', nombre: 'Luna', tipo: 'perro', descripcion: 'Labrador blanca, collar azul, muy amigable', zona: 'B° Centro', fechaPerdida: '20/02/2026', contacto: '1140001111', color: '#f97316' },
  { id: '2', nombre: 'Michi', tipo: 'gato', descripcion: 'Atigrado naranja, ojos verdes, es castrado', zona: 'B° Norte', fechaPerdida: '18/02/2026', contacto: '1140002222', color: '#3b82f6' },
  { id: '3', nombre: 'Toby', tipo: 'perro', descripcion: 'Beagle marrón y blanco, sin collar', zona: 'Ruta 6 zona', fechaPerdida: '15/02/2026', contacto: '1140003333', color: '#10b981' },
  { id: '4', nombre: 'Puchi', tipo: 'gato', descripcion: 'Negro con mancha blanca en el pecho', zona: 'B° Sur', fechaPerdida: '21/02/2026', contacto: '1140004444', color: '#8b5cf6' },
  { id: '5', nombre: 'Rex', tipo: 'perro', descripcion: 'Rottweiler grande, dócil, tiene chip', zona: 'B° Este', fechaPerdida: '19/02/2026', contacto: '1140005555', color: '#ef4444' },
];
